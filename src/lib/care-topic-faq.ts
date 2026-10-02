import { tr, type LocalText } from "./care-guide";

export type CareQA = { question: LocalText; answer: LocalText };

/**
 * Short per-topic Q&A shown on each /fields/{slug}/{id}/ page and emitted as
 * FAQPage JSON-LD. Keep answers grounded in the official clinic information
 * already summarised in care-guide.ts — do not add new medical claims here.
 */
export const topicFaqs: Record<string, CareQA[]> = {
  "skin-analysis": [
    {
      question: tr(
        "診断だけでも受けられますか？",
        "Can I have imaging without treatment?",
        "只做检测不治疗可以吗？",
      ),
      answer: tr(
        "はい。公式では施術を受ける方は診断無料、診断のみの場合は3,000円（税込）と案内されています。撮影時間の目安は約10〜15分です。",
        "Yes. The clinic lists the assessment as free for patients receiving treatment and ¥3,000 (tax included) for imaging only, with about 10–15 minutes of imaging.",
        "可以。官方介绍：接受治疗者免费，仅诊断收费3,000日元（含税），拍摄约10～15分钟。",
      ),
    },
    {
      question: tr(
        "メイクを落とす必要がありますか？",
        "Do I need to remove makeup?",
        "需要卸妆吗？",
      ),
      answer: tr(
        "はい。撮影はメイクを落とした肌で行います。",
        "Yes — images are taken on cleansed skin.",
        "需要，拍摄在卸妆后的肌肤上进行。",
      ),
    },
  ],
  botox: [
    {
      question: tr(
        "効果はいつ頃から現れますか？",
        "When does it start working?",
        "什么时候见效？",
      ),
      answer: tr(
        "公式では2〜3日後から現れ、約3〜4ヶ月持続し、6ヶ月頃に消失すると案内されています。施術約2週間後に状態確認の来院が案内されています。",
        "The clinic describes onset two to three days after injection, effects lasting about three to four months and fading around six months, with a review visit about two weeks after treatment.",
        "官方介绍注射后2～3天起效，约维持3～4个月、6个月左右消退，并在约两周后复诊确认。",
      ),
    },
    {
      question: tr(
        "どんなリスクがありますか？",
        "What are the risks?",
        "有哪些风险？",
      ),
      answer: tr(
        "注射部位の痛み・内出血・アレルギーのほか、眉やまぶたの下垂などが起こり得ます。妊娠・授乳や神経筋疾患などは申告し、製品名と適応の範囲を確認してください。",
        "Pain, bruising and allergy can occur, as can brow or eyelid droop. Disclose pregnancy, breastfeeding and neuromuscular disease, and confirm the product and its indication.",
        "可能疼痛、淤青、过敏及眉眼睑下垂。需告知孕哺及神经肌肉疾病，并确认产品和适应范围。",
      ),
    },
  ],
  "thread-lift": [
    {
      question: tr(
        "ダウンタイムの目安は？",
        "How much downtime should I expect?",
        "恢复期参考是多久？",
      ),
      answer: tr(
        "公式の回復目安は数日〜1週間ですが、ひきつれや凹凸がより長く残る場合があります。大きく口を開ける動作や運動の制限を確認してください。",
        "The clinic lists several days to a week; pulling sensations or unevenness can last longer. Confirm limits on wide mouth opening and exercise.",
        "官方参考为数日至一周，牵拉感或凹凸可能更久，请确认张口与运动限制。",
      ),
    },
    {
      question: tr(
        "糸は体内に残りますか？",
        "Do the threads stay in the body?",
        "线材会留在体内吗？",
      ),
      answer: tr(
        "公式で紹介されているN-COGは吸収性素材の糸です。本数はたるみの程度と希望に応じて決め、総費用を事前に確認します。",
        "The clinic describes absorbable PDO N-COG threads. The number of threads is decided by the degree of laxity and your goals — confirm the total fee beforehand.",
        "官方介绍使用可吸收的PDO材质N-COG线。根数依松弛程度与期望决定，请事前确认总费用。",
      ),
    },
  ],
  photofacial: [
    {
      question: tr(
        "何回くらい必要ですか？",
        "How many sessions are needed?",
        "需要几次治疗？",
      ),
      answer: tr(
        "公式案内は約1か月間隔で4〜5回を目安としています。回数は診察で調整します。",
        "The clinic suggests roughly monthly sessions, often 4–5, adjusted after assessment.",
        "官方以约每月一次、4～5次为参考，具体次数依诊察调整。",
      ),
    },
    {
      question: tr(
        "日焼け直後でも受けられますか？",
        "Can it be done right after tanning?",
        "晒伤后能立即施术吗？",
      ),
      answer: tr(
        "日焼け直後は施術を避けます。施術前後の紫外線対策と保湿を行い、肝斑が疑われる部位は照射の適否を診断します。",
        "Recent tanning is avoided. Follow sun protection and moisturising; areas with suspected melasma are assessed before treatment.",
        "晒伤后不宜施术。需做好前后防晒保湿，疑似黄褐斑区域先评估是否适合照射。",
      ),
    },
  ],
  picolaser: [
    {
      question: tr(
        "ピコトーニングとピコスポットの違いは？",
        "Toning vs spot mode — what is the difference?",
        "嫩肤与祛斑模式有何区别？",
      ),
      answer: tr(
        "局所的に色素を狙う照射と、肌質を目的とした照射では設定や経過が異なります。しみの種類・色・範囲を診察してから照射方法を選びます。",
        "Settings and recovery differ between targeted pigment treatment and texture treatment; the type, colour and area are assessed first.",
        "局部色素照射与肤质照射的设置和恢复不同，需先评估色斑类型、颜色与范围再选模式。",
      ),
    },
    {
      question: tr(
        "かさぶたはできますか？",
        "Will scabs form?",
        "会结痂吗？",
      ),
      answer: tr(
        "スポット照射では生じることがあります。こすらず、無理にはがさず、日焼けを避けてください。",
        "Spot treatment may crust — do not rub or pick, and avoid sun exposure.",
        "局部照射可能结痂，请勿摩擦或剥落并避免日晒。",
      ),
    },
  ],
  hifu: [
    {
      question: tr(
        "どれくらいの間隔で受けますか？",
        "How often is it repeated?",
        "间隔多久做一次？",
      ),
      answer: tr(
        "公式では約3か月ごとの施術を案内していますが、再照射の時期は肌の状態と前回の反応を診て決めます。",
        "The clinic describes roughly three-month intervals; repeat timing follows assessment of the previous response.",
        "官方介绍约三个月一次，但再次治疗需评估皮肤状态与上次反应。",
      ),
    },
    {
      question: tr(
        "この機器は国内で承認されていますか？",
        "Is the device approved in Japan?",
        "该设备在日本获批了吗？",
      ),
      answer: tr(
        "公式ページでは当該機器の国内薬事未承認を明示しています。妊娠中・ケロイド体質・体内金属・ペースメーカー・心疾患のある方は対象外と案内されています。",
        "The clinic identifies it as unapproved under Japanese pharmaceutical/device law and excludes pregnancy, keloid tendency, metal implants, pacemakers and heart disease.",
        "官方注明未获日本药事批准，孕期、疤痕疙瘩体质、体内金属植入、起搏器或心脏病患者不适用。",
      ),
    },
  ],
  dermapen: [
    {
      question: tr(
        "回数の目安は？",
        "How many sessions are typical?",
        "次数参考是多少？",
      ),
      answer: tr(
        "公式は約3〜4週間隔、平均5回目頃からの実感、深いニキビ跡は5〜10回を目安と案内しています。",
        "The clinic lists 3–4-week intervals, clearer results around the fifth session on average and 5–10 sessions for deep scars.",
        "官方参考间隔3～4周，平均约第5次见效，较深痘疤以5～10次为参考。",
      ),
    },
    {
      question: tr(
        "施術当日に入浴やメイクはできますか？",
        "Can I bathe or wear makeup the same day?",
        "当天可以洗澡化妆吗？",
      ),
      answer: tr(
        "公式案内では施術当日は入浴ができずシャワーのみ、メイクは翌日から可能です。赤み・皮むけ・ヒリつきは約1週間続くことがあります。",
        "Showers only on the day and makeup from the next day, per the clinic. Redness, peeling or stinging may last about a week.",
        "官方介绍当天只能淋浴，次日可化妆；泛红、脱皮或刺痛可能持续约一周。",
      ),
    },
  ],
  hyaluronic: [
    {
      question: tr(
        "効果はどれくらい続きますか？",
        "How long do results last?",
        "效果维持多久？",
      ),
      answer: tr(
        "公式では約半年〜1年と案内されています。永久的な治療ではないため、追加注入は落ち着いた状態を診て判断します。",
        "The clinic describes about six months to a year. It is not permanent; further injections follow reassessment.",
        "官方说明约维持半年至1年，并非永久，追加需复评后决定。",
      ),
    },
    {
      question: tr(
        "まれなリスクには何がありますか？",
        "What rare risks exist?",
        "有哪些罕见风险？",
      ),
      answer: tr(
        "まれに血管閉塞による皮膚壊死や視力障害が起こり得ます。強い痛み、皮膚色や見え方の異常は直ちに医療機関へ連絡してください。",
        "Rare vascular occlusion can cause skin necrosis or vision changes. Report unusual pain, skin colour or vision changes immediately.",
        "罕见血管堵塞可致皮肤坏死或视力损害，异常剧痛、肤色或视力改变须立即就医。",
      ),
    },
  ],
  vital: [
    {
      question: tr(
        "効果が出るまでの期間と持続は？",
        "When do effects appear and how long do they last?",
        "效果何时出现、维持多久？",
      ),
      answer: tr(
        "公式では3日〜1週間ほどで現れ約2ヶ月持続すると案内され、2〜3週間のペースで3〜4回、その後1〜2ヶ月ごとの継続が勧められています。",
        "The clinic describes effects in three days to a week lasting about two months, with 3–4 sessions at 2–3-week intervals then visits every 1–2 months.",
        "官方介绍约3天至1周显现、维持约2个月，建议先以2～3周间隔进行3～4次，之后每1～2个月一次。",
      ),
    },
    {
      question: tr(
        "ダウンタイムの目安は？",
        "How much downtime should I expect?",
        "恢复期参考是多久？",
      ),
      answer: tr(
        "公式案内の回復目安は約3日〜1週間。内出血は約2週間かかる場合があります。メイクは翌日以降が目安です。",
        "The clinic lists about 3–7 days; bruising may take two weeks and makeup is generally from the following day.",
        "官方参考为3～7天，淤青可能需两周，一般建议翌日起化妆。",
      ),
    },
  ],
  epilation: [
    {
      question: tr(
        "全身を1回で終わらせられますか？",
        "Can the whole body be done in one visit?",
        "全身能一次完成吗？",
      ),
      answer: tr(
        "全身を1回で施術する運用ではありません。部位により約10〜40分の案内で、毛の生え替わりを考慮して複数回通院します。",
        "Whole-body treatment is not completed in one visit; sessions take about 10–40 minutes per area and repeat around hair growth cycles.",
        "全身并非一次完成，不同部位约10～40分钟，需按毛发周期多次来院。",
      ),
    },
    {
      question: tr(
        "事前に剃毛は必要ですか？",
        "Do I need to shave beforehand?",
        "需要提前剃毛吗？",
      ),
      answer: tr(
        "公式案内では事前の剃毛が必要です。広範囲の剃毛は別料金になる場合があります。",
        "The clinic requests shaving first; extensive shaving may cost extra.",
        "官方要求提前剃毛，大面积代剃可能另收费。",
      ),
    },
  ],
  harg: [
    {
      question: tr(
        "通院の目安はどれくらいですか？",
        "How long is a course?",
        "疗程参考是多久？",
      ),
      answer: tr(
        "公式は約3〜4週間ごとに6回、約5〜6か月の通院を案内しています。その後は年1〜2回のメンテナンスが目安です。",
        "The clinic describes six sessions at 3–4-week intervals over about 5–6 months, then maintenance once or twice a year.",
        "官方参考为每3～4周一次、共六次，约5～6个月，之后每年1～2次维持。",
      ),
    },
    {
      question: tr(
        "施術後にパーマや染色はできますか？",
        "Can I perm, colour or cut my hair afterwards?",
        "治疗后能烫发染发吗？",
      ),
      answer: tr(
        "パーマ・染色は治療後1週間、ヘアカットは3日間控える案内があります。",
        "The clinic advises avoiding perms and colouring for one week and haircuts for three days.",
        "官方建议一周内避免烫发染发，三天内避免理发。",
      ),
    },
  ],
  "stem-cell": [
    {
      question: tr(
        "採取した当日に投与できますか？",
        "Is treatment possible on the day of collection?",
        "采集当天能完成治疗吗？",
      ),
      answer: tr(
        "いいえ。培養に約1か月を要すると案内されています。採血・脂肪採取・分離・培養・品質確認を経て投与します。",
        "No — the clinic lists about one month for culture. Testing, fat collection, separation, culture and quality checks precede administration.",
        "不能。官方介绍培养约需一个月，需经检查、脂肪采集、分离培养和质量确认后投与。",
      ),
    },
    {
      question: tr(
        "効果は保証されますか？",
        "Is effectiveness guaranteed?",
        "效果有保证吗？",
      ),
      answer: tr(
        "効果の有無、持続、追加投与の必要性を事前に保証することはできません。採取からフォローまで通える計画が必要です。",
        "Benefit, duration and the need for repeat treatment cannot be guaranteed; plan for the complete course from collection to follow-up.",
        "效果、持续时间或追加治疗无法事先保证，应安排从采集到随访的完整日程。",
      ),
    },
  ],
  prp: [
    {
      question: tr(
        "効果が出るのはいつ頃ですか？",
        "When do results appear?",
        "效果何时出现？",
      ),
      answer: tr(
        "公式では効果が2週間〜2ヶ月ほどかけて現れ、約6ヶ月〜1年持続すると案内していますが、改善の程度や持続には個人差があります。",
        "The clinic describes effects emerging over two weeks to two months and lasting about six months to a year, with individual variation.",
        "官方介绍效果在2周～2个月间逐渐显现、约维持6个月至1年，存在个体差异。",
      ),
    },
    {
      question: tr(
        "薬を服用していても受けられますか？",
        "Can I have PRP while on medication?",
        "服药期间可以做PRP吗？",
      ),
      answer: tr(
        "抗凝固薬、出血しやすい病気、妊娠、がんや免疫の病気などは必ず申告してください。自己判断で服薬を中止しないでください。",
        "Always disclose anticoagulants, bleeding disorders, pregnancy, cancer and immune conditions — and do not stop medicines yourself.",
        "须告知抗凝药、出血疾病、妊娠、癌症及免疫疾病，不可自行停药。",
      ),
    },
  ],
  exosome: [
    {
      question: tr(
        "エクソソーム治療と幹細胞治療は同じですか？",
        "Is this the same as stem-cell treatment?",
        "与干细胞治疗相同吗？",
      ),
      answer: tr(
        "異なります。培養上清液は細胞を培養した液に含まれる成分を用いるもので、生きた幹細胞の投与とは別です。",
        "No. Supernatant uses substances released during cell culture; it is not the administration of living stem cells.",
        "不同。上清液使用细胞培养时释放的成分，并非活干细胞投与。",
      ),
    },
    {
      question: tr(
        "安全性は確立していますか？",
        "Is safety established?",
        "安全性确立了吗？",
      ),
      answer: tr(
        "厚労省の2024年7月通知は、薬事承認された医薬品がない旨と安全性への留意を示しています。未確立な点を理解した説明・同意が必要です。",
        "A July 2024 MHLW notice reported no approved medicines of this kind and highlighted safety concerns and uncertainty; informed consent is essential.",
        "日本厚劳省2024年7月通知指出当时无此类获批药品，并强调安全性及不确定性，需充分知情同意。",
      ),
    },
  ],
  infection: [
    {
      question: tr(
        "膀胱炎は何科を受診すればよいですか？",
        "Which specialty treats cystitis?",
        "膀胱炎应看什么科？",
      ),
      answer: tr(
        "泌尿器科です。高熱や腰背部痛を伴う場合は腎盂腎炎の可能性があり、早めの評価が必要です。",
        "Urology. Fever and flank/back pain can indicate kidney infection and need prompt assessment.",
        "泌尿科。发热伴腰背痛可能提示肾盂肾炎，需要及时评估。",
      ),
    },
    {
      question: tr(
        "余った抗菌薬を次に使ってもいいですか？",
        "Can I reuse leftover antibiotics?",
        "剩余的抗生素下次能用吗？",
      ),
      answer: tr(
        "自己判断で使わないでください。症状が改善しても処方された期間を守り、繰り返す場合は背景の原因を確認します。",
        "Do not self-medicate. Complete prescribed courses and investigate recurrent symptoms.",
        "请勿自行使用。即使好转也应完成疗程，反复发作需查明原因。",
      ),
    },
  ],
  prostate: [
    {
      question: tr(
        "PSAが高いとがん確定ですか？",
        "Does a high PSA mean cancer?",
        "PSA高就是癌症吗？",
      ),
      answer: tr(
        "PSAは前立腺がんを調べる手がかりですが、数値だけでがんが確定する検査ではありません。肥大症・炎症・がんは別の病気で、症状だけで区別できません。",
        "PSA informs prostate evaluation but cannot diagnose cancer alone. Enlargement, inflammation and cancer are distinct and cannot be separated by symptoms.",
        "PSA是评估线索但单独不能确诊。增生、炎症与癌症是不同疾病，不能只靠症状区分。",
      ),
    },
    {
      question: tr(
        "尿が全く出ない場合はどうしますか？",
        "What if no urine comes out at all?",
        "完全排不出尿怎么办？",
      ),
      answer: tr(
        "尿意があるのに全く尿が出ず下腹部が張る場合は尿閉の可能性があり、早急な受診が必要です。",
        "A full, painful bladder with inability to urinate needs urgent assessment.",
        "有尿意但完全排不出且下腹胀痛可能是尿潴留，需紧急就医。",
      ),
    },
  ],
  "overactive-bladder": [
    {
      question: tr(
        "尿漏れはみんな同じ治療ですか？",
        "Is all leakage treated the same way?",
        "所有漏尿治疗方法都一样吗？",
      ),
      answer: tr(
        "急に我慢しづらい尿意が起こるタイプと、咳や運動で漏れるタイプなどがあり、場面や頻度を確認してから原因に合う方法を検討します。",
        "No. Urgency leakage differs from leakage with coughing or exercise; the circumstances and frequency guide treatment.",
        "不一样。强烈尿意漏尿与咳嗽运动漏尿类型不同，需确认场景与频率后选择适合的方法。",
      ),
    },
    {
      question: tr(
        "水分を減らせば改善しますか？",
        "Should I restrict fluids?",
        "少喝水能改善吗？",
      ),
      answer: tr(
        "極端に減らして対処しないでください。排尿日誌を記録し、持病や服薬も含めて相談します。",
        "Do not drastically restrict fluids. Keep a voiding diary and discuss health conditions and medicines.",
        "不要极端限水。记录排尿日记，并告知疾病与用药情况。",
      ),
    },
  ],
  stones: [
    {
      question: tr(
        "痛くない血尿は大丈夫ですか？",
        "Is painless blood in urine safe to ignore?",
        "无痛血尿可以不管吗？",
      ),
      answer: tr(
        "血尿は感染や腫瘍などでも生じるため、痛みがないから問題ないとは判断できません。目で分かる血尿が一度でもあれば受診を検討してください。",
        "Blood can have other causes, including infection or tumours, even without pain. Visible blood merits assessment even if it stops.",
        "血尿也可由感染或肿瘤引起，无痛也不能忽视。可见血尿即使消失也应评估。",
      ),
    },
    {
      question: tr(
        "どんな場合に急いで受診しますか？",
        "When is it urgent?",
        "什么情况需紧急就医？",
      ),
      answer: tr(
        "強い痛みに発熱を伴う、嘔吐が続く、尿が出ない場合は早急に相談してください。",
        "Pain with fever, persistent vomiting or inability to urinate needs prompt care.",
        "疼痛伴发热、持续呕吐或无尿时需及时就医。",
      ),
    },
  ],
  sti: [
    {
      question: tr(
        "症状がなくても検査できますか？",
        "Can I be tested without symptoms?",
        "没有症状也能检查吗？",
      ),
      answer: tr(
        "無症状の感染もあるため、症状が軽いことだけでは否定できません。心配な接触の時期と症状を伺い、感染症に応じた検査を相談します。",
        "Yes. Some infections cause few or no symptoms; timing and any symptoms guide which urine or blood tests are appropriate.",
        "可以。部分感染症状轻微或无症状，需根据接触时间与症状选择相应检查。",
      ),
    },
    {
      question: tr(
        "治療後、いつから性行為できますか？",
        "When can sexual activity resume?",
        "治疗后多久能恢复性生活？",
      ),
      answer: tr(
        "公式では治療開始後7日間は性行為を控え、2週間後の再検査が案内されています。パートナーの検査・治療が必要かも相談してください。",
        "The official guidance advises avoiding sexual activity for seven days after starting treatment and retesting after two weeks; also ask whether partners need testing.",
        "官方建议治疗开始后7天内避免性行为、2周后复查，并咨询伴侣是否需检查治疗。",
      ),
    },
  ],
  "mens-health": [
    {
      question: tr(
        "ED治療薬を自分で入手してもいいですか？",
        "Can I buy ED medication myself?",
        "可以自行购买ED药物吗？",
      ),
      answer: tr(
        "ED治療薬には併用できない薬があります。個人輸入などで自己治療を始めず、服用中の薬をすべて伝えてください。",
        "Some medicines cannot be combined with ED drugs. Avoid self-medication and disclose everything you take, including heart medicines.",
        "部分药物不可与ED药联用，不应自行用药，并须告知全部在用药物包括心脏用药。",
      ),
    },
    {
      question: tr(
        "疲労感や意欲低下だけでも相談できますか？",
        "Can I consult about fatigue or low motivation alone?",
        "只有疲劳或意愿下降也能咨询吗？",
      ),
      answer: tr(
        "はい。性機能や体調の変化には血管・ホルモン・生活習慣・心理的要因などが関わります。加齢や男性ホルモンだけが原因とは限りません。",
        "Yes. Vascular, hormonal, lifestyle and psychological factors can contribute; age or testosterone alone may not explain symptoms.",
        "可以。血管、激素、生活习惯和心理因素均可能有关，不能只归因于年龄或激素。",
      ),
    },
  ],
};
