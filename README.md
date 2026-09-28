# Yoshitomo Chihara — Personal Website

千原良友先生の個人サイト。日本語・英語・中国語（簡体字）の静的サイトです。

- Next.js 16.3.5 / React 19.3.0 / TypeScript
- App Router、`output: 'export'`、`trailingSlash: true`
- 日本語 `/`、英語 `/en/`、中国語 `/zh/`
- 各言語の静的HTML・メタデータ・canonical・hreflang・構造化データ（ページごとに1つの JSON-LD `@graph`）
- 写真とフォントをローカル配信。外部CMS・API・Node.jsサーバー不要
- GitHub Pages: https://mori-tt.github.io/dr-chihara/

## 設計上の判断（SEO / UX）

- **見出し構造**: トップの `<h1>` は氏名と肩書（各言語）。大きな英字 `CARE BEYOND BEAUTY.` は装飾（`.hero-display`, `aria-hidden`）として残し、検索エンジンにはページ主題＝人物として伝える。
- **予約導線**: クリニック公式の WEB予約 `https://www.norris-beauty-clinic.com/reserve/` を、ヘッダー・モバイルメニュー・お問い合わせ・診療ページ・フッターに配置。お問い合わせフォームは二次導線。定数は `src/lib/content.ts`（`clinicReserveUrl` など）に集約。
- **フォント**: Webフォントは DM Sans（欧文、約36KB）のみ。日本語・中国語はOS標準フォント（Hiragino / Yu Gothic / PingFang / Noto CJK）。Noto Sans JP を配信すると1ページあたり約44リクエスト・約860KB増えるため外した。OGカード生成スクリプトだけが devDependency の `@fontsource-variable/noto-sans-jp` を使う。
- **色**: `--muted: #5e6058`、`--accent: #ad3e2a` はすべての背景色（`#e8e8df` など）で 4.5:1 以上を満たす値。ラベル類の最小文字サイズは 10px、本文は 15〜16px。
- **画像**: `<Picture>`（`src/components/picture.tsx`）が `name-{width}.webp` の `srcset` を出力。変種は `npm run images:responsive` で生成（`scripts/prepare-responsive-images.mjs`）。縦長だったストック写真2点はレイアウトどおり横長に切り出し済み。
- **CSS**: `globals.css` は全ページ共通。`care.css` は診療ページ（`field-page.tsx`）、`dialogues.css` は対談ページ（`dialogues.tsx`）からのみ import し、ルート単位で読み込まれる。トップのティーザー用スタイルは `globals.css` 側。
- **構造化データ**: `MedicalClinic` の座標は公式アクセスページの地図埋め込み（34.664259, 135.520492）。`ReserveAction`・Instagram の `sameAs`・`Person` と `MedicalClinic` の `@id` 相互参照を含む。診療ページの `<title>`・description は `fields.ts` の `seoTitle` / `seoDescription`。

## 開発

Node.js 24以上推奨。

```sh
npm ci
npm run dev
```

翻訳とプロフィール: `src/lib/content.ts`。サイト構成: `src/components/site.tsx`。スタイル: `src/app/globals.css`。

対談シリーズ「人間交差点」の一覧・詳細を `/dialogues/` に追加しています。3言語対応の架空の医師との再生医療対談サンプルと、今後の記事追加手順は [docs/dialogues.md](docs/dialogues.md) を参照してください。記事データは `src/lib/dialogues.ts`、サンプル本文は `src/lib/sample-dialogue.ts`、対談用スタイルは `src/app/dialogues.css` にまとめています。

診療分野の詳細ページを `/fields/rejuvenation/`（美容医療）、`/fields/regenerate/`（再生医療）、`/fields/urology/`（泌尿器科）に用意しています。英語 `/en/fields/`・中国語 `/zh/fields/` も静的生成し、クリニック公式の案内をもとに一般向けの概要、相談の流れ、注意事項、公式ページへのリンクを掲載しています。

## GitHub Pages

`main` へのpushで `.github/workflows/pages.yml` がビルド・型チェック・デプロイを行います。Pagesの公開元は **GitHub Actions**。

`build:pages` では `NEXT_PUBLIC_NOINDEX=1` が付き、GitHub Pages側の全ページに `noindex` を出力します（本番ドメインとの重複コンテンツ防止）。本番ビルドではこの変数を付けないでください。

```sh
npm run build:pages
node scripts/serve.mjs
```

`http://127.0.0.1:4173/dr-chihara/` で静的出力を確認できます。別のターミナルから:

```sh
npx playwright install chromium
npm run test:browser
```

3言語 × PC・タブレット・スマートフォンを検証。`<h1>` が氏名であること、WEB予約リンク、構造化データの `@graph`、言語切り替え、横はみ出し、写真、メニュー、経歴、メタデータ、JavaScript無効時の本文を確認します。診療ページは `npm run test:care`、対談ページは `node scripts/dialogue-check.mjs`。

## ロリポップへの移設

本番ドメインに合わせて**ビルドし直し**、`out/` **の中身**をロリポップの公開ディレクトリにFTPでアップロードします。GitHub Pages向けの出力をそのまま移すと `/dr-chihara` が残るため、下記の本番ビルドを使用してください。

```sh
NEXT_PUBLIC_SITE_URL=https://YOUR-DOMAIN.example npm run build
```

サブディレクトリに配置する場合:

```sh
NEXT_PUBLIC_BASE_PATH=/profile NEXT_PUBLIC_SITE_URL=https://YOUR-DOMAIN.example/profile npm run build
```

`NEXT_PUBLIC_SITE_URL` は末尾 `/` なし。ルート配置時の `NEXT_PUBLIC_BASE_PATH` は未設定。SSLと独自ドメインはロリポップの管理画面で設定してください。サーバー上で `npm` や `next start` を実行する必要はありません。

ルート配置のローカル検証:

```sh
TEST_BASE_PATH= node scripts/serve.mjs
TEST_URL=http://127.0.0.1:4173 npm run test:browser
```

公開ドメインが未指定の場合、canonical等はGitHub PagesのURLを使用します。本番移設時には必ず `NEXT_PUBLIC_SITE_URL` を設定してください。本番向けは `npm run build`（`NEXT_PUBLIC_NOINDEX` なし）なので、全ページが `index, follow` で出力されます。

## コンテンツと画像の出典

調査日: 2026-09-20。ブラウザによるレイアウト確認にPlaywrightを使用。

- [医師プロフィール](https://www.norris-beauty-clinic.com/doctor/): 経歴・資格・所属・診療への考え方
- [クリニック](https://www.norris-beauty-clinic.com/): 診療情報と連絡先
- [院内紹介](https://www.norris-beauty-clinic.com/clinic/): 写真
- [デザイン参考](https://daisukesugiyama.jp/): 人物を主役にした構成、大きなタイポグラフィ、プロフィールから経歴へつながる流れを参考に独自実装。参考サイトの画像・ロゴ・文章は転載していません。

写真は依頼者の許可範囲に基づきクリニック公式サイトから取得しWebP化:

| ローカルファイル    | 取得元ファイル（公式サイト `/wp-content/uploads/` 内） |
| ------------------- | ------------------------------------------------------ |
| `portrait.webp`     | `6eb5505f4e0d25eec6d67e784ed129a7.jpg`                 |
| `consultation.webp` | `KAT_0764.jpg`                                         |
| `reception.webp`    | `KAT_0876.jpg`                                         |
| `lounge.webp`       | `KAT_0890.jpg`                                         |

英語・中国語の文章は本サイト用の翻訳です。公式サイト未掲載の受賞・実績・論文・ニュースは追加していません。氏名の英語表記は公式サイトの `yoshitomochihara` 画像名に基づきます。予約・お問い合わせは既存のクリニック窓口へ誘導し、本サイト自体では個人情報を収集しません。英語・中国語の診療対応を保証する表記はしていません。

「専門医・資格・所属学会」の8項目は、2026-09-20に依頼者から提供された情報を原文どおり反映し、英語・中国語に翻訳しています。追加の専門医・指導医等を公式サイトの掲載情報と誤って扱わないよう、出典をここに区別しています。

認定状況は依頼者確認済み。「学位」「専門医・資格」「所属学会」の3分類で表示しています。診療相談と取材・対談の依頼は別導線にし、後者は `#editorial-contact` から既存のクリニック共通フォームへ案内します。専用受付や外国語での対応を新たに保証するものではありません。

研究・医療・対話・日常のイメージ写真5点をPexelsからダウンロードし、WebP化してサイト内から配信しています。人物写真は架空のゲストの肖像として使用していません。ダウンロード元・配布者・ライセンス・配置場所は [画像出典一覧](docs/image-sources.md) を参照してください。

SNS共有画像は `public/images/og/` に6種類×3言語の1200×630 PNGを収録しています。ローカル写真とフォントを用い、`npm run images:social` で再生成できます（Playwright Chromiumが必要）。ビルド時の画像生成APIや外部アクセスは不要です。プロフィール・対談一覧・サンプル記事・診療分野3ページのOG/Twitter画像へ設定済みです。公開記事用のカードは `scripts/prepare-social-images.mjs` の `cards` に `article-{slug}` を追加して生成します。ファビコンのPNGフォールバック、apple-touch-icon、`favicon.ico`（32/48px）は `npm run images:icons` で `public/icon.svg` から再生成できます。

`scripts/research.mjs` は参考サイトの調査用。`scripts/prepare-images.mjs` と `scripts/prepare-stock-images.mjs` は制作時に取得した一時画像の変換用で、通常のビルドには不要です。写真を追加・差し替えたときは `npm run images:responsive` で `-480/-800/-1200` の変種を再生成してください。配信フォント（DM Sans）のライセンスは `public/licenses/dm-sans.txt` を参照してください。
