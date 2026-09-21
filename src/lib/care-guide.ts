import type { Locale } from "./content";
import type { FieldSlug } from "./fields";

export type LocalText = Record<Locale, string>;
export const tr = (ja: string, en: string, zh: string): LocalText => ({
  ja,
  en,
  zh,
});
export const careCheckedAt = "2026-09-22";
export type CareTopic = {
  id: string;
  title: LocalText;
  concern: LocalText;
  description: LocalText;
  method: LocalText;
  course: LocalText;
  caution: LocalText;
  source: string;
};
const clinic = "https://www.norris-beauty-clinic.com";

export const careTopics: Record<FieldSlug, CareTopic[]> = {
  rejuvenation: [
    {
      id: "skin-analysis",
      title: tr(
        "肌診断 re-Beau 2",
        "Skin analysis: re-Beau 2",
        "re-Beau 2肌肤检测",
      ),
      concern: tr(
        "まず自分の肌を知りたい",
        "Understand your skin first",
        "先了解自己的皮肤",
      ),
      description: tr(
        "カラー・UV・赤みの画像を使い、肉眼で捉えにくい色素や赤みを確認します。診断を補助し、希望する変化と現在の肌状態を一緒に整理するための検査です。",
        "Colour, UV and redness images reveal features that are hard to see unaided. Imaging supports assessment and discussion of your goals.",
        "通过彩色、UV与红斑图像观察肉眼难见的色素和泛红，辅助评估并沟通目标。",
      ),
      method: tr(
        "相談 → 洗顔 → 撮影 → 結果の説明。公式案内の撮影時間は約10〜15分です。メイクを落とした肌で撮影します。",
        "Consultation, cleansing, imaging and explanation. The clinic lists around 10–15 minutes for imaging without makeup.",
        "咨询、洁面、拍摄和结果说明。官方拍摄约10～15分钟，需卸妆。",
      ),
      course: tr(
        "画像を見ながら、日常のケアや施術の選択肢を検討します。必要に応じて前後の画像を比較し、経過を確認します。",
        "Review skincare and treatment options using the images, with later comparisons when appropriate.",
        "结合图像讨论护理及治疗选择，必要时比较前后图像。",
      ),
      caution: tr(
        "撮影だけですべての皮膚疾患を診断できるわけではありません。画像の見た目だけで治療を決めず、問診・診察と合わせて判断します。",
        "Imaging alone cannot diagnose every skin condition. Decisions also require history and examination.",
        "图像无法单独诊断所有皮肤病，应结合问诊和检查判断。",
      ),
      source: `${clinic}/beautiful_skin/`,
    },
    {
      id: "botox",
      title: tr("ボトックス注射", "Botulinum toxin injections", "肉毒素注射"),
      concern: tr(
        "表情じわ・エラ・汗の悩み",
        "Expression lines, jaw muscles & sweating",
        "表情纹、咬肌与出汗",
      ),
      description: tr(
        "筋肉の動きや発汗に関わる神経の伝達に作用する薬剤を用います。ヒアルロン酸のように体積を補う治療とは異なり、部位と筋肉の働きを見て量を決めます。",
        "The medicine acts on nerve signalling involved in muscle movement or sweating. It does not add volume like a filler.",
        "药物作用于肌肉运动或出汗相关的神经传递，不同于填充剂增加体积。",
      ),
      method: tr(
        "表情・筋肉の動き、既往歴を確認して注射します。公式では施術約2週間後に状態確認の来院を案内しています。",
        "Assess movement and medical history before injection. The clinic describes review at approximately two weeks.",
        "评估表情、肌肉和病史后注射，官方介绍约两周后复诊确认。",
      ),
      course: tr(
        "公式では数日後から変化が現れ、数か月持続すると案内しています。反応には個人差があるため、追加注射の要否・時期は診察で決めます。",
        "The clinic describes onset over several days and effects lasting months. Response and repeat dosing require assessment.",
        "官方介绍数日后开始变化并持续数月，追加必要性和时机需评估。",
      ),
      caution: tr(
        "注射部位の痛み・内出血・アレルギー、眉やまぶたの下垂などが起こり得ます。妊娠・授乳、神経筋疾患、過去の副作用を申告し、製品名と承認・適応の範囲を確認します。",
        "Risks include pain, bruising, allergy and brow or eyelid droop. Disclose pregnancy, breastfeeding, neuromuscular disease and prior reactions; confirm product and indication.",
        "可能疼痛、淤青、过敏或眉眼睑下垂。需告知孕哺、神经肌肉疾病及既往反应，确认产品和适用范围。",
      ),
      source: `${clinic}/botox/`,
    },
    {
      id: "thread-lift",
      title: tr("糸リフト", "Thread lift", "线雕提升"),
      concern: tr(
        "頬・あごのたるみを相談",
        "Cheek and jawline laxity",
        "面颊与下颏松弛",
      ),
      description: tr(
        "皮下に糸を挿入して組織を支える方法です。公式では吸収性素材PDOのN-COGを紹介しています。熱を用いるHIFUとは仕組みが異なります。",
        "Threads are inserted beneath the skin for support. The clinic describes absorbable PDO N-COG threads, a different approach from HIFU heating.",
        "皮下置入线材支撑组织，官方介绍可吸收PDO材质N-COG，与HIFU热作用不同。",
      ),
      method: tr(
        "診察・デザイン → 麻酔 → 糸の挿入 → 状態確認。必要な本数はたるみの程度と希望に応じて決め、総費用を事前に確認します。",
        "Assessment and design, anaesthesia, insertion and review. Agree on thread count and total fees beforehand.",
        "评估设计、麻醉、置线及检查，事前确认根数与总费用。",
      ),
      course: tr(
        "公式の回復目安は数日〜1週間ですが、ひきつれや凹凸がより長く残る場合があります。大きく口を開ける動作や運動などの制限を確認します。",
        "The clinic lists several days to a week for recovery; pulling sensations or unevenness can last longer. Confirm movement and exercise restrictions.",
        "官方恢复参考为数日至一周，牵拉感或凹凸可能更久，需确认张口与运动限制。",
      ),
      caution: tr(
        "痛み・腫れ・内出血・ひきつれ・凹凸などが起こり得ます。違和感が続く、赤みや痛みが強まる場合はクリニックへ相談します。",
        "Pain, swelling, bruising, pulling and unevenness can occur. Contact the clinic for persistent or worsening symptoms.",
        "可能疼痛、肿胀、淤青、牵拉或凹凸，症状持续加重需联系诊所。",
      ),
      source: `${clinic}/liftup/`,
    },
    {
      id: "photofacial",
      title: tr("フォトフェイシャル M22", "IPL photofacial M22", "M22光子嫩肤"),
      concern: tr(
        "しみ・そばかす・赤み",
        "Pigmentation, freckles & redness",
        "色斑、雀斑与泛红",
      ),
      description: tr(
        "複数の波長を含む光（IPL）を照射する治療です。色むらや赤みなど、肌の状態に応じてフィルターや出力を選びます。局所を狙うレーザーとは照射の特性が異なります。",
        "IPL delivers a range of light wavelengths. Filters and settings are chosen for pigmentation and redness; it differs from a targeted laser.",
        "IPL使用包含多种波长的光，依据色斑、泛红和肤质选择滤光片与能量，与局部激光的作用方式不同。",
      ),
      method: tr(
        "診察 → 洗顔 → ジェル塗布 → 照射 → 冷却・肌状態の確認。公式案内の施術時間は約30〜40分です。",
        "Assessment, cleansing, gel, light treatment and cooling. The clinic lists approximately 30–40 minutes.",
        "问诊、洁面、涂凝胶、照射和冷却。官方介绍的治疗时间约为30～40分钟。",
      ),
      course: tr(
        "公式案内は約1か月間隔で4〜5回を目安としています。反応した色素が一時的に濃く見え、薄いかさぶたになる場合があります。回数は診察で調整します。",
        "The clinic suggests roughly monthly sessions, often 4–5. Pigmented areas may temporarily darken or crust; the plan is individualized.",
        "官方以约每月一次、4～5次为参考。色素处可能暂时变深或结痂，具体次数须根据诊察调整。",
      ),
      caution: tr(
        "赤み・熱感などが出ることがあります。日焼け直後は施術を避け、施術前後の紫外線対策と保湿を行います。肝斑が疑われる部位は照射の適否を診断します。",
        "Redness and heat can occur. Recent tanning and possible melasma need assessment. Follow sun-protection and moisturizing instructions.",
        "可能出现泛红或热感。晒伤后或疑似黄褐斑区域需先评估，并遵循防晒和保湿指导。",
      ),
      source: `${clinic}/photofacial/`,
    },
    {
      id: "picolaser",
      title: tr("ピコレーザー PicoWay", "PicoWay laser", "PicoWay皮秒激光"),
      concern: tr(
        "しみ・くすみ・ニキビ跡",
        "Spots, uneven tone & acne scars",
        "色斑、肤色不均与痘疤",
      ),
      description: tr(
        "非常に短い時間幅のレーザーを用いる機器です。色素を局所的に狙う照射と、肌質を目的とした照射では設定や経過が異なります。『ピコレーザー』という名前だけで施術内容は決まりません。",
        "Very short laser pulses are used with different settings for pigment and skin texture. The device name alone does not define the treatment.",
        "以极短脉冲进行激光治疗。局部色素与肤质治疗的设置不同，不能只凭设备名称判断治疗内容。",
      ),
      method: tr(
        "しみの種類、色、範囲を診察し、スポット照射などの方法を選びます。肝斑や炎症後の色素沈着を含む場合は、刺激による悪化の可能性も考慮します。",
        "Assess the type, colour and area of pigmentation before selecting a mode. Melasma or inflammatory pigmentation requires particular care.",
        "先评估色斑类型、颜色和范围，再选择模式。黄褐斑或炎症后色素沉着需特别谨慎。",
      ),
      course: tr(
        "スポット照射ではかさぶたが生じることがあります。広い範囲の治療や肌質への照射は複数回になることがあり、照射方式ごとの経過を確認します。",
        "Spot treatment may crust. Wider-area or texture treatment may need repeated sessions; recovery depends on the mode.",
        "局部照射可能结痂；大范围或肤质治疗可能需要多次，恢复情况取决于照射方式。",
      ),
      caution: tr(
        "赤み・腫れ・色素沈着などが起こり得ます。こすらず、かさぶたを無理にはがさず、日焼けを避けます。保護やメイクの再開時期は部位ごとの指示に従います。",
        "Redness, swelling and pigmentation changes may occur. Avoid rubbing, picking crusts and sun exposure; follow site-specific aftercare.",
        "可能出现红肿或色素变化。避免摩擦、剥痂和日晒，护理及化妆时间遵从医嘱。",
      ),
      source: `${clinic}/picolaser/`,
    },
    {
      id: "hifu",
      title: tr(
        "HIFU／ウルトラセルQ+",
        "HIFU / ULTRAcel Q+",
        "HIFU／ULTRAcel Q+",
      ),
      concern: tr(
        "たるみ・フェイスライン",
        "Laxity & facial contour",
        "松弛与面部轮廓",
      ),
      description: tr(
        "超音波を集中させて熱を加え、皮下組織の引き締めを目指す方法です。肌の厚みや脂肪の量、たるみの部位を評価し、照射する深さや範囲を判断します。",
        "Focused ultrasound heats selected tissue to address laxity. Skin thickness, fat and anatomy guide treatment depth and area.",
        "通过聚焦超声加热特定组织以改善松弛。需根据皮肤厚度、脂肪与部位判断深度及范围。",
      ),
      method: tr(
        "診察で範囲を決め、ジェルを塗布して照射します。公式案内の所要時間は約30〜60分。痛みや熱感に応じて出力などを調整します。",
        "Assessment is followed by gel and ultrasound delivery, listed as around 30–60 minutes. Settings account for discomfort and heat.",
        "评估范围、涂凝胶后照射，官方时间约30～60分钟。根据疼痛与热感调整设置。",
      ),
      course: tr(
        "変化の現れ方には個人差があります。公式では約3か月ごとの施術を案内していますが、再照射の時期は肌の状態と前回の反応を診て決めます。",
        "Results vary. The clinic describes approximately three-month intervals, but repeat treatment requires assessment of the previous response.",
        "效果因人而异。官方介绍约三个月间隔，但再次治疗需先评估上次反应和皮肤状况。",
      ),
      caution: tr(
        "痛み・赤み・熱感などに加え、熱を使う治療としてやけどや神経への影響にも注意が必要です。公式ページでは当該機器の国内薬事未承認を明示しています。",
        "Pain, redness and heat may occur; burns or nerve effects also require discussion. The clinic identifies the device as unapproved under Japanese pharmaceutical/device law.",
        "除疼痛、泛红和热感外，也需了解灼伤或神经影响。官方注明该设备未获日本药事批准。",
      ),
      source: `${clinic}/hifu/`,
    },
    {
      id: "dermapen",
      title: tr("ダーマペン4", "Dermapen 4", "Dermapen 4微针"),
      concern: tr(
        "毛穴・ニキビ跡・肌の凹凸",
        "Pores, acne scars & texture",
        "毛孔、痘疤与凹凸",
      ),
      description: tr(
        "微細な針で皮膚に小さな穴を作り、修復過程を利用して肌質の改善を目指します。針の深さや併用する薬剤によって刺激と回復に必要な時間が変わります。",
        "Microneedling creates small channels to stimulate a repair response. Needle depth and added products affect recovery.",
        "微针形成细小通道，利用修复过程改善肤质。针深与配合产品会影响刺激程度和恢复时间。",
      ),
      method: tr(
        "診察・洗顔後、麻酔クリームなどで準備して施術します。炎症の強いニキビや肝斑の有無を確認し、治療部位を決めます。",
        "After assessment and cleansing, topical anaesthesia may be used. Active inflammation and melasma are checked before selecting areas.",
        "问诊、洁面及表面麻醉后施术，先确认明显炎症或黄褐斑并决定治疗区域。",
      ),
      course: tr(
        "公式案内では約3〜4週間の間隔が目安です。深いニキビ跡では複数回の計画が必要になる場合があります。赤み・皮むけ・ヒリつきは約1週間続くことがあります。",
        "The clinic describes 3–4-week intervals. Deeper scars may require several sessions; redness, peeling or stinging may last around a week.",
        "官方参考间隔约3～4周，较深痘疤可能需要多次。泛红、脱皮或刺痛可能持续约一周。",
      ),
      caution: tr(
        "内出血・腫れ・色素沈着などのリスクがあります。肝斑部分は悪化のおそれから施術対象外と案内されています。メイクやスキンケアの再開時期を施術時に確認します。",
        "Bruising, swelling and pigmentation changes are possible. The clinic excludes melasma areas. Confirm when to restart makeup and skincare.",
        "可能出现淤青、肿胀或色素变化。官方不对黄褐斑区域施术，化妆和护理恢复时间需确认。",
      ),
      source: `${clinic}/dermapen/`,
    },
    {
      id: "hyaluronic",
      title: tr("ヒアルロン酸注射", "Hyaluronic acid fillers", "玻尿酸填充"),
      concern: tr(
        "しわ・くぼみ・輪郭",
        "Folds, volume loss & contour",
        "皱褶、凹陷与轮廓",
      ),
      description: tr(
        "ジェル状の製剤を注入し、くぼみや輪郭などを調整する治療です。筋肉の動きを抑えるボトックスとは作用が異なります。製剤の種類・量と注入部位を確認します。",
        "A gel is injected to adjust folds, volume or contour. Its action differs from botulinum toxin; confirm the product, amount and site.",
        "注入凝胶状制剂以调整凹陷或轮廓，与抑制肌肉活动的肉毒素作用不同。需确认产品、剂量与部位。",
      ),
      method: tr(
        "希望する仕上がりを共有し、左右差や表情も含めて診察します。注入量を決め、施術後に腫れと仕上がりを確認します。",
        "Discuss the intended result, assess symmetry and facial movement, agree on volume and review swelling after injection.",
        "沟通目标，评估左右差异和表情，确定注入量，并在施术后检查肿胀及形态。",
      ),
      course: tr(
        "直後の見た目には腫れも影響します。持続期間は製剤や部位で変わり、永久的な治療ではありません。追加注入は落ち着いた状態を診て判断します。",
        "Early appearance can include swelling. Duration varies by product and site; further injections should follow reassessment.",
        "即刻外观会受肿胀影响。维持时间因产品和部位而异，并非永久；追加需复评。",
      ),
      caution: tr(
        "内出血・腫れ・しこり・感染のほか、まれに血管閉塞による皮膚壊死や視力障害などが起こり得ます。強い痛み、皮膚色や見え方の異常は直ちに医療機関へ連絡します。",
        "Bruising, lumps and infection are possible. Rare vascular occlusion may cause necrosis or vision loss. Seek immediate care for unusual pain, skin colour or vision changes.",
        "可能出现淤青、结节或感染。罕见血管堵塞可致皮肤坏死或视力损害。异常剧痛、肤色或视力改变须立即就医。",
      ),
      source: `${clinic}/hyaluronic/`,
    },
    {
      id: "vital",
      title: tr("水光注射", "Skin-booster injections", "水光注射"),
      concern: tr(
        "乾燥・小じわ・ハリ不足",
        "Dryness, fine lines & hydration",
        "干燥、细纹与弹性",
      ),
      description: tr(
        "皮膚の浅い層に細かく薬剤を注入する方法です。公式では非架橋ヒアルロン酸を含むサイトケア532などを案内しています。薬剤によって目的やリスクが変わります。",
        "Small injections deliver a selected product to superficial skin layers. The clinic lists Cytocare 532 among its options; ingredients matter.",
        "将选定制剂细密注入皮肤浅层。官方介绍包括Cytocare 532等，不同成分的目的和风险不同。",
      ),
      method: tr(
        "肌の状態と薬剤を確認し、洗顔・麻酔などの準備後に機器で注入します。公式案内の施術時間は約20分ですが、診察や麻酔の時間は別途必要です。",
        "Choose the product after assessment, then cleanse, prepare anaesthesia and inject. Approximately 20 minutes excludes consultation and preparation.",
        "评估并选择药剂，洁面和麻醉后注入。官方约20分钟的施术时间不包含问诊与准备。",
      ),
      course: tr(
        "公式案内の回復目安は約3日〜1週間。内出血は約2週間かかる場合があります。大切な予定の直前は避け、通院間隔は薬剤と経過に合わせて相談します。",
        "The clinic lists roughly 3–7 days of recovery; bruising may take two weeks. Allow time before important events.",
        "官方恢复参考为3～7天，淤青可能需两周。重要活动前应预留时间，复诊间隔需个别商定。",
      ),
      caution: tr(
        "赤み・腫れ・発疹・内出血、まれに感染や色素沈着が生じます。メイクは公式案内では翌日以降。採用薬剤の成分、承認状況、アレルギーを確認します。",
        "Redness, swelling, rash, bruising, infection or pigmentation may occur. Confirm ingredients, approval status and allergies; makeup is generally from the following day in the clinic guide.",
        "可能红肿、皮疹、淤青、感染或色素沉着。需确认成分、批准情况及过敏史；官方一般建议翌日起化妆。",
      ),
      source: `${clinic}/vital/`,
    },
    {
      id: "epilation",
      title: tr("医療脱毛", "Medical laser hair removal", "医疗激光脱毛"),
      concern: tr(
        "体毛・ヒゲ・自己処理の負担",
        "Unwanted hair & shaving",
        "体毛、胡须与剃毛负担",
      ),
      description: tr(
        "ライトシェアデュエットというダイオードレーザー機器を使用します。広い範囲と細かな部位でハンドピースを使い分け、肌色・毛質に合わせて設定します。",
        "LightSheer DUET is a diode laser with handpieces for wider and smaller areas. Skin tone and hair characteristics guide settings.",
        "使用LightSheer DUET半导体激光，不同手具对应大面积和细小部位，设置依据肤色与毛质。",
      ),
      method: tr(
        "部位・肌状態を診察して照射します。公式案内では事前の剃毛が必要です。広範囲の剃毛は別料金になる場合があり、全身を1回で施術する運用ではありません。",
        "Assessment precedes treatment. The clinic requests shaving beforehand; extensive shaving may cost extra, and whole-body treatment is not completed in one visit.",
        "先检查后照射。官方要求提前剃毛，大面积代剃可能另收费，全身并非一次完成。",
      ),
      course: tr(
        "部位により約10〜40分の案内です。毛の生え替わりを考慮して複数回通院します。希望部位・毛量・経過によって回数や間隔を決めます。",
        "Listed treatment times vary around 10–40 minutes by area. Multiple visits are planned around hair growth and response.",
        "不同部位约10～40分钟。需结合毛发生长与反应安排多次，次数和间隔个別决定。",
      ),
      caution: tr(
        "赤み・熱感・乾燥・毛嚢炎・色素沈着などの可能性があります。施術当日の入浴・激しい運動・過度な飲酒を避け、保湿と紫外線対策を行います。",
        "Redness, heat, dryness, folliculitis and pigmentation changes can occur. Follow moisturizing, sun-protection and same-day activity restrictions.",
        "可能出现泛红、热感、干燥、毛囊炎或色素变化。遵循保湿、防晒及当天活动限制。",
      ),
      source: `${clinic}/epilation/`,
    },
    {
      id: "harg",
      title: tr(
        "HARG療法・薄毛の相談",
        "HARG & hair-loss assessment",
        "HARG与脱发咨询",
      ),
      concern: tr(
        "抜け毛・分け目・毛量",
        "Thinning hair & shedding",
        "脱发、发缝与发量",
      ),
      description: tr(
        "HARGは成長因子などを含む製剤を頭皮へ注入する方法です。植毛や自分の幹細胞を培養する治療とは異なります。薄毛の原因を診察し、内服・外用などの選択肢も相談します。",
        "HARG injects a growth-factor preparation into the scalp. It differs from transplantation or cultured autologous cells; first assess the cause of hair loss.",
        "HARG将含生长因子的制剂注入头皮，与植发或本人干细胞培养不同。应先诊断脱发原因并比较其他选择。",
      ),
      method: tr(
        "頭皮と脱毛の状態を診察し、麻酔などの準備後に注入します。性別だけで決めず、進行の程度、既往歴、使用中の育毛薬を確認します。",
        "Assess the scalp, progression, history and current hair treatments before preparation and injection.",
        "先评估头皮、脱发进程、病史和现用药物，再准备并注射。",
      ),
      course: tr(
        "公式は約3〜4週間ごとに6回、約5〜6か月の通院を案内しています。発毛は直後に判断できず、反応や維持治療の必要性には個人差があります。",
        "The clinic describes six sessions at 3–4-week intervals over about 5–6 months. Response and maintenance needs vary.",
        "官方参考为每3～4周一次、共六次，约5～6个月。反应和维持治疗需求因人而异。",
      ),
      caution: tr(
        "注入時の痛み、発赤・かゆみ・発疹などが起こり得ます。製剤の成分・承認状況と、通院全体の費用を確認してから計画を立てます。",
        "Pain, redness, itching or rash may occur. Confirm product ingredients, approval status and the cost of the full course.",
        "可能出现疼痛、发红、瘙痒或皮疹。需确认制剂成分、批准情况及整个疗程费用。",
      ),
      source: `${clinic}/harg/`,
    },
  ],
  regenerate: [
    {
      id: "stem-cell",
      title: tr(
        "自家脂肪由来の幹細胞治療",
        "Autologous adipose-derived cells",
        "自体脂肪来源干细胞",
      ),
      concern: tr(
        "皮膚の変化・慢性疼痛の相談",
        "Skin changes & chronic pain consultation",
        "皮肤变化与慢性疼痛咨询",
      ),
      description: tr(
        "本人の脂肪組織から得た細胞を培養して投与する方法です。公式では皮膚への局所注射と慢性疼痛に対する点滴を案内しています。病名や症状ごとの適応を確認し、他の疾患への効果を一律に期待しないことが大切です。",
        "Cells from the patient's fat are cultured for administration. The clinic describes skin injections and chronic-pain infusions; eligibility and evidence are indication-specific.",
        "从本人脂肪获取细胞并培养后投与。官方介绍皮肤局部注射及慢性疼痛点滴，适应性与证据须按具体目的确认。",
      ),
      method: tr(
        "相談・採血 → 脂肪採取 → 分離・培養 → 品質確認 → 投与 → 定期診察。公式では培養に約1か月を要するとしています。採取当日に全工程が終わる治療ではありません。",
        "Consultation and tests, fat collection, culture, quality checks, administration and follow-up. The clinic lists about one month for culture.",
        "咨询检查、脂肪采集、培养、质量确认、投与及复诊。官方介绍培养约需一个月，并非采集当天完成全部治疗。",
      ),
      course: tr(
        "投与後は症状と経過を確認します。効果の有無、持続、追加投与の必要性を事前に保証することはできません。採取からフォローまで通える計画が必要です。",
        "Follow-up assesses response and adverse effects. Benefit, duration and repeat treatment cannot be guaranteed; plan for the complete course.",
        "复诊评估反应与不良反应。效果、持续时间或追加治疗无法保证，应安排从采集到随访的完整日程。",
      ),
      caution: tr(
        "採取・注射部位の痛みや出血・感染、発熱などを確認します。自己由来でも無リスクではありません。培養施設・品質管理・投与方法・緊急時対応を説明書で確認してください。",
        "Discuss collection/injection pain, bleeding, infection and fever. Autologous does not mean risk-free; confirm processing controls and emergency arrangements.",
        "需了解采集或注射的疼痛、出血、感染和发热。自体来源并非无风险，须确认培养管理与紧急处置。",
      ),
      source: `${clinic}/stem_cell/`,
    },
    {
      id: "prp",
      title: tr(
        "PRP（多血小板血漿）療法",
        "Platelet-rich plasma (PRP)",
        "PRP富血小板血浆",
      ),
      concern: tr(
        "目元・口元の小じわ、肌質",
        "Fine lines & skin quality",
        "眼口周细纹与肤质",
      ),
      description: tr(
        "本人の血液を採取し、血小板を多く含む血漿を分離して注入します。細胞を培養する幹細胞治療とは異なる工程です。注入量や製剤の調製方法によって内容が変わります。",
        "Blood is drawn and processed to separate platelet-rich plasma for injection. This does not involve culturing stem cells; preparation and volume matter.",
        "采集本人血液，分离富含血小板的血浆后注入，不涉及干细胞培养。制备方式和注入量影响治疗内容。",
      ),
      method: tr(
        "適応確認 → 採血 → 遠心分離 → 麻酔・注入 → 経過確認。公式では水光注射での投与も案内されています。",
        "Assessment, blood collection, centrifugation, anaesthesia/injection and review. The clinic also describes skin-booster delivery.",
        "确认适应性、采血、离心、麻醉注入及观察；官方也介绍水光注射方式。",
      ),
      course: tr(
        "直後の腫れと治療による変化を分けて見ます。公式では徐々に変化をみる治療として案内されていますが、改善の程度や持続には個人差があります。",
        "Distinguish immediate swelling from a treatment response. Changes may be gradual, with individual variation in benefit and duration.",
        "需区分即刻肿胀与治疗反应。变化可能逐渐出现，程度和维持时间因人而异。",
      ),
      caution: tr(
        "内出血・赤み・腫れ・色素沈着などがあり得ます。抗凝固薬、出血しやすい病気、妊娠、がんや免疫の病気などは必ず申告し、自己判断で服薬を中止しないでください。",
        "Bruising, redness, swelling and pigmentation are possible. Disclose anticoagulants, bleeding disorders, pregnancy, cancer and immune conditions; do not stop medicines yourself.",
        "可能淤青、红肿或色素变化。须告知抗凝药、出血疾病、妊娠、癌症及免疫疾病，不可自行停药。",
      ),
      source: `${clinic}/prp/`,
    },
    {
      id: "exosome",
      title: tr(
        "培養上清液・エクソソーム",
        "Culture supernatant & exosomes",
        "培养上清液与外泌体",
      ),
      concern: tr(
        "製剤と根拠を理解して相談",
        "Understand the product and evidence",
        "先了解制剂与证据",
      ),
      description: tr(
        "培養上清液は細胞を培養した液に含まれる成分、エクソソームは細胞が放出する小胞を指します。両者は同じ意味ではなく、生きた幹細胞の投与とも異なります。",
        "Supernatant contains substances released during cell culture; exosomes are small cell-released vesicles. These are not synonyms or living stem-cell treatment.",
        "上清液含细胞培养时释放的成分，外泌体是细胞释放的小囊泡。两者并非同义，也不同于活干细胞投与。",
      ),
      method: tr(
        "クリニックは点滴と水光注射を案内しています。原料の由来、製造・品質検査、使用量、投与経路を確認します。注射用製剤の詳細は診察時の説明が必要です。",
        "The clinic lists infusions and skin-booster injections. Confirm source, manufacturing, quality tests, dose and route for the actual preparation.",
        "诊所介绍点滴与水光注射。应确认实际制剂的来源、制造、质量检验、用量和途径。",
      ),
      course: tr(
        "回数や間隔は製剤と目的で異なります。全身の若返り、疾病の治癒・予防などを保証する治療として捉えず、代替治療と費用も含めて検討します。",
        "Schedules depend on the product and purpose. Do not interpret it as guaranteed rejuvenation, cure or prevention; discuss alternatives and costs.",
        "次数和间隔取决于制剂与目的，不应视为保证全身年轻化、治愈或预防疾病的方法，需比较替代方案与费用。",
      ),
      caution: tr(
        "痛み・腫れ・内出血・アレルギーや感染などのリスクを確認します。厚労省の2024年7月通知は、薬事承認された医薬品がない旨と安全性への留意を示しています。未確立な点を理解した説明・同意が必要です。",
        "Discuss pain, swelling, bruising, allergy and infection. A July 2024 MHLW notice reported no approved medicines of this kind and highlighted safety concerns and uncertainty.",
        "需了解疼痛、红肿、淤青、过敏和感染。日本厚劳省2024年7月通知指出当时无此类获批药品，并强调安全性及不确定性。",
      ),
      source: `${clinic}/exosome/`,
    },
  ],
  urology: [
    {
      id: "infection",
      title: tr(
        "膀胱炎・腎盂腎炎",
        "Cystitis & kidney infection",
        "膀胱炎与肾盂肾炎",
      ),
      concern: tr(
        "排尿痛・頻尿・発熱",
        "Painful urination, frequency & fever",
        "尿痛、尿频与发热",
      ),
      description: tr(
        "尿路に細菌が入り炎症を起こす病気です。膀胱の感染と腎臓まで及んだ感染では重症度が異なります。高熱や腰背部痛を伴う場合は早めの評価が必要です。",
        "Infection may involve the bladder or kidneys. Fever and flank/back pain can indicate a more serious infection needing prompt assessment.",
        "感染可涉及膀胱或肾脏，发热及腰背痛可能提示较严重感染，需要及时评估。",
      ),
      method: tr(
        "症状・発熱・既往歴を確認し、尿検査や必要に応じて尿培養、血液検査で評価します。検査結果と状態に応じて抗菌薬などを検討します。",
        "Symptoms, urine testing/culture and sometimes blood tests guide treatment, including antibiotics when indicated.",
        "结合症状、尿检或培养及必要血检判断，并在适用时使用抗菌药。",
      ),
      course: tr(
        "薬の種類や期間は診断によります。症状が改善しても自己判断で中断せず、繰り返す場合は背景にある原因も確認します。",
        "Medicine and duration depend on diagnosis. Follow the prescribed course and reassess recurrent symptoms.",
        "药物和疗程依诊断决定，应遵从处方，反复症状需进一步检查。",
      ),
      caution: tr(
        "発熱・悪寒、強い腰痛、嘔吐で水分をとれない状態では通常予約を待たず医療機関へ。残った抗菌薬を自己判断で使わないでください。",
        "Do not wait for a routine appointment with fever, chills, severe back pain or inability to drink. Do not reuse leftover antibiotics.",
        "发热寒战、剧烈腰痛或呕吐无法饮水时，不要等普通预约，也不要自行服用剩余抗生素。",
      ),
      source: `${clinic}/urology/`,
    },
    {
      id: "prostate",
      title: tr(
        "前立腺肥大症・前立腺の検査",
        "Enlarged prostate & assessment",
        "前列腺增生与检查",
      ),
      concern: tr(
        "尿が出にくい・残尿感・夜間頻尿",
        "Weak stream, residual sensation & nocturia",
        "排尿困难、残尿感与夜尿",
      ),
      description: tr(
        "前立腺の変化は尿の通り道に影響することがあります。肥大症・炎症・がんは同じ病気ではなく、症状だけで区別できません。",
        "Prostate changes may affect urine flow. Enlargement, inflammation and cancer are distinct and cannot be separated by symptoms alone.",
        "前列腺变化可能影响尿流，增生、炎症和癌症并非同一疾病，不能只靠症状区分。",
      ),
      method: tr(
        "尿検査、超音波、必要に応じたPSAなどで評価します。PSAは前立腺がんを調べる手がかりですが、数値だけでがんが確定する検査ではありません。",
        "Urine tests, ultrasound and PSA when appropriate inform assessment. PSA alone does not diagnose cancer.",
        "通过尿检、超声及必要的PSA评估，PSA数值本身不能确诊癌症。",
      ),
      course: tr(
        "症状と検査結果に応じて薬物療法などを選びます。精密検査や手術が必要な場合は、対応できる医療機関への紹介を検討します。",
        "Treatment may include medication. Further investigations or surgery may require referral.",
        "根据结果选择药物等治疗，需要精密检查或手术时考虑转诊。",
      ),
      caution: tr(
        "尿意があるのに全く尿が出ず下腹部が張る場合は、尿閉の可能性があり早急な受診が必要です。",
        "A full, painful bladder with inability to urinate needs urgent medical assessment.",
        "有尿意但完全排不出且下腹胀痛时，需紧急就医评估。",
      ),
      source: `${clinic}/urology/`,
    },
    {
      id: "overactive-bladder",
      title: tr(
        "過活動膀胱・尿失禁",
        "Overactive bladder & leakage",
        "膀胱过度活动与尿失禁",
      ),
      concern: tr(
        "急な尿意・尿漏れ・トイレが近い",
        "Urgency, leakage & frequent visits",
        "尿急、漏尿与频繁如厕",
      ),
      description: tr(
        "急に我慢しづらい尿意が起こるタイプと、咳や運動で漏れるタイプなどがあります。尿漏れをひとくくりにせず、場面や頻度を確認します。",
        "Urgency leakage differs from leakage during coughing or exercise. The circumstances and frequency help identify the type.",
        "强烈尿意伴漏尿与咳嗽运动时漏尿不同，需要确认场景和频率。",
      ),
      method: tr(
        "問診や尿検査で感染などを確認します。排尿時刻・量・漏れた場面を記録した排尿日誌が相談の助けになります。",
        "History and urine testing help exclude infection. A diary of timing, volume and leakage can help.",
        "问诊及尿检帮助排除感染，记录时间、尿量和漏尿情境的日记有助就诊。",
      ),
      course: tr(
        "生活・排尿習慣の調整、骨盤底筋の訓練、薬物療法などから原因に合う方法を検討します。改善と副作用をみながら継続方法を調整します。",
        "Options include habit changes, pelvic-floor training or medication, chosen by diagnosis and reviewed over time.",
        "依据原因选择生活排尿习惯调整、盆底训练或药物，并持续评估。",
      ),
      caution: tr(
        "水分を極端に減らして対処せず、持病や服薬も含めて相談します。血尿や排尿痛がある場合は、その原因の確認が先です。",
        "Avoid drastic fluid restriction; discuss health conditions and medicines. Blood or pain needs investigation.",
        "不要极端限水，应告知疾病和用药。血尿或疼痛需先查明原因。",
      ),
      source: `${clinic}/urology/`,
    },
    {
      id: "stones",
      title: tr(
        "尿路結石・血尿",
        "Urinary stones & blood in urine",
        "尿路结石与血尿",
      ),
      concern: tr(
        "脇腹の痛み・血尿・検診の尿潜血",
        "Flank pain & visible or detected blood",
        "腰腹痛、血尿或尿潜血",
      ),
      description: tr(
        "結石が尿の流れを妨げると強い痛みが出る場合があります。一方、血尿は感染や腫瘍などでも生じるため、痛みがないから問題ないとは判断できません。",
        "Stones may obstruct urine flow and cause severe pain. Blood can also have other causes, including infection or tumours, even without pain.",
        "结石可能阻碍尿流引起剧痛，血尿也可由感染或肿瘤等引起，无痛也不能忽视。",
      ),
      method: tr(
        "尿検査・超音波などで評価し、必要に応じてCTや膀胱鏡などの精密検査を検討します。院内で行う検査と紹介先で行う検査は診察時に確認します。",
        "Urine tests and ultrasound may be followed by CT or cystoscopy when indicated; some tests require referral.",
        "尿检、超声后按需要考虑CT或膀胱镜，部分检查可能需转诊。",
      ),
      course: tr(
        "結石の大きさ・場所や感染の有無により、経過観察・薬物治療・処置などを判断します。尿潜血を指摘された場合は検診結果を持参します。",
        "Stone size, location and infection determine observation, medicine or intervention. Bring screening results if blood was detected.",
        "根据结石大小、位置及感染情况决定观察、用药或处置。尿潜血异常请携带体检结果。",
      ),
      caution: tr(
        "強い痛みに発熱を伴う、嘔吐が続く、尿が出ない場合は急いで相談してください。目で分かる血尿が一度でもあれば、消えても受診を検討します。",
        "Pain with fever, persistent vomiting or inability to urinate needs prompt care. Visible blood merits assessment even if it stops.",
        "疼痛伴发热、持续呕吐或无尿需及时就医，可见血尿即使消失也应评估。",
      ),
      source: `${clinic}/urology/`,
    },
    {
      id: "sti",
      title: tr(
        "性感染症の相談",
        "Sexually transmitted infections",
        "性传播感染咨询",
      ),
      concern: tr(
        "尿道の痛み・分泌物・感染の心配",
        "Discharge, discomfort or exposure concerns",
        "尿道痛、分泌物或感染担忧",
      ),
      description: tr(
        "公式ではクラミジア、淋菌、梅毒などを紹介しています。無症状の感染もあるため、症状が軽いことだけでは否定できません。",
        "The clinic discusses chlamydia, gonorrhoea and syphilis. Some infections cause few or no symptoms.",
        "官方介绍衣原体、淋病和梅毒等，部分感染可能无症状或症状轻微。",
      ),
      method: tr(
        "心配な接触の時期と症状を伺い、感染症に応じた尿・血液などの検査を相談します。検査時期によって再検査が必要になる場合があります。",
        "Timing and symptoms guide urine or blood testing. A repeat test may be needed depending on the interval from exposure.",
        "根据接触时间及症状选择尿液或血液检查，检测时间不同可能需复检。",
      ),
      course: tr(
        "原因に合う治療を受け、必要に応じて治療後の確認を行います。パートナーの検査や治療が必要かも医師に相談します。",
        "Use cause-specific treatment and follow-up. Ask whether partners need testing or treatment.",
        "按病原接受治疗和复查，并咨询伴侣是否需检查或治疗。",
      ),
      caution: tr(
        "症状が消えたことを治癒の判断にせず、再開してよい性行為の時期も確認します。検査内容・保険適用・費用は受診時に確認してください。",
        "Symptom resolution alone does not prove cure. Confirm sexual-contact advice, test coverage and costs.",
        "症状消失不代表治愈，需确认性生活恢复时间、检查范围及保险费用。",
      ),
      source: `${clinic}/urology/`,
    },
    {
      id: "mens-health",
      title: tr(
        "ED・男性更年期の相談",
        "Erectile function & hormonal concerns",
        "勃起功能与男性更年期",
      ),
      concern: tr(
        "男性機能・疲労感・意欲の低下",
        "Sexual function, fatigue & motivation",
        "性功能、疲劳与意愿下降",
      ),
      description: tr(
        "性機能や体調の変化には、血管・ホルモン・生活習慣・心理的要因などが関わります。加齢や男性ホルモンだけが原因とは限りません。",
        "Vascular, hormonal, lifestyle and psychological factors can contribute. Age or testosterone alone may not explain symptoms.",
        "血管、激素、生活习惯和心理因素均可能有关，不能只归因于年龄或男性激素。",
      ),
      method: tr(
        "症状、持病、内服薬を確認し、必要に応じて血液検査などで評価します。心臓病などで服用する薬も含め、薬剤名を伝えてください。",
        "Review symptoms, conditions and medicines, with blood tests when appropriate. Include heart medicines in the history.",
        "了解症状、疾病和用药，必要时血检，心脏用药也必须告知。",
      ),
      course: tr(
        "検査結果に応じて生活面の対応や治療を検討します。薬剤やホルモン治療の適否は診察で判断し、経過や副作用を確認します。",
        "Findings guide lifestyle measures or treatment. Medication or hormone therapy requires individual assessment and monitoring.",
        "根据检查选择生活调整或治疗，药物与激素治疗需个别判断并监测。",
      ),
      caution: tr(
        "ED治療薬には併用できない薬があります。個人輸入などで自己治療を始めず、費用と保険適用の有無も診察時に確認します。",
        "Some medicines cannot be combined with ED drugs. Avoid self-medication and confirm costs and coverage.",
        "部分药物不可与ED药联用，不应自行用药，费用与保险适用性需确认。",
      ),
      source: `${clinic}/urology/`,
    },
  ],
};
