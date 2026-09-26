# SEO — 外部設定が必要な作業

このドキュメントは、コード変更だけでは完了できず、ドメイン管理画面・Googleアカウント・クリニック運営側の確認が必要な項目です。

## 1. 独自ドメインを決めて接続する

候補は `yoshitomo-chihara.jp`（日本を主対象）または `yoshitomo-chihara.com`（国際向け）です。ドメイン取得後、GitHub PagesのCustom domainへ登録し、DNSにGitHub指定のCNAME/Aレコードを設定します。

接続後に必要な作業:

1. `NEXT_PUBLIC_SITE_URL` を本番ドメインへ変更
2. `next.config.ts` の `basePath` を本番構成に合わせて確認
3. 旧GitHub Pages URLから新ドメインへの導線を残す
4. Search Consoleで新ドメインを登録

## 2. Google Search Console

ドメインプロパティを登録し、以下を送信・確認します。

所有権の確認タグは環境変数に設定するだけで全ページの `<meta name="google-site-verification">` に出力されます（Bingも同様）。

```sh
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=Search Consoleの確認トークン
NEXT_PUBLIC_BING_SITE_VERIFICATION=Bing Webmaster Toolsの確認トークン
```

- `https://本番ドメイン/sitemap.xml`
- 日本語トップページ
- `/en/` と `/zh/` のトップページ
- 美容医療・再生医療・泌尿器科ページ
- 公開済みの人間交差点記事

確認項目:

- ページがインデックス登録可能か
- canonicalが意図したURLか
- hreflangの相互参照にエラーがないか
- モバイルユーザビリティ
- Core Web Vitals
- 検索パフォーマンス（国・言語・検索語別）

## 3. Googleビジネスプロフィール

診療所の正式な所在地・電話番号・診療時間・公式サイトURLは、個人サイトではなくノリス美容クリニックの公式プロフィールとGoogleビジネスプロフィールで統一します。個人サイト側の情報と異なる表記を追加する場合は、クリニック運営側の確認が必要です。

## 4. 実在する記事の公開

現在の対談サンプルは架空記事です。実際の対談を公開する際は、公開前に以下を確認してください。

- 登壇者本人の掲載許諾
- 写真・肩書き・発言の確認
- 医療情報の内容確認
- 公開日・更新日の確定
- 参考資料・注意事項の掲載
- 架空サンプルから `published` 記事への変更

## 5. 中国語圏への展開を広げる場合

Googleの中国語検索を対象にする場合は、`/zh/` の簡体字ページを継続的に更新します。中国本土のBaiduやWeChat等を主対象にする場合は、Googleとは別の検索流入施策、アカウント、法務・広告表現の確認が必要です。

## 6. 更新日の運用

サイトマップと構造化データの更新日は `src/lib/metadata.ts` の `siteLastModified` で管理しています。本文を実際に更新した日に合わせて更新してください。内容を変更していないのに日付だけ更新する運用は避けます。

## 参考

- [Google Search Central: 多言語・多地域サイト](https://developers.google.com/search/docs/advanced/crawling/managing-multi-regional-sites)
- [Google Search Central: ProfilePage構造化データ](https://developers.google.com/search/docs/appearance/structured-data/profile-page)
- [Google Search Central: sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)
- [Google Search Console: International Targeting廃止](https://support.google.com/webmasters/answer/12474899)
