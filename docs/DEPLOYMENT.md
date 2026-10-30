# デプロイ手順（GitHub Pages テスト + ロリポップ本番）

このプロジェクトは `output: "export"` の静的サイトです。`npm run build` で `out/` にHTML・CSS・JS・画像が生成され、それを配信できるサーバーならどこでも動きます。ホスティング側のNode.jsやデータベースは不要です。

- **はじめて公開する** → §1・§2（全体像と順次手順）
- 設定値の意味を調べる → §3以降のリファレンス
- コンテンツ・法務の公開前チェック → [release-checklist.md](release-checklist.md)

## 1. 全体像：2つのサイトと3箇所の設定

| サイト | ワークフロー | ビルド | robots | サンプル対談 |
| --- | --- | --- | --- | --- |
| GitHub Pages（テスト確認用） | `deploy.yml` | `npm run build:pages` | `noindex` 固定 | 表示 |
| ロリポップ（本番） | `deploy-lolipop.yml` | `npm run build` | `index, follow` | 非表示 |

設定の置き場所は3箇所に分かれます。

| 場所 | 何を置くか | 誰が使うか |
| --- | --- | --- |
| GitHub **Secrets** | SSH認証情報4件（`LOLIPOP_SSH_*`） | Lolipopデプロイジョブ |
| GitHub **Variables** | `DEPLOY_TARGET`（デプロイ先）・`LOLIPOP_SITE_URL`（本番ドメイン）ほか | 両ワークフローのビルド |
| `.env.local`（ローカル・git除外） | `NEXT_PUBLIC_*`（手元ビルドの設定） | 手元の `npm run build` |

つまり初回に必要なのは「**Lolipop管理画面の設定**」と「**GitHubのSecrets/Variables登録**」だけです。以降は main への push でビルド→検査→アップロード→公開フォルダ入れ替え→スモークテストまで全自動です。

## 2. 初回セットアップ手順（上から順に実行）

> 公開に向けた全体のチェックリスト（コンテンツ確認・SSL・Search Console 等）は [release-checklist.md](release-checklist.md) を参照。ここではデプロイ配線の最短ルートを示します。

### Step 1. Lolipop管理画面（初回のみ・手作業）

GitHub Actionsからは自動化できない部分です。管理画面で次を設定します。

- [ ] **SSHを有効化**（ホスト `ssh.lolipop.jp`・ポート `2222`・ユーザー名・パスワードを控える）
- [ ] 本番ドメインの**公開フォルダ**を設定（例：`~/web/example.jp` → これが `LOLIPOP_SSH_REMOTE_DIR` になる）
- [ ] **独自SSLを有効化**し、`https://` で表示できることを確認。**`public/.htaccess` がHTTP→HTTPSへ強制リダイレクトするため、SSL有効化より先にデプロイしない**
- [ ] 既存サイトがある場合は先にバックアップ（デプロイは公開フォルダを丸ごと入れ替える）

### Step 2. GitHub Secrets を登録（4件・ブラウザのみ）

リポジトリの **Settings → Secrets and variables → Actions → Secrets** タブで「New repository secret」から1件ずつ登録します。

| Secret名 | 入れる値 |
| --- | --- |
| `LOLIPOP_SSH_USER` | SSHユーザー名（管理画面の表示どおり。例：`lolipop.jp-XXXXX`） |
| `LOLIPOP_SSH_PASSWORD` | SSHパスワード |
| `LOLIPOP_SSH_REMOTE_DIR` | 公開フォルダ（Step 1で設定したもの。例：`~/web/example.jp`） |
| `LOLIPOP_SSH_KNOWN_HOSTS` | 下記コマンドの出力（中間者攻撃対策で必須） |

**`LOLIPOP_SSH_KNOWN_HOSTS` の入れ方**（唯一ターミナルが必要な作業）：Macのターミナルで次を実行し、出てくる数行をそのままSecret入力欄に貼り付けます。

```bash
ssh-keyscan -p 2222 ssh.lolipop.jp
```

### Step 3. GitHub Variables を登録（ブラウザのみ）

同じ画面の **Variables** タブで登録します。

| Variable名 | 入れる値 |
| --- | --- |
| `LOLIPOP_SITE_URL` | `https://example.jp`（本番ドメイン。**末尾 `/` なし**） |
| `DEPLOY_TARGET` | `both`（値の意味は下表。**この設定を最後に行う＝ここで初めて本番に出ます**） |

| `DEPLOY_TARGET` の値 | 動作 |
| --- | --- |
| `github-pages`（未設定＝既定） | Pagesのみデプロイ（現状と同じ） |
| `both` | Pages ＋ Lolipop の両方 |
| `lolipop` | Lolipopのみ |
| `none` | 両方停止（公開済みサイトはそのまま残る） |

任意の Variables（必要なときだけ）：

| Variable名 | 用途 |
| --- | --- |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Search Console の所有確認メタ（公開HTMLに出る値なのでSecret不要） |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION` | Bing Webmaster Tools の所有確認メタ |
| `CI_RUNNER` | `self-hosted` にすると自分のMacのrunnerでビルド・デプロイ（要 `brew install sshpass`） |

### Step 4. デプロイを実行（ブラウザのみ）

1. リポジトリの **Actions** タブ → **Deploy to Lolipop** → **Run workflow**（main選択）で手動実行します。以後は main への push（`src/`・`public/`・`scripts/` 等の変更時）でも自動で走ります。
2. Environment `production` の承認を設定している場合は、デプロイ直前に承認画面が出ます。
3. Actions画面で進行と結果を確認します。最後に公開URLへのスモークテスト（`scripts/smoke-check.mjs`）まで自動で実行されます。

推奨：**Settings → Environments** に `production` を作り **Required reviewers に自分を設定**すると、本番デプロイの前に承認を挟めます（誤pushでの即時公開を防ぐ）。不要ならワークフローの `environment:` 行を削除してください。

実行される内容：`npm run build`（本番用・index/サンプルなし）→ 静的検査（`index.html`/`404.html`/`.htaccess`/`sitemap.xml`/サンプル混入チェック）→ tar アーカイブ → SSHでアップロード → サーバー上でステージング展開・検査 → **公開フォルダをリネームで原子的に入れ替え**（失敗時は旧版へ自動復旧）→ スモークテスト。

<details>
<summary>CLI（gh）で一括登録する場合（省略可）</summary>

```bash
REPO=mori-tt/dr-chihara

# Secrets（値は対話入力 → コマンド履歴に残らない）
gh secret set LOLIPOP_SSH_USER --repo $REPO
gh secret set LOLIPOP_SSH_PASSWORD --repo $REPO
gh secret set LOLIPOP_SSH_REMOTE_DIR --repo $REPO
ssh-keyscan -p 2222 ssh.lolipop.jp > /tmp/kh && ssh-keygen -lf /tmp/kh
gh secret set LOLIPOP_SSH_KNOWN_HOSTS --repo $REPO < /tmp/kh && rm /tmp/kh

# Variables
gh variable set LOLIPOP_SITE_URL --body https://example.jp --repo $REPO
gh variable set DEPLOY_TARGET --body both --repo $REPO

# 実行・確認
gh workflow run deploy-lolipop.yml --repo $REPO
gh run watch --repo $REPO
```

</details>

### Step 5. 動作確認

- `https://example.jp/` でトップ・言語切替（`/en/`・`/zh/`）・診療ページが表示される
- `curl -sI http://example.jp/` → `301` で `https://` へ
- 存在しないURL → HTTP 404 でサイトデザインの404ページ
- `view-source:` で `robots` が `index, follow`、canonical が本番ドメイン、`/dialogues/` が404（実記事公開前）
- 正式公開後は Search Console 登録・sitemap送信（[release-checklist.md](release-checklist.md) §4）

---

以下はリファレンスです。

## 3. サイト別の環境変数

`main`へのpushで、`DEPLOY_TARGET`の設定に応じた系統が別々にビルド・デプロイされます（環境変数でURL・noindex・サンプル有無が変わるため、成果物は使い回せません）。

| 項目 | GitHub Pages（テスト） | Lolipop（本番） |
| --- | --- | --- |
| ビルドコマンド | `npm run build:pages` | `npm run build` |
| `NEXT_PUBLIC_SITE_URL` | `https://mori-tt.github.io/dr-chihara`（スクリプト内で固定） | `LOLIPOP_SITE_URL` 変数 |
| `NEXT_PUBLIC_BASE_PATH` | `/dr-chihara`（スクリプト内で固定） | 空（ルート配置） |
| `NEXT_PUBLIC_NOINDEX` | `1`（スクリプト内で固定） | 未設定（＝index） |
| `NEXT_PUBLIC_CANONICAL_URL` | `LOLIPOP_SITE_URL`（未設定ならPages URL） | 不要（＝SITE_URLと同じ） |
| サンプル対談 | 表示（`NEXT_PUBLIC_NOINDEX=1`に連動） | 非表示 |

ローカルでは `deploy/github-pages.env.example`・`deploy/lolipop.env.example` を参考に `.env.local` を作ります（`.env*` はgit除外済み）。

```bash
# 手元で同等のビルドを確認
npm run build:pages                                        # テスト環境相当（/dr-chihara 配下）
NEXT_PUBLIC_SITE_URL=https://example.jp npm run build     # 本番相当（ルート配置）
```

`NEXT_PUBLIC_SITE_URL` は末尾 `/` なし。`NEXT_PUBLIC_NOINDEX=1` は**本番ビルドでは絶対に付けない**（全ページnoindex＋サンプル対談が混入します）。

## 4. DEPLOY_TARGET と安全な切り替え

2つのワークフローの実行は、GitHub Variables の **`DEPLOY_TARGET`** で一元管理します。`deploy-lolipop.yml` はリポジトリに存在しますが、`DEPLOY_TARGET` が `lolipop` または `both` のときだけ実行されるガードが付いているため、**設定するまでは従来どおりPagesのみがデプロイ**されます。値を変えれば即座にデプロイ先を切り替え・停止できます。

関連する任意設定：

- `CI_RUNNER=self-hosted`：自分のMacのself-hosted runnerで実行（`brew install sshpass` が必要。`Install sshpass` ステップはhosted限定のため）。
- Environment `production` の Required reviewers：本番デプロイ前の承認ゲート（§2 Step 4）。

## 5. 手元で生成・確認

```bash
npm ci
npm run typecheck
npm run build:pages          # テスト環境相当
node scripts/serve.mjs       # http://127.0.0.1:4173/dr-chihara/
npm run test:browser         # Playwright（要 npx playwright install chromium）

# 本番相当（ルート配置）
NEXT_PUBLIC_SITE_URL=https://example.jp npm run build
TEST_BASE_PATH= PORT=4273 node scripts/serve.mjs   # http://127.0.0.1:4273/
TEST_URL=http://127.0.0.1:4273 npm run test:browser
```

デプロイ後の公開URL検査は `npm run test:smoke -- <URL>`（テスト環境は `-- <Pages URL> --staging`）でいつでも実行できます。

## 6. 手動転送（代替手順）

GitHub Actionsでのデプロイ（§2〜§4）を使う場合、この手順は不要です。Actionsが使えない場合の緊急対応用に、FTPSでの手動転送手順を残しています。

1. 既存サイトがある場合はファイルと`.htaccess`をバックアップします。
2. `NEXT_PUBLIC_SITE_URL=https://本番ドメイン npm run build` で本番ビルドを作る。
3. ロリポップの管理画面で、対象ドメインの公開フォルダを確認します。
4. [公式のFTP設定手順](https://lolipop.jp/manual/hp/ftp-set/)に従ってFTPS対応クライアントを設定します。
5. **`out`フォルダそのものではなく、中のファイル・フォルダを**公開フォルダへ転送します。
6. `_next/`と隠しファイルの`.htaccess`も必ず転送します（クライアントの設定で隠しファイルを表示）。
7. `index.html`、`404.html`、`robots.txt`、`sitemap.xml`、`images/` 等が配置されたことを確認します。

サーバーへ `.env.local`、`node_modules`、ソースコードを転送する必要はありません。手動転送は原子的ではないため、転送中に新旧ファイルが混在します。アクセスの少ない時間帯に行い、削除したページがサーバーに残っていないか個別に確認してください。

## 7. 配置後の確認

- トップ・`/en/`・`/zh/`・診療ページを直接URL入力で開ける
- スマートフォンでメニュー・言語切替が使える
- 存在しないURLでHTTP 404になる（エラーページをHTTP 200で返さない）
- ページソースのcanonicalが本番ドメインになっている
- `robots` が `index, follow`、テスト環境（Pages）側は `noindex` のまま
- `curl -sI http://ドメイン/` が `https://` へ301リダイレクト
- 正式公開後、Search Consoleで所有権を確認し `/sitemap.xml` を送信する

## 8. 更新・ロールバック

**更新**：記事やページを修正して `main` へpushすれば、`DEPLOY_TARGET` に応じた系統が自動でビルド・検査・デプロイされます。サーバー上でソースを変更してもページは更新されません（静的ファイルのみの構成）。

デプロイは公開フォルダ全体を新しいビルドで**原子的に入れ替え**ます。サーバー上では `~/.deploy-staging` で展開・検証してから `mv` で交換し、失敗時は旧フォルダへ自動復旧、直前版は `~/.deploy-previous`（公開フォルダ外）に保持されます。そのため転送中にアセットが欠けることはなく、削除したページも入れ替えと同時に消えます。

**ロールバック**（直前版に戻す）：SSHでサーバーに接続し、

```bash
ssh -p 2222 LOLIPOP_SSH_USER@ssh.lolipop.jp
mv ~/web/example.jp ~/web/example.jp.bak && mv ~/.deploy-previous ~/web/example.jp
```

（`example.jp` は実際の公開フォルダ名に読み替え。`.deploy-previous` は1世代分のみ保持）もしくは `git revert` で `main` を戻してpushし、通常のデプロイを待ちます。

## 9. `.htaccess` について

`public/.htaccess` はドメイン直下用の設定で、ビルド時に `out/.htaccess` へコピーされます（GitHub Pagesでは無視されます）。含まれる設定：404ページ、ディレクトリ一覧の禁止、テキスト圧縮、HTTPS強制、セキュリティヘッダー（`X-Content-Type-Options`/`Referrer-Policy`/`X-Frame-Options`/`Permissions-Policy`）、コンテンツ種別ごとのキャッシュ（ハッシュ付きファイルは1年・HTMLは常に再検証）。`Strict-Transport-Security` はHTTPS確認後にコメントを外します（[release-checklist.md](release-checklist.md) B-5）。

`mod_headers` が無効なレンタルサーバーではヘッダー系が出ないため、配置後に `curl -sI https://ドメイン/` でレスポンスヘッダーを確認してください。

## 10. トラブルシュート

| 症状 | 原因・対処 |
| --- | --- |
| `Build production output` が最初に失敗する | `LOLIPOP_SITE_URL` 変数が未設定 |
| SSH接続エラー・タイムアウト | ユーザー名・パスワードを確認。ロリポップ側でSSHが有効か・IP制限がないか確認。自動リトライで乗り切れない切断は再実行で冪等にやり直せる |
| `LOLIPOP_SSH_KNOWN_HOSTS の形式が不正` | `ssh-keyscan -p 2222 ssh.lolipop.jp` の出力のうち `[ssh.lolipop.jp]:2222` で始まる行をそのまま貼る（指紋行やポートなしの行は不可） |
| デプロイが成功したのに404や古い内容が見える | ブラウザキャッシュ（HTMLは `max-age=0` なので強制リロード）。それでも違う場合は `LOLIPOP_SSH_REMOTE_DIR` の公開フォルダ指定を確認 |
| 本番がHTTPSでつながらない | 独自SSLが未有効のまま `.htaccess` を配置した。管理画面でSSLを有効化するか、一時的に `out/.htaccess` のHTTPSリダイレクトを外して手動転送 |
| `/dialogues/` が本番で見えない | 仕様です。`src/lib/dialogues.ts` の `realDialogues` に実記事を追加すると現れます |
| Pages側のcanonicalが本番を向かない | Variables `LOLIPOP_SITE_URL` が未設定（設定すると自動で向く） |
| `production` 環境の承認で止まる | 仕様です。Actions画面で承認するか、Environment の Required reviewers を外す |

## 11. サブディレクトリに配置する場合

`https://example.jp/profile/` のように配置する場合は、次を変えます。

1. `deploy-lolipop.yml` の `env:` に `NEXT_PUBLIC_BASE_PATH: /profile` を追加し、`LOLIPOP_SITE_URL` を `https://example.jp/profile` にする。
2. `LOLIPOP_SSH_REMOTE_DIR` を公開フォルダ内の `profile/` 相当のパスにする。
3. `public/.htaccess` の `ErrorDocument 404 /404.html` を `/profile/404.html` に変える。

## 12. Cloudflare の設定(PageSpeed / TTFB 対策)

本番は Cloudflare プロキシ経由(`server: cloudflare`)。静的アセットはエッジキャッシュされていますが、**HTML は既定でキャッシュ対象外**(レスポンスに `cf-cache-status` が出ない = DYNAMIC)のため、毎回ロリポップのオリジンまで往復し TTFB が約 0.9 秒かかっています。PageSpeed の performance を上げるには、この HTML をエッジキャッシュするのが最も効きます。

1. Cloudflare ダッシュボード → 対象ゾーン → **Caching → Cache Rules → Create rule**。
2. Rule name: 例 `cache-html` / When incoming requests match: `(http.request.full_uri contains "yoshitomo-chihara.com")` など全リクエスト。
3. **Cache eligibility: Eligible for cache** にし、**Edge TTL**: 例 1時間(`Respect origin` でもよいが HTML は `max-age=0` を返すので固定値推奨)。
4. デプロイ後は古い HTML がエッジに残るため、**Caching → Purge Cache → Purge Everything** で削除するか、下記の自動パージを有効化してください(Edge TTL を数分〜1時間と短めにして手動運用でも可)。

### デプロイ後のパージは自動化できます

`deploy-lolipop.yml` 末尾の `Purge Cloudflare cache` ステップが `purge_everything` を実行します。次の Secrets を GitHub に登録するだけで有効になります(未登録ならスキップされ、デプロイ自体は成功扱い)。

1. Cloudflare ダッシュボード右上 → **My Profile → API Tokens → Create Token**。「Purge Cache」テンプレート、またはカスタムで Permissions: `Zone → Cache Purge → Purge`、Zone Resources: 対象ゾーンのみ。
2. ゾーンIDは Overview 右側「API」欄の **Zone ID**。
3. GitHub → Settings → Secrets and variables → Actions に `CLOUDFLARE_API_TOKEN` と `CLOUDFLARE_ZONE_ID` を登録。

補足:

- `beacon.min.js`(Cloudflare Web Analytics / RUM)はゾーン側で自動挿入されています。不要ならダッシュボードの **Web Analytics / Speed → Observed(RUM)** で無効化すると約10KBの外部JSが消えます。
- HTML のブラウザ側キャッシュは `max-age=0, must-revalidate` のままなので、エッジTTLを伸ばしすぎなければ更新遅延の実害はありません。
