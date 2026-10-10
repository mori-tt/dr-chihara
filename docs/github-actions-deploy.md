# GitHub Actions による同時デプロイ手順（GitHub Pages テスト＋ロリポップ本番）

`main` へのpush（または手動実行）で、**テスト環境（GitHub Pages・noindex・サンプル対談あり）** と **本番環境（ロリポップ・index・サンプル対談なし）** を1つのワークフローからデプロイするための手順と、コピー＆ペーストで使えるワークフロー全文です。

> この文書は資料です。リポジトリの `.github/workflows/` には**まだ入れていません**（現行の `pages.yml` が動いています）。切り替え手順は「4. 切り替え」を参照してください。手作業が必要な公開準備は [release-checklist.md](release-checklist.md) にまとめています。

## 1. 全体像

```
push to main / 手動実行
        │
     verify（npm ci・npm audit・型チェック）
        │
   ┌────┴─────────────────────────┐
build-pages                  build-production
 (build:pages, noindex,        (npm run build, index,
  サンプル対談あり)              サンプル対談なし)
 + ブラウザテスト/リンク検査     + ブラウザテスト/スモークテスト
   │                              │
deploy-pages                  deploy-production ← Environment「production」の承認待ち
   │                              │
smoke-pages                   smoke-production
```

| 項目 | テスト（GitHub Pages） | 本番（ロリポップ） |
| --- | --- | --- |
| ビルド | `npm run build:pages` | `npm run build` |
| `NEXT_PUBLIC_SITE_URL` | `https://mori-tt.github.io/dr-chihara`（スクリプト内） | `PRODUCTION_URL` 変数 |
| `NEXT_PUBLIC_CANONICAL_URL` | `PRODUCTION_URL`（canonicalを本番へ統合） | 不要 |
| robots メタ | `noindex` | `index, follow` |
| サンプル対談 | 表示 | 非表示（ページ・ナビ・feedも出力されない） |
| アップロード | `actions/deploy-pages` | FTPS（`SamKirkland/FTP-Deploy-Action`） |
| 承認 | なし | Environment の Required reviewers（推奨） |

設計上のポイント:

- 本番とテストは**別々にビルド**します（環境変数でURL・noindex・サンプル有無が変わるため、成果物を使い回せません）。
- どちらかのテストが落ちれば、そのデプロイは実行されません。本番側は承認ゲートで止められます。
- すべてのActionは**コミットSHAで固定**しています（サプライチェーン対策。タグはコメントに記載）。更新は Dependabot（`github-actions` エコシステム）に任せるのがおすすめです。
- `GITHUB_TOKEN` は既定で読み取りのみ。Pagesデプロイのジョブだけ `pages: write` / `id-token: write` を付与しています。
- FTPのパスワードは Secrets に置き、ログには出ません。本番デプロイジョブだけが Environment 経由で参照できます。
- `concurrency` で同時実行を直列化し、`cancel-in-progress: false` により**アップロード途中の中断を防ぎます**。
- 成果物の `out/.htaccess` を落とさないよう、`upload-artifact` に `include-hidden-files: true` が必須です（既定では隠しファイルが除外されます）。

## 2. セットアップ手順（初回のみ）

### 2-1. ロリポップ側

1. 独自ドメインの設定と**無料独自SSL（HTTPS）の有効化**を完了させる（[release-checklist.md](release-checklist.md) の B-1）。`.htaccess` はHTTPSへ強制リダイレクトするため、SSLが未設定だと本番にアクセスできなくなります。
2. 管理画面でFTP情報（サーバー名、アカウント、パスワード）を確認する。可能なら**デプロイ専用のFTPアカウント**を作り、公開フォルダ配下だけにアクセスできるようにする（プランによって作成できる数・権限は異なります。管理画面の最新の案内を確認してください）。
3. FTPの接続先ディレクトリ（独自ドメインの公開フォルダ）を確認し、**末尾 `/` 付き**で控える（例: `/yourdomain/`）。
4. FTPS（暗号化FTP）で接続できることを、手元のFTPクライアントで一度確認する。接続できない場合は `protocol: ftps-legacy` を試すか、ロリポップのヘルプで対応状況を確認する。

### 2-2. GitHub側（リポジトリ `mori-tt/dr-chihara`）

1. **Settings → Pages → Build and deployment → Source を `GitHub Actions` にする**（現行設定のままでOK）。
2. **Settings → Environments** で次の2つを用意する。
   - `github-pages`: 既に存在します。設定不要。
   - `production`: 新規作成。**Required reviewers に自分を追加**（本番デプロイ前に承認を挟む）。「Deployment branches」を `main` のみに制限するとより安全です。
3. **Settings → Secrets and variables → Actions** に登録する。

   | 種別 | 名前 | 値の例 | 備考 |
   | --- | --- | --- | --- |
   | Secret（`production` Environment に登録） | `LOLIPOP_FTP_HOST` | `ftp.example.lolipop.jp` | FTPサーバー名 |
   | Secret（同上） | `LOLIPOP_FTP_USER` | `user@example.jp` | FTPアカウント |
   | Secret（同上） | `LOLIPOP_FTP_PASSWORD` | （パスワード） | チャットやコードに書かない |
   | Variable（Repository variables） | `PRODUCTION_URL` | `https://example.jp` | **末尾 `/` なし**。未設定だと本番ビルドは失敗します（誤ってPagesのURLで本番を作らないための安全装置） |
   | Variable（`production` Environment） | `LOLIPOP_SERVER_DIR` | `/yourdomain/` | **末尾 `/` 必須** |

   Secretsは `production` Environment に登録すると、そのジョブ以外から参照できません。
4. （任意）Search Console / Bing の所有確認コードを使う場合は、Variables に `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` / `NEXT_PUBLIC_BING_SITE_VERIFICATION` を追加し、`build-production` ジョブの `env:` に `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: ${{ vars.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }}` のように渡す。これらは公開HTMLに出力される値なので Secret にする必要はありません。
5. （任意）`.github/dependabot.yml` を追加して、Actionsとnpmの更新を週次で通知させる。

   ```yaml
   version: 2
   updates:
     - package-ecosystem: github-actions
       directory: /
       schedule: { interval: weekly }
     - package-ecosystem: npm
       directory: /
       schedule: { interval: weekly }
       open-pull-requests-limit: 5
   ```

## 3. ワークフロー全文（コピー＆ペースト）

`.github/workflows/deploy.yml` として保存します。`actionlint` の検証済みです。

```yaml
name: Deploy (GitHub Pages test + Lolipop production)

on:
  push:
    branches: [main]
  workflow_dispatch:
    inputs:
      targets:
        description: Where to deploy
        type: choice
        options: [both, pages-only, production-only]
        default: both
      dry_run:
        description: Lolipop FTP dry run (lists changes, uploads nothing)
        type: boolean
        default: false

permissions:
  contents: read

concurrency:
  group: deploy
  cancel-in-progress: false

env:
  NODE_VERSION: "24"
  PAGES_URL: https://mori-tt.github.io/dr-chihara

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7.0.1
      - uses: actions/setup-node@820762786026740c76f36085b0efc47a31fe5020 # v7.0.0
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: npm
      - run: npm ci
      - run: npm audit --omit=dev --audit-level=high
      - run: npm run typecheck

  build-pages:
    needs: verify
    if: inputs.targets != 'production-only'
    runs-on: ubuntu-latest
    env:
      # Makes the noindex test site point its canonical URLs at production.
      # Leave the variable empty before launch and the build keeps the Pages URL.
      NEXT_PUBLIC_CANONICAL_URL: ${{ vars.PRODUCTION_URL }}
      CANONICAL_URL: ${{ vars.PRODUCTION_URL }}
    steps:
      - uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7.0.1
      - uses: actions/setup-node@820762786026740c76f36085b0efc47a31fe5020 # v7.0.0
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: npm
      - run: npm ci
      - run: npm run build:pages
      - name: Browser tests against the Pages build
        run: |
          npx playwright install --with-deps chromium
          node scripts/serve.mjs &
          for _ in $(seq 30); do curl -sf http://127.0.0.1:4173/dr-chihara/ >/dev/null && break; sleep 1; done
          node scripts/browser-check.mjs
          node scripts/care-check.mjs
          node scripts/dialogue-check.mjs
          node scripts/link-check.mjs
      - uses: actions/upload-pages-artifact@fc324d3547104276b827a68afc52ff2a11cc49c9 # v5.0.0
        with:
          path: out

  build-production:
    needs: verify
    if: inputs.targets != 'pages-only'
    runs-on: ubuntu-latest
    env:
      NEXT_PUBLIC_SITE_URL: ${{ vars.PRODUCTION_URL }}
    steps:
      - name: Require a valid PRODUCTION_URL
        run: |
          if ! echo "$NEXT_PUBLIC_SITE_URL" | grep -Eq '^https://[^/]+$'; then
            echo "::error::Set the PRODUCTION_URL repository variable (https://example.jp, no trailing slash)"
            exit 1
          fi
      - uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7.0.1
      - uses: actions/setup-node@820762786026740c76f36085b0efc47a31fe5020 # v7.0.0
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: npm
      - run: npm ci
      - run: npm run build
      - name: Browser tests against the production build (served at the root)
        run: |
          npx playwright install --with-deps chromium
          PORT=4273 TEST_BASE_PATH="" node scripts/serve.mjs &
          for _ in $(seq 30); do curl -sf http://127.0.0.1:4273/ >/dev/null && break; sleep 1; done
          TEST_URL=http://127.0.0.1:4273 node scripts/browser-check.mjs
          node scripts/smoke-check.mjs http://127.0.0.1:4273
      - uses: actions/upload-artifact@043fb46d1a93c77aae656e7c1c64a875d1fc6a0a # v7.0.1
        with:
          name: production-site
          path: out
          include-hidden-files: true # keeps out/.htaccess
          if-no-files-found: error
          retention-days: 14

  deploy-pages:
    needs: build-pages
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@368f82528645a54fb793d4d04e342629a3f51346 # v5.0.1

  smoke-pages:
    needs: deploy-pages
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7.0.1
      - uses: actions/setup-node@820762786026740c76f36085b0efc47a31fe5020 # v7.0.0
        with:
          node-version: ${{ env.NODE_VERSION }}
      - name: Smoke test the live test site (retries while the CDN updates)
        run: |
          for _ in 1 2 3 4 5; do
            node scripts/smoke-check.mjs "$PAGES_URL" --staging && exit 0
            sleep 20
          done
          exit 1

  deploy-production:
    needs: build-production
    runs-on: ubuntu-latest
    # Configure "Required reviewers" on this environment to gate production.
    environment:
      name: production
      url: ${{ vars.PRODUCTION_URL }}
    steps:
      - uses: actions/download-artifact@3e5f45b2cfb9172054b4087a40e8e0b5a5461e7c # v8.0.1
        with:
          name: production-site
          path: out
      - name: Upload to Lolipop over FTPS
        uses: SamKirkland/FTP-Deploy-Action@110f9186c050f71550953127052e77650219c287 # v4.4.0
        with:
          server: ${{ secrets.LOLIPOP_FTP_HOST }}
          username: ${{ secrets.LOLIPOP_FTP_USER }}
          password: ${{ secrets.LOLIPOP_FTP_PASSWORD }}
          protocol: ftps
          port: 21
          local-dir: ./out/
          server-dir: ${{ vars.LOLIPOP_SERVER_DIR }}
          state-name: .ftp-deploy-sync-state.json
          dry-run: ${{ inputs.dry_run && 'true' || 'false' }}
          log-level: standard

  smoke-production:
    needs: deploy-production
    if: ${{ !inputs.dry_run }}
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 # v7.0.1
      - uses: actions/setup-node@820762786026740c76f36085b0efc47a31fe5020 # v7.0.0
        with:
          node-version: ${{ env.NODE_VERSION }}
      - name: Smoke test the live production site
        run: node scripts/smoke-check.mjs "${{ vars.PRODUCTION_URL }}"
```

補足:

- `build-pages` の `NEXT_PUBLIC_CANONICAL_URL` は、`PRODUCTION_URL` が空の間（公開前）は無視され、PagesのURLが使われます。本番公開後は自動的に、テスト環境のcanonicalが本番URLに統合されます。
- `care-check` は canonical を `CANONICAL_URL` と比較するため、同じ値を渡しています。
- `build-production` ではPlaywrightを `serve.mjs` に対してルート配置（`TEST_BASE_PATH=""`）で実行します。`care-check` と `dialogue-check` は `/dr-chihara` 前提の既存スクリプトなので、本番ビルドでは実行しません。
- `scripts/smoke-check.mjs` はデプロイ後の公開URLに対する確認です（200・robotsメタ・canonical・sitemap・404・サンプル対談の有無・HTTP→HTTPS）。手元でも `npm run test:smoke -- https://example.jp` で実行できます（テスト環境は `-- https://mori-tt.github.io/dr-chihara --staging`）。
- 本番デプロイを承認制にしたくない場合は、`production` Environment から Required reviewers を外すだけです（YAMLの変更は不要）。

## 4. 切り替え（現行の `pages.yml` からの移行）

1. 上の「2. セットアップ手順」を完了する。
2. `.github/workflows/deploy.yml` を追加し、**同じコミットで `.github/workflows/pages.yml` を削除する**（残すとPagesが二重にデプロイされます）。
3. まず **Actions → 「Deploy (GitHub Pages test + Lolipop production)」→ Run workflow** で `targets: both`、`dry_run: true` を実行する。FTPは何もアップロードせず、差分一覧だけをログに出します。`PRODUCTION_URL` を設定済みなら、本番ビルドとテストもここで確認できます。
4. ログの差分が想定どおり（初回は全ファイルがアップロード対象）であることを確認し、`dry_run: false` で再実行する。`production` の承認を求められるので承認する。
5. `smoke-production` が成功し、公開URLを目視確認できたら完了。以後は `main` へのpushで同じ流れが動きます。

> 初回のFTPアップロードは約500ファイル・約36MBです。時間がかかる場合があります（2回目以降は差分のみ）。

## 5. 日常運用

| やりたいこと | 方法 |
| --- | --- |
| 通常のリリース | PRをマージして `main` に反映 → 自動でビルド・テスト・テスト環境へデプロイ → `production` の承認で本番へ |
| テスト環境だけ更新 | Run workflow → `targets: pages-only` |
| 本番だけ更新 | Run workflow → `targets: production-only` |
| 本番デプロイの事前確認 | Run workflow → `dry_run: true` |
| 公開前の確認（承認しない） | 承認待ちの状態で止めておく（Rejectでも可） |
| ロールバック | 下記 |

### ロールバック

1. 戻したい時点のコミットに、事前にタグを付けておく（例: `git tag release-2026-10-11 && git push origin release-2026-10-11`）。
2. Actions → Run workflow で、**「Use workflow from」にそのタグを選び**、`targets: production-only` で実行する。FTPの同期状態ファイルにより、そのタグ時点の内容に戻ります（追加済みのファイルは削除されます）。
3. もしくは `git revert` で戻して `main` にpushする。

> FTPアップロードはアトミックではないため、数十秒〜数分の間、新旧のファイルが混在する可能性があります。アクセスの少ない時間帯のデプロイをおすすめします。

### 成果物の中身を確認したい

Actions の実行結果ページの **Artifacts → `production-site`**（14日間保持）をダウンロードすると、アップロード対象そのものを確認できます。

## 6. トラブルシュート

| 症状 | 原因・対処 |
| --- | --- |
| `build-production` が最初に失敗する | `PRODUCTION_URL` 変数が未設定、または末尾に `/` が付いている |
| FTP接続エラー・タイムアウト | ホスト名・アカウントを確認。`protocol` を `ftps-legacy` に変える。ロリポップ側でFTP制限（IP制限など）がないか確認 |
| FTPS証明書エラー | アクションの `security: loose` を追加すると回避できますが、まずホスト名がロリポップのFTPサーバー名と一致しているか確認する |
| 本番がHTTPSでつながらなくなった | 独自SSLが未有効のまま `.htaccess` を配置した。管理画面でSSLを有効にするまで `out/.htaccess` のHTTPSリダイレクト部分を一時的にコメントアウトして再デプロイ |
| `/dialogues/` が本番で見えない | 仕様です。`src/lib/dialogues.ts` の `realDialogues` に実記事を追加すると現れます |
| `smoke-production` の「HTTP redirects to HTTPS」が失敗 | SSL未設定、または `.htaccess` が反映されていない（隠しファイルが成果物から外れていないか確認） |
| Pages側のテストがcanonicalで失敗 | `CANONICAL_URL` と `NEXT_PUBLIC_CANONICAL_URL` に同じ値を渡しているか確認 |
| 本番の古い内容が見える | ブラウザ・CDNキャッシュ。HTMLは `max-age=0, must-revalidate`、ハッシュ付き静的ファイルは1年キャッシュなので、通常は強制リロードで解消する |

## 7. サブディレクトリに配置する場合

`https://example.jp/profile/` のように配置する場合は、次の3点を変えます。

1. `build-production` の `env:` に `NEXT_PUBLIC_BASE_PATH: /profile` を追加し、`NEXT_PUBLIC_SITE_URL` を `https://example.jp/profile` にする（`PRODUCTION_URL` の値自体を `https://example.jp/profile` にする）。
2. `LOLIPOP_SERVER_DIR` を公開フォルダ内の `profile/` にする。
3. `public/.htaccess` の `ErrorDocument 404 /404.html` を `/profile/404.html` に変える。
4. `build-production` の `Require a valid PRODUCTION_URL` のパターンと、ブラウザテストの `TEST_BASE_PATH` を `/profile` に合わせる。

## 8. 手元で同じことを確認するコマンド

```sh
# テスト環境相当
npm run build:pages
node scripts/serve.mjs &            # http://127.0.0.1:4173/dr-chihara/
node scripts/browser-check.mjs && node scripts/care-check.mjs && node scripts/dialogue-check.mjs && node scripts/link-check.mjs

# 本番相当（ドメインは仮）
NEXT_PUBLIC_SITE_URL=https://example.jp npm run build
PORT=4273 TEST_BASE_PATH="" node scripts/serve.mjs &
TEST_URL=http://127.0.0.1:4273 node scripts/browser-check.mjs
node scripts/smoke-check.mjs http://127.0.0.1:4273
```
