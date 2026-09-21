# 診療コンテンツの参照元

診療ページは、ノリス美容クリニックが公開している診療案内を参照し、個人サイト向けに要点を整理・言い換えています。料金・提供体制・適応・リスクは変更される可能性があるため、サイト上では公式ページへのリンクと「一般情報」の注意書きを併記しています。

参照日：2026-09-22

日本語・英語・中国語の3言語で、悩み別の入口、治療方法、通院・回復の目安、主な注意点、受診の流れ、料金、FAQ、受診前の準備を掲載しています。内容は折りたたまず、追従目次から移動できる構成です。

## 美容医療

- https://www.norris-beauty-clinic.com/
- https://www.norris-beauty-clinic.com/hifu/
- https://www.norris-beauty-clinic.com/photofacial/
- https://www.norris-beauty-clinic.com/harg/
- https://www.norris-beauty-clinic.com/beautiful_skin/
- https://www.norris-beauty-clinic.com/botox/
- https://www.norris-beauty-clinic.com/liftup/
- https://www.norris-beauty-clinic.com/picolaser/
- https://www.norris-beauty-clinic.com/dermapen/
- https://www.norris-beauty-clinic.com/hyaluronic/
- https://www.norris-beauty-clinic.com/vital/
- https://www.norris-beauty-clinic.com/epilation/

## 再生医療

- https://www.norris-beauty-clinic.com/regenerate/
- https://www.norris-beauty-clinic.com/stem_cell/
- https://www.norris-beauty-clinic.com/prp/
- https://www.norris-beauty-clinic.com/exosome/

## 泌尿器科

- https://www.norris-beauty-clinic.com/urology/

## 料金と補足の一次資料

- https://www.norris-beauty-clinic.com/fee/
- https://www.urol.or.jp/public/symptom/
- https://www.fda.gov/medical-devices/aesthetic-cosmetic-devices/dermal-fillers-soft-tissue-fillers
- https://www.caa.go.jp/notice/entry/032715/
- https://www.mhlw.go.jp/content/10800000/001282062.pdf
- https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000150542_00016.html

## 掲載時の判断と更新時の注意

- 料金は公式掲載の税込金額を代表例として掲載。対象部位・量・条件を併記し、再生医療の初回限定価格を通常料金として扱わない。
- 培養幹細胞の料金は `stem_cell` ページを参照。初診相談料、検査・採取・培養を含む範囲、再投与、日本の公的保険に加入していない方の料金、通訳の別途手配を区別する。
- 泌尿器科は診療内容・検査・保険適用によって費用が変わるため、根拠のない一律料金を作らない。CTや膀胱鏡は必要時の紹介先を含む検査として説明し、院内で常時実施できると断定しない。
- 自家培養幹細胞、PRP、培養上清・エクソソームを同じものとして説明しない。効果の個人差、適応の判断、未確立の点を明示する。
- 厚生労働省のエクソソームに関する通知は2024年7月31日付資料として紹介し、通知時点と最新の承認状況を混同しない。
- 公式ページ内で記述が統一されていない培養施設や製品の承認状況を、個人サイトで独自に断定しない。使用製品・対象部位・承認範囲を診察で確認する案内にする。
- 医師による監修済みとは表示しない。効果保証、他院より優れているとの表現、架空の症例や体験談を追加しない。

## 動作確認

`npm run build:pages` 後に `node scripts/serve.mjs` で静的出力を配信し、`npm run test:care` を実行。日本語・英語・中国語の3診療ページを幅1440・768・390・320pxで確認する。治療項目数、ページ内移動、現在位置表示、料金表の幅、診療間リンク、パンくず、画像・実行時エラーを検査し、JavaScript無効時も本文と移動リンクが利用できることを確認する。

WebKitでの確認は `TEST_ENGINE=webkit npm run test:care`。スクリーンショットはgit管理外の `test-results/` に保存する。

この個人サイトは診断・治療の代替ではありません。医療広告に関わる表現、料金、症例、治療の提供可否は、公開前にクリニック側で確認してください。
