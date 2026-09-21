import { tr, type LocalText } from "./care-guide";
import type { FieldSlug } from "./fields";

export const careUi = {
  home: tr("ホーム", "Home", "首页"),
  contents: tr("このページの案内", "On this page", "本页导航"),
  explore: tr(
    "気になることから探す",
    "Start with your concern",
    "从您的困扰出发",
  ),
  exploreBody: tr(
    "気になる項目を選ぶと、特徴・進め方・注意点へ移動します。治療の適応は診察で判断します。",
    "Choose a topic to explore the approach, course and considerations. Suitability is assessed in consultation.",
    "选择主题可查看特点、流程及注意事项，是否适用需经诊察。",
  ),
  overview: tr("診療の考え方", "Approach to care", "诊疗理念"),
  compare: tr("違いを知る", "Understand the differences", "了解区别"),
  treatments: tr("治療を詳しく", "Treatment guide", "治疗详解"),
  conditions: tr(
    "症状・疾患を詳しく",
    "Symptoms & conditions",
    "症状与疾病详解",
  ),
  tests: tr("検査と治療の進め方", "Tests & next steps", "检查与后续治疗"),
  method: tr("どのように進める？", "How it works", "如何进行？"),
  course: tr("通院・経過の目安", "Visits & recovery", "就诊与恢复参考"),
  caution: tr("リスク・注意点", "Risks & considerations", "风险与注意事项"),
  source: tr(
    "公式の詳しい説明（日本語）",
    "Full clinic guide (Japanese)",
    "诊所详细说明（日语）",
  ),
  back: tr("項目一覧へ戻る", "Back to topics", "返回主题列表"),
  process: tr(
    "相談からフォローまで",
    "From consultation to follow-up",
    "从咨询到随访",
  ),
  costs: tr("費用の目安", "Fees at a glance", "费用参考"),
  costNote: tr(
    "以下は公式サイト掲載の代表的な料金（税込・日本円）です。総額や全メニューの価格帯ではありません。自由診療は公的医療保険の対象外です。適用条件、必要回数、診察・麻酔・検査・薬剤などの追加費用は見積もりで確認してください。",
    "Selected published fees, in Japanese yen including tax—not a complete price range or total quote. Elective self-pay care is not covered by Japanese public insurance. Confirm eligibility, session count and consultation, anaesthesia, test and medicine charges.",
    "下列为官网部分项目的含税日元费用，并非全部价格范围或总报价。自费诊疗不属日本公共医疗保险范围；请确认适用条件、次数及问诊、麻醉、检查和药品等附加费。",
  ),
  feeLink: tr(
    "公式の全料金・適用条件を確認",
    "All clinic fees & conditions (Japanese)",
    "查看官方全部费用与条件（日语）",
  ),
  item: tr("項目・条件", "Item & conditions", "项目与条件"),
  price: tr("税込料金", "Fee, tax included", "含税费用"),
  faq: tr("よくあるご質問", "Common questions", "常见问题"),
  prepare: tr("相談の前に準備すること", "Before your visit", "就诊前准备"),
  references: tr(
    "詳しい案内・参考資料",
    "Further reading & sources",
    "详细介绍与参考资料",
  ),
  checked: tr(
    "公式情報の確認日",
    "Clinic information checked",
    "官网信息核对日期",
  ),
  booking: tr("クリニックへ相談する", "Contact the clinic", "联系诊所"),
  bookingNote: tr(
    "診療のご相談はノリス美容クリニックへ。お問い合わせフォームは日本語です。",
    "Medical inquiries go to Norris Beauty Clinic. The contact form is in Japanese.",
    "诊疗咨询请联系Norris美容诊所，咨询表为日语。",
  ),
  related: tr(
    "ほかの診療を見る",
    "Explore other areas of care",
    "了解其他诊疗领域",
  ),
};

export const feeRows: Record<
  FieldSlug,
  { label: LocalText; amount: string; source: string }[]
> = {
  rejuvenation: [
    {
      label: tr("M22／通常価格", "M22 / standard price", "M22／通常价格"),
      amount: "¥25,300",
      source: "fee",
    },
    {
      label: tr(
        "HIFU／全顔・あご下含む／通常価格",
        "HIFU / face including under-chin / standard",
        "HIFU／全脸含下颏／通常价格",
      ),
      amount: "¥84,700",
      source: "fee",
    },
    {
      label: tr(
        "ダーマペン／麻酔付／通常価格",
        "Dermapen / anaesthesia included / standard",
        "微针／含麻醉／通常价格",
      ),
      amount: "¥27,500",
      source: "fee",
    },
    {
      label: tr(
        "ピコトーニング／顔・首・手の甲のいずれか／通常価格",
        "Pico toning / face, neck OR hands / standard",
        "皮秒嫩肤／脸、颈或手背任选／通常价格",
      ),
      amount: "¥19,800",
      source: "fee",
    },
    {
      label: tr(
        "ピコスポット／5mm・1個",
        "Pico spot / one 5 mm spot",
        "皮秒祛斑／5mm一处",
      ),
      amount: "¥5,500",
      source: "fee",
    },
    {
      label: tr(
        "水光注射／サイトケア532／通常価格",
        "Skin booster / Cytocare 532 / standard",
        "水光／Cytocare 532／通常价格",
      ),
      amount: "¥38,000",
      source: "fee",
    },
    {
      label: tr(
        "ヒアルロン酸／0.1cc・部位により変動",
        "Hyaluronic acid / 0.1 cc, varies by site",
        "玻尿酸／0.1cc，依部位不同",
      ),
      amount: "¥5,500",
      source: "fee",
    },
    {
      label: tr(
        "医療脱毛／女性・両ワキ／1回目〜",
        "Hair removal / women, both underarms / initial rate",
        "脱毛／女性双腋／初始单次价格",
      ),
      amount: "¥2,200",
      source: "fee",
    },
    {
      label: tr("HARG療法／掲載料金", "HARG / published fee", "HARG／官网价格"),
      amount: "¥88,000",
      source: "fee",
    },
  ],
  regenerate: [
    {
      label: tr(
        "幹細胞治療／相談・初診料",
        "Stem-cell care / initial consultation",
        "干细胞／咨询初诊",
      ),
      amount: "¥11,000",
      source: "stem_cell",
    },
    {
      label: tr(
        "幹細胞／皮膚への局所注射・2,500万個",
        "Stem cells / local skin injection, 25 million cells",
        "干细胞／皮肤局部注射2,500万个",
      ),
      amount: "¥1,331,000",
      source: "stem_cell",
    },
    {
      label: tr(
        "幹細胞／慢性疼痛・点滴1億個",
        "Stem cells / chronic pain infusion, 100 million cells",
        "干细胞／慢性疼痛点滴1亿个",
      ),
      amount: "¥1,881,000",
      source: "stem_cell",
    },
    {
      label: tr(
        "PRP／1cc／通常価格",
        "PRP / 1 cc / standard",
        "PRP／1cc／通常价格",
      ),
      amount: "¥33,000",
      source: "fee",
    },
    {
      label: tr(
        "PRP／3cc／通常価格",
        "PRP / 3 cc / standard",
        "PRP／3cc／通常价格",
      ),
      amount: "¥55,000",
      source: "fee",
    },
    {
      label: tr(
        "培養上清液・エクソソーム／点滴",
        "Culture supernatant / exosome infusion",
        "培养上清液／外泌体点滴",
      ),
      amount: "¥66,000",
      source: "fee",
    },
    {
      label: tr(
        "エクソソーム水光注射／通常価格",
        "Exosome skin-booster injection / standard",
        "外泌体水光／通常价格",
      ),
      amount: "¥88,000",
      source: "fee",
    },
  ],
  urology: [],
};

export const costExtra: Record<FieldSlug, LocalText> = {
  rejuvenation: tr(
    "初回・再来期限付き価格や追加薬剤の設定もあります。たとえば注入治療は使用量で、脱毛は部位・回数で総額が変わります。掲載額だけで施術一式の金額を判断しないでください。",
    "First-visit offers, return deadlines and add-on products may apply. Injection volume and hair-removal area/session count change the total.",
    "有初次、期限内复诊或附加制剂价格。注射用量及脱毛部位次数会改变总费用。",
  ),
  regenerate: tr(
    "幹細胞の投与料金には、公式案内上、検査・脂肪採取・培養などの費用が含まれます。再投与や日本の公的健康保険証を持たない方は料金が異なり、通訳は事前予約・別料金です。培養上清液・エクソソームの有効性や安全性には未確立の点があります。",
    "The published stem-cell administration fees include tests, fat collection and culture. Repeat treatment and patients without Japanese public health insurance have different prices. Interpreting requires advance booking and an extra fee. Supernatant/exosome efficacy and safety remain uncertain.",
    "官方干细胞投与价格包含检查、脂肪采集与培养。再次治疗或无日本公共医保者价格不同；口译须预约且另收费。上清液与外泌体的有效性安全性仍有未确立之处。",
  ),
  urology: tr(
    "泌尿器科は症状・検査・治療内容と保険資格により自己負担額が変わります。保険診療の適用可否、EDなどの自由診療、検査のみ希望する場合の費用は予約時に確認してください。保険資格を確認できるもの、お薬手帳、検診結果をご用意ください。",
    "Costs depend on symptoms, tests, treatment and insurance eligibility. Confirm coverage, self-pay services such as ED care, and testing-only charges. Bring insurance eligibility documents, medication records and screening results.",
    "费用依症状、检查、治疗和保险资格不同。请确认医保、自费ED等项目及单独检查费用，携带保险资格资料、用药记录和体检结果。",
  ),
};

type QA = { question: LocalText; answer: LocalText };
export const careFaq: Record<FieldSlug, QA[]> = {
  rejuvenation: [
    {
      question: tr(
        "しみはどれも同じ治療でよいですか？",
        "Can all pigment spots be treated the same way?",
        "所有色斑都能用同一种治疗吗？",
      ),
      answer: tr(
        "しみ、肝斑、炎症後色素沈着などでは治療選択が異なります。まず診断し、照射が適するかを確認します。気になる箇所と経過を伝え、肌診断の必要性も相談できます。",
        "No. Melasma, sun spots and inflammatory pigmentation differ. Diagnosis comes before deciding whether light or laser is suitable.",
        "不能。黄褐斑、日光斑或炎症后色素不同，需先诊断再决定是否适合光或激光。",
      ),
    },
    {
      question: tr(
        "ダウンタイムは何日みておけばよいですか？",
        "How much recovery time should I allow?",
        "应预留多少恢复时间？",
      ),
      answer: tr(
        "施術・出力・注入量・肌質で異なります。水光注射やダーマペンでは数日〜1週間程度の赤みなど、注射ではより長い内出血が起きる場合もあります。仕事や行事の予定を診察時に共有してください。",
        "It depends on treatment, intensity and your skin. Redness can last days; bruising may last longer. Share important work or social dates at consultation.",
        "取决于项目、强度和肤质，泛红可能数日，淤青更久。咨询时应告知工作或重要活动日程。",
      ),
    },
    {
      question: tr(
        "どの治療を選ぶか、決めてから予約すべきですか？",
        "Do I need to choose a treatment before booking?",
        "预约前必须确定治疗项目吗？",
      ),
      answer: tr(
        "決まっていなくても、悩み・予算・許容できる回復期間を伝えることで選択肢を相談できます。併用施術は刺激や回復期間も増えることがあるため、優先順位を整理して計画します。",
        "You can discuss concerns, budget and recovery time first. Combined procedures may add irritation or downtime, so agree on priorities.",
        "可以先说明困扰、预算和可接受的恢复期。组合治疗可能增加刺激或恢复时间，需先确定优先顺序。",
      ),
    },
  ],
  regenerate: [
    {
      question: tr(
        "幹細胞・PRP・エクソソームは同じですか？",
        "Are stem cells, PRP and exosomes the same?",
        "干细胞、PRP与外泌体相同吗？",
      ),
      answer: tr(
        "異なります。幹細胞は細胞を培養して投与、PRPは本人の血液を分離して投与、培養上清液は細胞培養時に得られる成分を用います。採取の有無、製造、費用、根拠を個別に確認します。",
        "No. Cultured cells, processed blood plasma and culture-derived substances involve different materials, preparation, evidence and costs.",
        "不同。培养细胞、处理血浆和培养来源成分，材料、制备、证据及费用均不同。",
      ),
    },
    {
      question: tr(
        "提供計画があると、効果は保証されますか？",
        "Does a treatment plan guarantee effectiveness?",
        "有提供计划就能保证有效吗？",
      ),
      answer: tr(
        "提供計画や委員会審査の手続きと、薬事承認や個々の患者さんへの効果の保証は別です。対象とする症状、計画の範囲、効果の根拠、他の治療との比較を確認します。",
        "Plan submission and committee review are distinct from drug approval or a guarantee of benefit. Ask about the specific indication, evidence and alternatives.",
        "计划提交和委员会审查不同于药事批准或效果保证，应确认具体适应范围、证据和替代治疗。",
      ),
    },
    {
      question: tr(
        "海外からの受診はどのように計画しますか？",
        "How should an overseas visit be planned?",
        "海外来诊应如何安排？",
      ),
      answer: tr(
        "特に幹細胞治療は採取・培養・投与・経過確認が必要です。滞在日数、来院回数、帰国後の連絡先、通訳、保険資格による料金差を渡航前に確認してください。",
        "For cultured-cell treatment, plan collection, culture, administration and follow-up. Confirm visits, interpreting, prices and support after returning home before travel.",
        "细胞培养治疗需安排采集、培养、投与及复诊。出行前确认来院次数、口译、费用和回国后联系。",
      ),
    },
  ],
  urology: [
    {
      question: tr(
        "女性でも泌尿器科を受診できますか？",
        "Can women consult a urologist?",
        "女性也可以看泌尿科吗？",
      ),
      answer: tr(
        "はい。膀胱炎、頻尿、尿漏れなどは女性にも多い相談です。妊娠・出産歴や婦人科治療、服薬も診察に役立つ情報です。",
        "Yes. Cystitis, frequency and leakage affect women too. Pregnancy, childbirth, gynaecological care and medicines are relevant history.",
        "可以。膀胱炎、尿频和漏尿也是女性常见问题，孕产史、妇科诊疗及用药都是重要信息。",
      ),
    },
    {
      question: tr(
        "痛くない血尿も受診したほうがよいですか？",
        "Should painless blood in urine be assessed?",
        "无痛血尿也需要就诊吗？",
      ),
      answer: tr(
        "痛みの有無だけでは原因を判断できません。目に見える血尿や検診での尿潜血は、消えていても医療機関に相談してください。検診結果や尿の色の変化が分かる記録が役立ちます。",
        "Yes. Pain does not determine the cause. Discuss visible blood or screening findings even if they resolve, and bring records.",
        "需要，疼痛与否不能判断原因。即使消失也应咨询可见血尿或尿潜血，并携带记录。",
      ),
    },
    {
      question: tr(
        "受診前にどんな情報を記録するとよいですか？",
        "What should I record before the visit?",
        "就诊前可以记录哪些信息？",
      ),
      answer: tr(
        "症状の始まり、1日の排尿回数、夜間に起きる回数、痛み・発熱・尿の色、使用中の薬をまとめます。採尿が必要になる場合があるため、来院前の排尿については予約時に確認すると安心です。",
        "Record onset, daytime/nighttime frequency, pain, fever, urine colour and medicines. Ask about urine-sample preparation when booking.",
        "记录起病时间、日夜次数、疼痛、发热、尿色及用药，预约时咨询采尿准备。",
      ),
    },
  ],
};

export const preparation = [
  tr(
    "気になり始めた時期・変化・これまでの治療を整理する",
    "Note onset, changes and previous treatments",
    "整理开始时间、变化与既往治疗",
  ),
  tr(
    "お薬手帳、サプリメント、アレルギー、持病を伝える",
    "Bring medicine/supplement details, allergies and medical history",
    "告知药物、补充剂、过敏及疾病",
  ),
  tr(
    "妊娠・授乳、他院での施術や検査も伝える",
    "Mention pregnancy, breastfeeding, procedures and tests elsewhere",
    "告知孕哺情况及他院治疗检查",
  ),
  tr(
    "目的・予算・通える回数・予定を共有する",
    "Share goals, budget, visits and schedule",
    "说明目标、预算、来院次数与日程",
  ),
];

export const examination = [
  {
    title: tr("尿検査", "Urine tests", "尿检"),
    body: tr(
      "血液の混入や感染の手がかりを確認。必要に応じて培養などを追加します。",
      "Check for blood and signs of infection; culture may be added.",
      "确认血尿及感染线索，必要时增加培养。",
    ),
  },
  {
    title: tr("血液検査・PSA", "Blood tests & PSA", "血检与PSA"),
    body: tr(
      "腎機能、炎症などを評価。PSAは前立腺の評価に用いますが単独でがんの確定はできません。",
      "Assess kidney function and inflammation. PSA informs prostate evaluation, not a diagnosis by itself.",
      "评估肾功能、炎症；PSA用于前列腺评估，不能单独确诊癌症。",
    ),
  },
  {
    title: tr("超音波検査", "Ultrasound", "超声"),
    body: tr(
      "腎臓・膀胱・前立腺の形や状態を画像で確認します。",
      "Images help assess the kidneys, bladder and prostate.",
      "通过图像评估肾脏、膀胱与前列腺。",
    ),
  },
  {
    title: tr(
      "精密検査・医療連携",
      "Further tests & referral",
      "精密检查与转诊",
    ),
    body: tr(
      "CT、膀胱鏡、手術などが必要な場合は実施施設を確認し、紹介を含めて調整します。",
      "If CT, cystoscopy or surgery is needed, confirm the provider and arrange referral as appropriate.",
      "如需CT、膀胱镜或手术，确认实施机构并安排转诊。",
    ),
  },
];

export const urgent = tr(
  "高熱を伴う腰背部痛、尿が全く出ない、強い痛みや嘔吐がある場合は、通常予約を待たず医療機関へ連絡してください。",
  "With high fever and back pain, inability to urinate, severe pain or vomiting, contact medical services without waiting for a routine appointment.",
  "高热伴腰背痛、完全无法排尿、剧痛或呕吐时，不要等普通预约，请及时联系医疗机构。",
);

export const furtherReading = [
  {
    field: "rejuvenation",
    label: tr(
      "消費者庁：HIFUの事故調査・リスクに関する報告",
      "Consumer Affairs Agency: HIFU safety report (Japanese)",
      "日本消费者厅：HIFU安全调查报告（日语）",
    ),
    url: "https://www.caa.go.jp/notice/entry/032715/",
  },
  {
    field: "rejuvenation",
    label: tr(
      "肌診断 re-Beau 2",
      "Skin imaging: re-Beau 2",
      "re-Beau 2肌肤检测",
    ),
    url: "https://www.norris-beauty-clinic.com/beautiful_skin/",
  },
  {
    field: "rejuvenation",
    label: tr(
      "ボトックス・その他のメニューと費用",
      "Botulinum toxin, other options & fees",
      "肉毒素、其他项目与费用",
    ),
    url: "https://www.norris-beauty-clinic.com/fee/",
  },
  {
    field: "rejuvenation",
    label: tr("糸リフトの診療案内", "Thread-lift guide", "线雕介绍"),
    url: "https://www.norris-beauty-clinic.com/liftup/",
  },
  {
    field: "rejuvenation",
    label: tr(
      "FDA：注入材のリスク（英語）",
      "FDA: dermal filler risks",
      "FDA：填充剂风险（英语）",
    ),
    url: "https://www.fda.gov/medical-devices/aesthetic-cosmetic-devices/dermal-fillers-soft-tissue-fillers",
  },
  {
    field: "regenerate",
    label: tr(
      "厚生労働省：培養上清液・エクソソームに関する通知（PDF）",
      "MHLW: supernatant/exosome notice (Japanese PDF)",
      "日本厚劳省：上清液与外泌体通知（日语PDF）",
    ),
    url: "https://www.mhlw.go.jp/content/10800000/001282062.pdf",
  },
  {
    field: "regenerate",
    label: tr(
      "厚生労働省：再生医療の制度と通知",
      "MHLW: regenerative medicine framework (Japanese)",
      "日本厚劳省：再生医疗制度（日语）",
    ),
    url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000150542_00016.html",
  },
  {
    field: "urology",
    label: tr(
      "日本泌尿器科学会：症状から調べる",
      "Japanese Urological Association: symptoms (Japanese)",
      "日本泌尿学会：按症状了解（日语）",
    ),
    url: "https://www.urol.or.jp/public/symptom/",
  },
  {
    field: "urology",
    label: tr(
      "日本泌尿器科学会：尿がまったく出ない",
      "Japanese Urological Association: urinary retention (Japanese)",
      "日本泌尿学会：无法排尿（日语）",
    ),
    url: "https://www.urol.or.jp/public/symptom/06.html",
  },
];
