# ストック写真の出典

取得・確認日: 2026-09-20。写真はPexelsの配信元からダウンロードし、`sharp` で最大幅1600pxのWebPに変換しています。画像生成・人物の合成は行っていません。静的出力に含まれるため、閲覧時にPexelsへのアクセスは不要です。

| 保存先（`public/images/stock/`） | 配布者                      | 写真ページ                                                                                               | 用途                                           |
| -------------------------------- | --------------------------- | -------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `laboratory.webp`                | Chokniti Khongchum / Pexels | [Person Holding Laboratory Flask](https://www.pexels.com/photo/person-holding-laboratory-flask-2280571/) | 対談コーナー、一覧・記事カバー、再生医療の案内 |
| `microscope.webp`                | Edward Jenner / Pexels      | [A Researcher Using a Microscope](https://www.pexels.com/photo/a-researcher-using-a-microscope-4031522/) | 対談本文、診療分野のイメージ                   |
| `stethoscope.webp`               | Pixabay / Pexels            | [Blue and Silver Stethoscope](https://www.pexels.com/photo/blue-and-silver-stetoscope-40568/)            | 対談本文、診療分野のイメージ                   |

写真ページには地域・取得方法によるアクセス制限がある場合があります。40568は写真ページの直接取得に失敗しましたが、Pexels配信元からのダウンロード・画像確認は成功し、写真ページURLとPixabay名義は複数の既存出典表示でも確認しています。

## ダウンロードURL

- `https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=1800`
- `https://images.pexels.com/photos/4031522/pexels-photo-4031522.jpeg?auto=compress&cs=tinysrgb&w=1600`
- `https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=1200`

## 利用条件と表示

[Pexels License](https://www.pexels.com/license/) を確認。無料でのウェブサイト利用・加工が認められ、クレジットは必須ではありませんが、本サイトでは出典を記録しています。写真に写る人物・ブランドからの推薦を示唆しないよう、写真はイメージであると明示しています。クリニック設備・対談の記録・治療成績としては表示しません。

依頼で挙げられた [Unsplash](https://unsplash.com/license)、[Pixabay](https://pixabay.com/service/license-summary/) のライセンス案内も確認しました。今回実際に採用した素材の取得元はPexelsです（1点の配布者名がPixabay）。

通常のビルドで再ダウンロードは不要です。変換用 `scripts/prepare-stock-images.mjs` は制作時の一時画像を入力とする補助スクリプトです。
