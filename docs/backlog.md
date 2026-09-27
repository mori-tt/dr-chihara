# 今後のタスク・課題一覧

最終更新: 2026-09-27（SEO / UI・UXリファクタリング後）。
コード側でできることは概ね対応済み。残りは外部作業・コンテンツ・デザイン判断・継続運用に分類される。

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

## B. コンテンツ・編集作業

1. **実対談記事の公開** — 詳細は [dialogues.md](dialogues.md)。要約:
   - `src/lib/dialogues.ts` に `status: "published"` で追加（`publishedAt` 必須、更新時は `updatedAt`）
   - 3言語の翻訳・カバー画像を用意
   - OGカード: `scripts/prepare-social-images.mjs` の `cards` に `article-{slug}` を追加 → `npm run images:social`
   - 許諾・事実確認を得てから公開。公開後はsitemap・Article schemaに自動で入る
2. **架空サンプルの扱い** — 実記事が揃ったらサンプル(`/dialogues/sample/`)を置き換えるか削除判断。noindex維持の仕組みは済み。
3. **日付の保守** — トップ更新時に `NEXT_PUBLIC_SITE_LAST_MODIFIED`(env)または `siteLastModified` を更新。診療情報を再確認したら `careCheckedAt`(src/lib/care-guide.ts) を更新。料金表・診療時間はクリニック公式と定期的に照合する。
4. **クリニック情報の確認** — 構造化データの住所・電話(06-6772-3456)・診療時間(水〜日 10:30–19:00)・座標が公式と一致しているかクリニック側に確認。

## C. UX・デザインの検討課題（判断保留中）

1. **ヒーローの英字タイポ** — `<h1>` は氏名に変更済み。巨大英字 `CARE BEYOND BEAUTY.` は装飾として残している。日本語ユーザー向けに縮小・撤去するかはデザイン判断。
2. **日本語フォント** — OS標準フォントに切り替えたため、Windows では游ゴシック/メイリオで表示される。ブランド上 Noto Sans JP が必須なら、使用文字だけを含むサブセット化（`subset-font` 等）で数十KBに抑えて再導入する。
3. **ダークモード** — `color-scheme: light` 固定の設計。対応するならカラートークン全体の見直しが必要。
4. **X(Twitter)アカウント** — 作成したら `twitter:site`/`twitter:creator` を追加(各メタデータヘルパーに1行ずつ)。OG/Twitter Cardの画像・タイトルは対応済み。
5. **診療ページの長さ** — モバイルで約13,000px。内容を折りたたまない方針のため、さらに短くするなら治療項目ごとの個別ページ化（`/fields/rejuvenation/hifu/` など）を検討。SEO上も個別URLが有利。

## D. 技術的な既知の制約・負債

1. **404の `<html lang>`** — `app/not-found.tsx` はグループ別ルートレイアウトの外で描画されるため `lang` を付けられない。直すには言語別html構造の再設計が必要。noindexのエラーページなので実害はほぼない。
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
