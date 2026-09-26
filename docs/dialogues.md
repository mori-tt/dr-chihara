# 対談記事の追加・公開

「人間交差点」（英語：Human Crossroads、中国語：人生交汇点）は、千原良友先生の対談シリーズです。外部CMSやサーバー処理は使用せず、記事データから3言語の静的HTMLを生成します。

## 現在のページ

| 言語             | 一覧             | 記事サンプル            |
| ---------------- | ---------------- | ----------------------- |
| 日本語           | `/dialogues/`    | `/dialogues/sample/`    |
| 英語             | `/en/dialogues/` | `/en/dialogues/sample/` |
| 中国語（簡体字） | `/zh/dialogues/` | `/zh/dialogues/sample/` |

GitHub Pagesでは各パスの先頭に `/dr-chihara` が付きます。

サンプルは依頼者の指定により作成した、架空の医師「藤森 悠」との再生医療に関する創作対談です。千原先生側の質問・引用・後記も実際の発言ではなく創作であることを、3言語すべてで表示しています。架空のゲストには所属先や専門資格を付けず、実在人物の写真を肖像として使用していません。写真はPexelsからダウンロードしたイメージ写真で、出典は [image-sources.md](image-sources.md) を参照してください。サンプル詳細は `noindex, follow` とし、サイトマップ・公開記事の構造化データから除外しています。URLを知っている人は閲覧できます。

## 記事を追加する場所

`src/lib/dialogues.ts` の `dialogues` 配列が記事の管理場所です。サンプル本文は `src/lib/sample-dialogue.ts` に分離しています。その `sampleDialogue` オブジェクトを参考に、新しい原稿を配列に追加してください。全言語で共通の英数字・ハイフンの `slug` を指定します。

```ts
{
  slug: "guest-name",
  status: "published",
  publishedAt: "2026-10-01", // 例。実際の公開日に置き換える
  updatedAt: "2026-10-15", // 任意。本文を更新した日。省略時は publishedAt
  volume: "01",
  readingMinutes: 8, // 例。原稿に応じて設定
  cover: "/images/dialogues/guest-name/cover.webp",
  translations: {
    ja: { /* 日本語原稿 */ },
    en: { /* 英語原稿 */ },
    zh: { /* 中国語（簡体字）原稿 */ },
  },
}
```

画像は `public/images/dialogues/guest-name/` などに保存します。パスに `/dr-chihara` を含める必要はありません。これはデプロイ先に合わせて自動的に付与されます。

未公開の実原稿は `dialogues` 配列に入れないでください。`template` は非公開下書き機能ではなく、URLから誰でも見られる雛形用の状態です。原稿を準備し、公開できる段階で配列へ追加します。

## 各言語で用意する内容

- `title`、`category`、`introduction`: 記事タイトル・テーマ・導入文
- `guest`: 名前・肩書き・紹介文。`image` と `imageAlt` でゲスト写真を追加可能
- `coverAlt`、`coverCaption`: カバー写真の代替テキスト・キャプション
- `sections`: 本文の章。`id` は英数字・ハイフンの重複しない値にし、3言語で揃える
- 各章の `exchanges`: `question` と `answer` の組。`answer` 配列の各要素が1段落
- 各章の `image`、`imageAlt`、`caption`: 任意の本文写真
- `quote`: 任意の印象的な言葉。原稿で確認できる実際の発言を掲載
- `afterword`: 対談後記。配列の各要素が1段落
- `credits`: 対談日・場所・取材・構成・撮影など。改行可能

聞き手のプロフィールは `src/components/dialogues.tsx` と `dialogueCopy` から表示します。記事に画像を指定しないゲストは、写真用のプレースホルダーで表示されます。公開する際は実際のプロフィール写真と画像説明を設定してください。

章の追加・削除に目次が自動で追従します。記事詳細で言語を切り替えると、同じ記事の別言語版へ移動します。

## 公開時に自動で変わる部分

`status: "published"` の記事は、一覧に公開日の新しい順に表示されます。最初の公開記事を追加すると、一覧の「公開準備中」とサンプルカードは非表示になります。サンプルのURL自体を削除する場合は配列から `sample` オブジェクトを除きます。

公開記事の詳細には公開日・号数・読了目安が表示され、サンプル案内が消えます。検索エンジン向けに3言語のcanonical・hreflang・OG情報（`article:published_time` 等を含む）・Article構造化データ・サイトマップが生成されます。

公開記事のOG画像は `scripts/prepare-social-images.mjs` の `cards` に `article-{slug}` のカードを追加し、`npm run images:social` を実行すると `/images/og/article-{slug}-{locale}.png` として生成され、メタ情報から自動で参照されます。生成しない場合はカバー写真がそのままOG画像に使われます。

## 確認・デプロイ

```sh
npm run build:pages
npm run typecheck
node scripts/serve.mjs
```

別ターミナル:

```sh
node scripts/dialogue-check.mjs
```

テストは現在のサンプル記事用です。サンプルを削除する際はテストの対象slugとサンプル判定も更新してください。

GitHub Pagesは `main` へのpushで自動更新されます。ロリポップへの移設はREADMEに記載の通常ビルドで、一覧と記事も一緒に `out/` へ出力されます。

## デザイン参考

[myphilosophy.global](https://myphilosophy.global/) の一覧と対談詳細を確認し、ゲスト紹介、章立て、本文写真、対談後記という編集構成を参考にしています。同サイトの本文・出演者情報・画像・ロゴは転載していません。
