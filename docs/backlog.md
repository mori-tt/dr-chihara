# 今後のタスク・課題一覧

最終更新: 2026-09-28（SEOコードレビュー後の修正反映）。
コード側でできることは概ね対応済み。残りは外部作業・コンテンツ・デザイン判断・継続運用に分類される。

## 2026-09-28 SEOコードレビューで対応済み

- **canonical基盤の分離** — `NEXT_PUBLIC_CANONICAL_URL`（新規env、`src/lib/metadata.ts`）を追加。canonical・hreflang・OG・JSON-LDのURL・`@id`はcanonical側、robots.txt・sitemap.xml・RSS feedは配信ホスト側の `siteUrl` を使う。未設定時は従来どおり `siteUrl` にフォールバックするため現行ビルドの挙動は変わらない。
- **Article schema の publisher** — Person → Organization（`logo` = icon.png の ImageObject 付き）に変更。Googleのガイドライン準拠。
- **BreadcrumbList の最終項目に `item` URL を付与** — fields・dialogues両ページ。
- **MedicalClinic に `contactPoint`（予約電話・日本語）を追加**。
- **`/favicon.ico` を生成** — `scripts/prepare-icons.mjs` で 32/48px PNG-in-ICO を出力し、metadata の icons にも `sizes:"any"` で登録済み。
- **OG画像フォールバックの寸法** — 生成カードがない記事で `article.coverWidth/coverHeight` を og:image width/height に出力。
- **`<title>` 区切り統一** — ja の `seoTitle` 内 `｜` を `：` に統一（en `:` / zh `：` と整合）。
- **多言語対応の修正** — Hero写真キャプションの氏名をページ言語に統一（`c.name`）。言語切替の `aria-label` を3言語化。zhの日本語式中黒「・」を「·」に統一（title/role/guest.role）、zhの「大阪・上本町」を「大阪上本町」に修正。en/zh全ページでかな混入ゼロ・属性値まで翻訳済みであることを検証済み。

## 2026-10-02 UI/UX改善で対応済み

- スマホで診療時間の表が切れていた問題を修正（時刻を縦積みにして7列を画面内に収める。1280px以下で適用）。
- ヘッダーのナビが1180px以下でハンバーガーに切り替わるよう変更（単語途中の改行を解消）。ナビ・ロゴは折り返さない。
- 診療ページのパンくずを項目単位で折り返し、スマホでは区切り記号を非表示に。
- 診療ページの「治療を詳しく」を、概要＋リスク＋詳細ページへのボタンのカード形式に変更（PC 1180px以上は2列）。
- モバイルメニューの区切り線のずれを修正。10・11px の文字を12px に引き上げ（ロゴ下の「PHYSICIAN & PHD」のみ10px）。
- タップ領域を拡大（言語切替 幅40px・高さ44px、メニューボタン、電話番号、参考資料リンク等）。
- 人間交差点一覧のカードが1件のときは横長レイアウトに。個別ページの `<h1>` を診療分野ページより小さく調整。

## A. 外部作業（ドメイン・アカウント系）

## 2026-09-27 リファクタリングで対応済み

- トップの `<h1>` を氏名＋肩書に変更（英字の大型タイポは装飾化）。診療ページの `<title>`・meta description を検索意図に合わせて具体化。
- JSON-LD をページごとに1つの `@graph` に統合。`Person`⇄`MedicalClinic` の `@id` 参照、`ReserveAction`、Instagram `sameAs`、座標の修正（公式地図埋め込み値）。
- クリニック公式の WEB予約（`/reserve/`）をヘッダー・メニュー・お問い合わせ・診療ページ・フッターに配置。フッターにクリニックNAP（住所・アクセス・診療時間・電話）を追加。
- Noto Sans JP の配信を停止（約44リクエスト・約860KB/ページ削減）。`care.css` / `dialogues.css` をルート単位で読み込み。ストック写真の縦長2点を横長に切り出し、全画像に `srcset` を付与。
- 最小文字サイズを 10px に引き上げ、`--muted` / `--accent` をコントラスト 4.5:1 以上に調整。写真上キャプションにグラデーション・影を追加。タップ領域を 40〜44px に統一。
- 診療ページ: モバイルの「気になることから探す」を一覧形式に圧縮、公式サイトの未掲載メニュー（ホルモン注射・美容点滴・いぼ/ほくろ/タトゥー除去・メンズ）へのリンクを追加。404ページに主要リンクと言語切替を追加。
- Lighthouse（モバイル・gzip配信）: トップ Performance 84→95、FCP 2.7s→1.2s、LCP 3.8s→2.9s。診療ページ 97→99。

## A. 外部作業（ドメイン・アカウント系）

詳細は [seo-next-steps.md](seo-next-steps.md) を参照。

1. **独自ドメイン取得・接続** — SEO効果が最も大きい残タスク。`yoshitomo-chihara.jp` or `.com`。GitHub Pages側は `NEXT_PUBLIC_NOINDEX=1` でnoindex済みなので、ドメイン決定後は本番ビルド(`NEXT_PUBLIC_SITE_URL` + `npm run build`)がindexableになる構成は済んでいる。
2. **Google Search Console登録** — `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` に確認トークンを入れて再ビルドするだけで全ページに反映。本番sitemap送信・インデックス確認。
3. **Bing Webmaster Tools** — 同様に `NEXT_PUBLIC_BING_SITE_VERIFICATION`。
4. **GoogleビジネスプロフィールのNAP整合** — サイトの `MedicalClinic` 構造化データ（住所・電話・診療時間・座標）と同一情報にすること。
5. **GitHub Pages旧URLの扱い** — noindex適用済み。既にインデックス済みなら自然脱落を待つか、GSCの削除ツールを利用。
6. **Pagesビルドへの `NEXT_PUBLIC_CANONICAL_URL` 設定** — 本番ドメイン確定後、`build:pages` に追加してPages側canonicalを本番へ向ける（仕組みは実装済み、詳細は seo-next-steps.md）。
7. **サイトマップは手動送信** — Pagesプロジェクトサイトでは robots.txt の `Sitemap:` 行が読まれないため、GSC/Bingから `sitemap.xml` を直接送信すること（独自ドメイン移行後は robots.txt 経由でも発見される）。

## B. コンテンツ・編集作業

1. **実対談記事の公開** — 詳細は [dialogues.md](dialogues.md)。要約:
   - `src/lib/dialogues.ts` に `status: "published"` で追加（`publishedAt` 必須、更新時は `updatedAt`）
   - 3言語の翻訳・カバー画像を用意
   - OGカード: `scripts/prepare-social-images.mjs` の `cards` に `article-{slug}` を追加 → `npm run images:social`
   - 許諾・事実確認を得てから公開。公開後はsitemap・Article schemaに自動で入る
2. **架空サンプルの扱い** — 実記事が揃ったらサンプル(`/dialogues/sample/`)を置き換えるか削除判断。noindex維持の仕組みは済み。
3. **日付の保守** — トップ更新時に `NEXT_PUBLIC_SITE_LAST_MODIFIED`(env)または `siteLastModified` を更新。診療情報を再確認したら `careCheckedAt`(src/lib/care-guide.ts) を更新。料金表・診療時間はクリニック公式と定期的に照合する。
4. **クリニック情報の確認** — 構造化データの住所・電話(06-6772-3456)・診療時間(水〜日 10:30–19:00)・座標が公式と一致しているかクリニック側に確認。
   - **2026-09-28 照合済み**: 住所・TEL・診療時間・アクセス・院長経歴(11行)・資格・Instagram・予約/問合せURL・料金15項目・施術詳細(M22/re-Beau2/ボトックス/HIFU/水光/ダーマペン/脱毛/HARG/幹細胞/PRP/エクソソーム/泌尿器科)すべて公式サイトと一致を確認。
   - 差分メモ: 公式の資格欄には「保険医」あり（当サイトは依頼者提供8項目に従い未掲載）。moreOfficialリンクは拡充済み（ホルモン注射・美容点滴・いぼほくろ除去・ピアス・メンズ・料金一覧）。公式側フッターの電話バナー表示は「00-000-0000」のまま（クリニック側の不備・報告候補）。公式にはLINE公式(@167qjgmu)があり当サイト未リンク。
5. **Person `sameAs` の追加候補** — 現在はクリニック公式プロフィールのみ。researchmap・ORCID・学会ページ等、本人の実在する公開プロフィールがあれば `personSchema` の `sameAs` に追加するとE-E-A-T補強になる。実在確認が必要なため未追加。
6. **診療ページ description の長さ** — en版は約150〜160字に圧縮済み。ja版は約110〜140字で重要語は前半配置済み。zh版は約90〜115字。さらに絞るかは編集判断。
7. **写真の高解像度化** — `portrait/consultation/reception/lounge.webp` は最大767px。ヒーロー(約49vw)や retina 環境では1x程度の表示になるため、原画像を1200px以上で書き出せる場合は `scripts/prepare-responsive.mjs` の対象に追加して再生成する。元素材の解像度に依存するため手作業。
8. **フィールドページの `sections[]` 運用方針** — 2026-09-28に未使用分(配列1番目以降)を削除し、`sections[0]`(ヒーロー導入文)のみ残した。将来テキストセクションとして描画する場合は `field-page.tsx` にレンダリングを追加する（デザイン判断が先）。

## C. UX・デザインの検討課題（判断保留中）

1. **ヒーローの英字タイポ** — `<h1>` は氏名に変更済み。巨大英字 `CARE BEYOND BEAUTY.` は装飾として残している。日本語ユーザー向けに縮小・撤去するかはデザイン判断。
2. **日本語フォント** — OS標準フォントに切り替えたため、Windows では游ゴシック/メイリオで表示される。ブランド上 Noto Sans JP が必須なら、使用文字だけを含むサブセット化（`subset-font` 等）で数十KBに抑えて再導入する。
3. **ダークモード** — `color-scheme: light` 固定の設計。対応するならカラートークン全体の見直しが必要。
4. **X(Twitter)アカウント** — 作成したら `twitter:site`/`twitter:creator` を追加(各メタデータヘルパーに1行ずつ)。OG/Twitter Cardの画像・タイトルは対応済み。
5. **診療ページの長さ** — 2026-10-02 に治療・症状別の個別ページ（60ページ）を作成し、診療ページ側の各項目は概要＋リスク＋リンクに圧縮済み。
6. **`/fields/` 中間ページ** — 2026-10-02 に作成済み（3言語・sitemap掲載・パンくず3階層）。文面の拡充は [seo-manual-tasks.md](seo-manual-tasks.md) 参照。
7. **FAQ構造化データの期待値** — GoogleはFAQリッチリザルトを権威ある政府・公的医療サイトに限定済み。本サイトの `FAQPage` スキーマは実装済みだが、検索結果への表示は期待しないほうがよい（実装自体は正しく、残して害はない）。

## D. 技術的な既知の制約・負債

1. **404の `<html lang>`** — 2026-10-02 に `experimental.globalNotFound`（`src/app/global-not-found.tsx`）で `lang="ja"` を付与済み。実験的機能なのでNext更新時に404出力を確認する。
2. **記事カバー画像のOGフォールバック** — 生成OGカードがない記事はカバーwebp(767×511)にフォールバック。webpは一部OG対応が弱いクローラがあるため、公開時は専用カード生成を推奨。
3. **`out/*.txt`(RSCペイロード)** — robots.txtでブロックしていないのは意図的。クロール側で必要になり得るためdisallowしない。
4. **E2Eテストの拡充余地** — 現状は `browser-check`/`care-check`/`dialogue-check` の独自スクリプト（`@graph` の主要ノード・予約リンク・`<h1>` の検証は追加済み）。Rich Results Test 相当の検証やリンク切れ検査をCIに載せる余地あり。
5. **ヘッダーがクライアントコンポーネント** — メニュー開閉のため `header.tsx` 全体が `"use client"`。JS量を詰めるならメニューボタン＋オーバーレイだけを分離する。

## E. 継続運用

- **Search Consoleの定期確認** — カバレッジ・canonical・hreflang・Core Web Vitals・モバイルユーザビリティ
- **コンテンツ更新サイクル** — 実記事追加・診療情報の確認(`careCheckedAt`)・プロフィール・経歴の更新
- **画像ライセンスの棚卸し** — 写真追加時は [image-sources.md](image-sources.md) に出典を追記
- **依存パッケージ更新** — `npm outdated` を定期的に。Next/Reactのmajor update時は `node_modules/next/AGENTS.md` の破壊的変更注意を確認

## 検証コマンド

```sh
npm run typecheck        # 型チェック
npm run build:pages      # GitHub Pages向けビルド(noindex)
npm run build            # 本番向けビルド(NEXT_PUBLIC_SITE_URL必須)
npm run test:browser     # 3言語×4幅のブラウザ検証
node scripts/care-check.mjs    # 診療ページ検証
node scripts/dialogue-check.mjs # 対談ページ検証
npm run images:social    # OGカード再生成
npm run images:icons     # アイコンPNG再生成
npm run images:responsive # 画像のsrcset用変種を再生成
```
