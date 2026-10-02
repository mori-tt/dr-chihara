# SEO — 手作業が必要なタスク（2026-10-02 監査より）

コードで対応できる項目は実装済みです。以下は、ドメイン・アカウント・コンテンツ判断・クリニック側の確認が必要なものです。詳細な設定手順は [seo-next-steps.md](seo-next-steps.md) も参照してください。

## 実装済み（参考）

- 人間交差点の一覧ページ: 公開記事が0件の間は `noindex`。sitemap と RSS 自動検出（`<link rel="alternate" type="application/rss+xml">`）からも外れる。**最初の実記事を `published` にした時点で、自動的に index・sitemap・RSS 自動検出の対象になる**（追加作業なし）。
- ホームの title / description を3言語とも「大阪・上本町」「ノリス美容クリニック」入りに変更。英語 description は約150字に短縮。
- 英語の診療ページ title を約60字以内に短縮（ブランド名付与後）。英語 description も短縮。
- 診療ページ・対談ページの JSON-LD に `WebSite` / `Person` / `MedicalClinic` ノードを追加し、`@id` 参照がページ内で解決するように変更。
- 外部リンクの `rel="noreferrer"` を外し `noopener` のみに変更（クリニック公式側のアクセス解析に本サイトからの流入が出る）。
- `/fields/`（`/en/fields/`・`/zh/fields/`）の診療分野一覧ページを新設（index 対象・sitemap 掲載・CollectionPage 構造化データ）。診療ページのパンくずを「ホーム / 診療のフィールド / 各診療」の3階層（BreadcrumbList も同様）に変更。
- ヘッダーのデスクトップナビ「診療のフィールド」は、ホームではページ内アンカー、それ以外のページでは `/fields/` へリンク。
- ホームの `<h1>` の氏名を「千原良友」（テキスト上はスペースなし、見た目の字間は CSS）に統一。
- **治療・症状別の個別ページ（20項目×3言語=60ページ）を新設**: `/fields/rejuvenation/hifu/` のように、各診療ページの項目ごとに専用URLを用意（流れ・経過・リスク・該当する公式料金・同一分野の他項目へのリンク）。title / description は `src/lib/care-topics.ts` の `topicSeo()` で自動生成（「大阪・上本町」入り）。診療ページ側の各項目は「概要＋リスク＋詳細ページへのリンク」に圧縮し、重複コンテンツと縦長を解消。sitemap・BreadcrumbList（4階層）・MedicalWebPage 構造化データにも反映。項目を追加するときは `src/lib/care-guide.ts` の `careTopics` に足せば個別ページも自動生成される。
- 日本語・中国語の診療ページ title を短縮し、末尾のブランド名が切れにくいように変更。
- 404 ページに `<html lang="ja">` を付与（`experimental.globalNotFound` と `src/app/global-not-found.tsx`。Next.js 側の実験的機能のため、Next 更新時は 404 の出力を確認すること）。
- 診療ページの「公式の詳しい説明」リンクに、施術・症状名を含むアンカーテキスト（画面上は非表示・スクリーンリーダーと検索エンジンには有効）を追加。

## 1. 【最優先】本番公開（noindex の解除）

現在の GitHub Pages 版は全ページ `noindex` で、このままでは検索結果に出ません。

1. 独自ドメインを決定・取得（`yoshitomo-chihara.jp` 等）
2. 本番ビルド: `NEXT_PUBLIC_SITE_URL=https://本番ドメイン npm run build`（`NEXT_PUBLIC_NOINDEX` を付けない）
3. `out/` の中身をロリポップ等の公開ディレクトリへアップロード（README「ロリポップへの移設」参照）
4. GitHub Pages 側のビルドに `NEXT_PUBLIC_CANONICAL_URL=https://本番ドメイン` を追加し、canonical を本番へ統合
5. Search Console / Bing Webmaster Tools を登録し、`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` / `NEXT_PUBLIC_BING_SITE_VERIFICATION` を設定して再ビルド
6. `https://本番ドメイン/sitemap.xml` を送信
7. 公開後、以下を確認: `view-source:` で `robots` が `index, follow` であること、`<title>` が想定どおりであること、Search Console のリッチリザルト／構造化データのエラーがないこと、検索結果での title の切れ方（特に日本語・中国語の診療ページ）

## 2. 被リンク・エンティティの紐付け（クリニック側・本人の確認が必要）

- クリニック公式サイトの医師紹介ページ（`/doctor/`）から本サイトへリンクしてもらう。最も効果の大きい被リンクで、`Person.sameAs` の相互参照にもなる。
- 実在する本人の公開プロフィール（researchmap、ORCID、PubMed、学会ページなど）の URL を確認し、`src/lib/metadata.ts` の `personNode()` の `sameAs` に追加する。確認が取れるまで追加しない。
- Google ビジネスプロフィールの名称・住所・電話・診療時間を、構造化データの `MedicalClinic`（`clinicSchema()`）と一致させる。クリニック運営側の作業。

## 3. コンテンツ（編集判断が必要）

- **診療ページ・個別ページの差別化**: 公式サイトの施術説明の要約になっているため、公式にない独自情報（院長自身の見解、診察で重視する点、リスク説明の考え方）を追記する。内容は医療広告ガイドラインと本人確認が必要。
- **ホームの情報量**: 日本語本文が約3,400字。学会発表・論文・メディア掲載など、確認済みの実績があれば追加する。未確認の情報は載せない。
- **実対談記事の公開**: 手順は [dialogues.md](dialogues.md)。公開すると人間交差点の一覧ページが自動で index 対象になる。許諾・事実確認が前提。

## 4. 設計判断（任意）

- **`/fields/` 一覧ページ・個別ページの文面**: 現状は既存の診療データ（`careTopics`）を再利用した構成。院長の見解などの独自説明を足す場合は本人確認が必要。
- **個別ページのOG画像**: 診療分野ごとの共通カード（`field-{slug}-{lang}.png`）を使用。項目ごとのカードが必要なら `scripts/prepare-social-images.mjs` に追加。
- **クリニック公式との競合**: 同一キーワードで公式サイトと競合する構成を意図的に採用。公開後、Search Console で公式サイトとの表示順位・クリック数を比較し、必要なら記述を差別化する。

## 5. 運用

- 本文を実際に更新した日に `siteLastModified`（`src/lib/metadata.ts`）、診療情報を再確認した日に `careCheckedAt`（`src/lib/care-guide.ts`）を更新する。内容を変えずに日付だけ更新しない。
- 公開後、Search Console でインデックス状況・canonical・hreflang・Core Web Vitals を定期確認する。
