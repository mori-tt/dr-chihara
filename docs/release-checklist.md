# 公開前チェックリスト（手作業が必要な項目）

コードで対応できる項目は完了しています。以下は、アカウント・ドメイン・クリニック側の確認・本人の判断が必要な項目です。上から順に進めてください。自動デプロイの手順は [github-actions-deploy.md](github-actions-deploy.md) を参照してください。

最終更新: 2026-10-11

## 0. 2026-10-11 の公開前チェックで対応済みの項目

- **依存パッケージの脆弱性**: `next` を 16.3.5 → **16.3.8**（critical の修正を含む）、`sharp` と `source-map-js` を更新。`npm audit` は 0件。Next 16.4.0 は公開から日が浅いため（2026-10-06）見送り。公開から1〜2週間後に更新を検討する。
- **サンプル対談の出し分け**: テスト（GitHub Pages / `NEXT_PUBLIC_NOINDEX=1`）のみ表示し、本番ビルドでは対談のページ・ナビ・ティーザー・feed を出力しない。実記事は `src/lib/dialogues.ts` の `realDialogues` に追加すると本番にも出る。
- **リンク切れ**:
  - 公式サイトの `/liftup/` は2026-10-11時点で**404**（公式サイト自身のナビからのリンクも切れている）。サイト内の参照先を `/rejuvenation/` に変更し、「糸リフトの診療案内」リンクを削除した。→ 公式側の復旧は 1-2 で確認。
  - ISSCR の `/patients`（サンプル対談の参考資料）が404 → `aboutstemcells.org/patient-guide` に差し替え。
  - FDA の2リンクはブラウザでは200。curl等には404を返す（bot対策）ため、リンク検査では対象外にした。
- **`public/.htaccess` を追加**（ロリポップ用）: 404ページの指定、HTTPS強制、gzip圧縮、キャッシュ（ハッシュ付きファイルは1年、HTMLは常に再検証）、基本のセキュリティヘッダー、デプロイ状態ファイルの非公開化。GitHub Pagesでは無視される。
- 404ページの `robots` メタが二重に出ていた問題を解消。
- `siteLastModified` を 2026-10-11 に更新（リンク・対談の出し分けという実際の変更を反映）。
- デプロイ後の自動確認用に `scripts/smoke-check.mjs`（`npm run test:smoke`）を追加。

## 1. コンテンツの確認（本人・クリニック）

1. **診療情報の再照合と `careCheckedAt` の更新**
   現在 `2026-09-28`（`src/lib/care-guide.ts`）。公式サイトの料金表・診療時間・住所・電話・WEB予約URL・各施術ページを実際に見直した日にだけ更新する。この日付は画面の「確認日」と構造化データ（`lastReviewed`）に出るため、**確認していない日付に変えない**。
2. **公式サイト `/liftup/`（糸リフト）の復旧確認**
   クリニックに確認し、復旧したら `src/lib/care-guide.ts` の `thread-lift` の `source` を `/liftup/` に戻し、`care-support.ts` の `furtherReading` に「糸リフトの診療案内」を戻す。恒久的に廃止なら現状のままでよい。`docs/clinical-sources.md` の注記も更新する。
3. **個別ページのFAQ・診療ページの文面の確認**（`src/lib/care-topic-faq.ts`、`care-guide.ts` ほか）
   既存の確認済み内容から作成したものだが、院長本人の最終確認と、**医療広告ガイドライン（厚生労働省）への適合確認**が必要。特に、効果・安全性・症例に関する表現、料金の表示、リスクの記載。
4. **「取材・対談のご依頼」の文面**（`src/lib/content.ts` の `editorialBody`）
   本番では連載「人間交差点」のページが見えないのに、文面に連載名が残っている。「取材・対談のご依頼」のみに書き換えるか、最初の実記事を公開するまで連載名を外すかを決める（日本語・英語・中国語の3か所）。
5. **画像・出典の確認**
   [image-sources.md](image-sources.md) のライセンスと、クリニック公式から取得した写真の使用許可（依頼者の許可範囲）が現在も有効であることを確認する。
6. **専門医・資格・所属学会の最終確認**
   README にあるとおり、依頼者提供情報を原文どおり反映している。公開前に本人が最終確認する。
7. **本文を変更した日に `siteLastModified` を更新**（`src/lib/metadata.ts`）。内容を変えずに日付だけを更新しない。

## 2. インフラ・アカウントの手作業（本番＝ロリポップ）

### B-1. ドメインとSSL

1. 独自ドメインを取得する（`yoshitomo-chihara.jp` 等）。`www` あり／なしのどちらを正にするか決める（canonical は選んだほうに統一。もう一方は管理画面またはDNSでリダイレクト）。
2. ロリポップの管理画面で独自ドメインを追加し、公開フォルダを決める。
3. **無料独自SSLを有効化し、HTTPSで表示されることを確認する**。`.htaccess` がHTTPSへ強制リダイレクトするため、**SSLの有効化より先にデプロイしない**。
4. DNS（ネームサーバー）の反映を待つ。

### B-2. FTP情報

ロリポップ管理画面でFTPサーバー名・アカウント・パスワードを確認し、公開フォルダのパスを控える。可能ならデプロイ専用のFTPアカウントを作る。値は GitHub の Secrets / Variables にのみ保存し、チャットやリポジトリに書かない。

### B-3. GitHub の設定

[github-actions-deploy.md](github-actions-deploy.md) の「2-2」に従い、Environment `production`（承認者設定）、Secrets、`PRODUCTION_URL`・`LOLIPOP_SERVER_DIR` を登録する。

### B-4. 初回デプロイ

1. （自動化前に手動で確認する場合）本番ビルドを作る。

   ```sh
   NEXT_PUBLIC_SITE_URL=https://本番ドメイン npm run build
   ```

   `out/` の**中身**（`.htaccess` を含む隠しファイルも）をFTPクライアントで公開フォルダへアップロードする。隠しファイルを表示する設定にしておくこと。
2. 自動化後は、ワークフローを `dry_run: true` で実行し、続けて本番を実行する。
3. 公開直後に確認する。

   ```sh
   npm run test:smoke -- https://本番ドメイン
   ```

   加えて目視で、PC・スマホの表示、言語切り替え（`/en/`・`/zh/`）、WEB予約リンク、404ページ（存在しないURL）、`http://` でアクセスして `https://` に転送されること、`view-source:` で `robots` が `index, follow`、canonical が本番ドメインであることを確認する。

### B-5. HSTS の有効化（公開から数日後）

HTTPSが全ホスト名（`www` あり・なし）で正常に動くことを確認してから、`public/.htaccess` の `Strict-Transport-Security` のコメントを外して再デプロイする。まずは `max-age=31536000`（1年）のままで十分。`includeSubDomains` や `preload` は他のサブドメインへの影響を確認してから。

## 3. テスト環境（GitHub Pages）

1. Settings → Pages → Source が `GitHub Actions` であることを確認する。
2. 本番ドメインが決まったら、リポジトリ変数 `PRODUCTION_URL` を設定する（設定すると、テスト環境の canonical が本番URLに統合される。テスト環境は常に `noindex`）。
3. テスト環境は検索エンジンに載せない運用のままにする。`NEXT_PUBLIC_NOINDEX=1` を外さない。

## 4. 検索エンジン・計測

1. **Google Search Console / Bing Webmaster Tools** にプロパティを追加する（ドメインプロパティ推奨）。所有確認にメタタグを使う場合は、Variables にコードを登録して `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` / `NEXT_PUBLIC_BING_SITE_VERIFICATION` を `build-production` に渡す（手順は github-actions-deploy.md の 2-2 の 4）。DNS認証ならコード変更は不要。
2. `https://本番ドメイン/sitemap.xml` を送信する。
3. 公開後1〜2週間で、カバレッジ・canonical・hreflang・構造化データ（リッチリザルト）にエラーがないか確認する。
4. アクセス解析（GA4 / Plausible 等）を入れるか決める。個人サイトなので任意。導入する場合は、プライバシーポリシーの掲載・同意の要否を先に判断する。
5. 詳細は [seo-manual-tasks.md](seo-manual-tasks.md) と [seo-next-steps.md](seo-next-steps.md)。

## 5. 被リンク・エンティティの紐付け（クリニック側）

1. クリニック公式サイトの医師紹介ページ（`/doctor/`）から本サイトへリンクしてもらう（最も効果が大きい被リンク）。
2. 本人の公開プロフィール（researchmap、ORCID、PubMed、学会ページ等）が確認できたら、`src/lib/metadata.ts` の `personNode()` の `sameAs` に追加する。確認できていないURLは追加しない。
3. Google ビジネスプロフィールの名称・住所・電話・診療時間を、構造化データの `MedicalClinic` と一致させる（クリニック運営側の作業）。
4. X(Twitter) アカウントを作成した場合は `twitter:site` / `twitter:creator` を追加する。

## 6. 公開後の運用

- 実記事の公開: [dialogues.md](dialogues.md)。`src/lib/dialogues.ts` の `realDialogues` に追加すると、本番にも「人間交差点」が現れる（ナビ・トップのティーザー・sitemap・feed が自動で有効になる）。公開前にOGカード生成（`npm run images:social`）も行う。
- 依存パッケージ: 月1回 `npm audit` と `npm outdated` を確認する。Next / React の major 更新時は `node_modules/next/AGENTS.md` の注意を確認する。パッケージの新バージョンは公開から1週間以上経ったものを選ぶ。
- 診療情報の定期確認: 公式サイトの料金・診療時間・施術内容が変わっていないか（`careCheckedAt` の運用は 1-1）。
- 外部リンクの死活確認: `npm run build:pages && node scripts/serve.mjs` のうえで `npm run test:links -- --external`。
- Search Console の定期確認（インデックス状況、Core Web Vitals、モバイルユーザビリティ）。
- ロリポップのプラン・SSL証明書・ドメインの更新期限の管理。

## 7. 既知の注意点

- `experimental.globalNotFound` は実験的機能。Next の更新時は 404 ページの出力（`out/404.html` の `lang="ja"`、`noindex`）を確認する。
- `output: export` は「生成ルートが0件」を許さないため、対談が1件もない本番ビルドでは `/dialogues/_` を一度ビルドし、`scripts/prune-dialogues.mjs` が削除している。ビルドコマンドを変えるときは、`strip-preconnect` → `prune-dialogues` の順で実行すること。
- `scripts/care-check.mjs` と `scripts/dialogue-check.mjs` は `/dr-chihara` 配置前提（テスト環境用）。本番ビルドではルート配置の `browser-check` と `smoke-check` を使う。
- FTPアップロードはアトミックではない。デプロイの途中で数十秒〜数分、新旧ファイルが混在し得る。アクセスの少ない時間帯に行う。
- 本番は静的ファイルのみで、サーバー側で `npm` や `next start` を実行する必要はない。
