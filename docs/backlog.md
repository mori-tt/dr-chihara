# 今後のタスク・課題一覧

最終更新: 実装スコープ完了時点（SEO基盤・構造化データ・RSS・a11y改善まで対応済み）。
コード側でできることは概ね対応済み。残りは外部作業・コンテンツ・デザイン判断・継続運用に分類される。

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

1. **ヒーローの言語比重** — `CARE BEYOND BEAUTY.` の巨大英字が主役で日本語コピーは副次的。日本語ユーザーのファーストコンタクトとして意図通りか確認。変更する場合はデザイン調整が必要。
2. **404ページの導線** — 現状はヘッダー/フッターなしの簡素構成(noindex)。言語切替や主要リンクを足すかは判断事項。
3. **ダークモード** — `color-scheme: light` 固定の設計。対応するならカラートークン全体の見直しが必要。
4. **X(Twitter)アカウント** — 作成したら `twitter:site`/`twitter:creator` を追加(各メタデータヘルパーに1行ずつ)。OG/Twitter Cardの画像・タイトルは対応済み。

## D. 技術的な既知の制約・負債

1. **404の `<html lang>`** — `app/not-found.tsx` はグループ別ルートレイアウトの外で描画されるため `lang` を付けられない。直すには言語別html構造の再設計が必要。noindexのエラーページなので実害はほぼない。
2. **記事カバー画像のOGフォールバック** — 生成OGカードがない記事はカバーwebp(767×511)にフォールバック。webpは一部OG対応が弱いクローラがあるため、公開時は専用カード生成を推奨。
3. **`out/*.txt`(RSCペイロード)** — robots.txtでブロックしていないのは意図的。クロール側で必要になり得るためdisallowしない。
4. **E2Eテストの拡充余地** — 現状は `browser-check`/`care-check`/`dialogue-check` の独自スクリプト。構造化データの妥当性チェックやリンク切れ検査をCIに載せる余地あり。

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
```
