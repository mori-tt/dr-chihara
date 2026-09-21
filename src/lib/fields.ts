import type { Locale } from "./content";
import { basePath, clinicUrl } from "./content";

export type FieldSlug = "rejuvenation" | "regenerate" | "urology";
export type FieldSection = { heading: string; body: string; items?: string[] };
export type FieldCopy = {
  title: string;
  eyebrow: string;
  lead: string;
  sections: FieldSection[];
  process: string[];
  note: string;
  official: string;
  officialUrl: string;
};

export const fieldSlugs: FieldSlug[] = [
  "rejuvenation",
  "regenerate",
  "urology",
];
export const fieldPath = (locale: Locale, slug: FieldSlug) =>
  `${basePath}/${locale === "ja" ? "" : `${locale}/`}fields/${slug}/`;

export const fieldCopy: Record<Locale, Record<FieldSlug, FieldCopy>> = {
  ja: {
    rejuvenation: {
      title: "美容医療",
      eyebrow: "AESTHETIC MEDICINE",
      lead: "変化を急がず、その人らしい表情と毎日に寄り添う医療。",
      sections: [
        {
          heading: "美容医療とは",
          body: "肌の状態、年齢に伴う変化、輪郭や表情のお悩みなどを、診察とカウンセリングで整理し、治療の選択肢を一緒に考える領域です。見た目だけでなく、日々の過ごしやすさや気持ちも大切にします。",
        },
        {
          heading: "相談の多いテーマ",
          body: "ノリス美容クリニックでは、次のような悩みを診療の入口として案内しています。症状や肌質によって適した方法は異なります。",
          items: [
            "しみ・そばかす・くすみ",
            "しわ・たるみ・目元の変化",
            "ニキビ跡・毛穴・肌質",
            "脱毛・薄毛・男性美容",
          ],
        },
        {
          heading: "選択肢を知り、納得して決める",
          body: "ヒアルロン酸、ボトックス、光治療、HIFU、糸による治療、美容点滴など、目的に応じた選択肢があります。施術名から選ぶのではなく、希望・適応・リスク・費用・通院回数を確認して決めます。",
        },
        {
          heading: "光治療・HIFUの例",
          body: "公式サイトでは、IPLを用いるフォトフェイシャルM22や、超音波を用いるHIFU（ハイフ）を案内しています。しみ・そばかす・赤み・毛穴、たるみなど、対象となる悩みと機器の特性を確認し、肌の状態に合わせて照射方法を検討します。赤み、熱感、色素変化などのリスクや、紫外線対策・保湿などのアフターケアも事前に確認します。",
          items: [
            "フォトフェイシャルM22：IPLの波長を肌の状態に合わせて選ぶ光治療",
            "HIFU：超音波の熱エネルギーを用いた、切開を伴わないたるみ治療",
            "施術の可否・回数・間隔は診察と肌の状態によって決まります",
          ],
        },
        {
          heading: "注入・肌質治療を検討するとき",
          body: "PRPやヒアルロン酸、ボトックス、水光注射、ダーマペンなどは、使用する薬剤・注入部位・目的が異なります。腫れ、赤み、内出血、痛み、感染などの可能性、妊娠・授乳、服薬や既往歴への影響を医師に伝え、施術後の予定も含めて相談します。",
        },
        {
          heading: "公式サイトで紹介されている診療メニュー",
          body: "ノリス美容クリニックでは、再生医療だけでなく、肌診断から機器治療、注入治療、脱毛、薄毛治療まで幅広く案内しています。目的や肌の状態に合わせて、単一の施術に決めつけず組み合わせを検討します。",
          items: [
            "肌診断：re-Beau 2で肉眼では見えにくいシミ・赤みなどを確認",
            "光・レーザー：M22、PicoWayなどを悩みに合わせて使い分ける治療",
            "引き締め：ウルトラセルQ+（HIFU）など、切開を伴わない選択肢",
            "肌質・注入：ダーマペン、水光注射、PRP、ヒアルロン酸、ボトックス",
            "毛髪・体毛：HARG療法、医療脱毛（ライトシェアデュエット）",
          ],
        },
        {
          heading: "肌悩みから考える治療の組み立て",
          body: "しみ・そばかす・肝斑・赤み・ニキビ跡・毛穴・しわ・たるみは、似て見えても原因や適した機器が異なります。公式サイトでは、まず肌状態を確認し、必要な施術とホームケアを組み合わせる考え方を紹介しています。診断名が分からない場合も、気になる変化を写真や時期とともに伝えると相談しやすくなります。",
          items: [
            "色・くすみ：肝斑や炎症後色素沈着などを見分けて照射の可否を検討",
            "赤み・ニキビ：炎症の程度や再発要因を確認し、刺激を抑えた計画を立てる",
            "しわ・たるみ：表情、皮膚、脂肪、筋膜など原因を分けて考える",
            "毛穴・肌質：ダーマペンや光治療などの適応とダウンタイムを確認",
          ],
        },
        {
          heading: "機器治療の特徴と経過",
          body: "M22は複数のIPL波長から肌状態に合う設定を選ぶ光治療、HIFUは超音波の熱エネルギーを利用して引き締めを目指す治療です。PicoWayは短いパルスのレーザー、re-Beau 2は肌状態を画像化する診断機器として紹介されています。照射直後の赤みや熱感、色素変化などの可能性を含め、施術間隔・紫外線対策・保湿を確認します。",
          items: [
            "フォトフェイシャルM22：顔全体で約40分という案内がありますが、内容により異なります",
            "HIFU：部位によって痛みがあり、出力や照射範囲を調整します",
            "ダーマペン：微細な針を使うため、赤み・腫れ・乾燥などを確認します",
            "施術後の経過や必要回数は、肌質・症状・設定によって変わります",
          ],
        },
        {
          heading: "料金・自由診療・カウンセリング",
          body: "美容医療は施術内容、範囲、薬剤、回数で費用が変わる自由診療が中心です。公式サイトの料金表を確認し、初診料・検査料・麻酔・薬剤・再診・キャンセル条件などを含む総額を事前に確認してください。診察の結果、希望した施術が適さない場合に別の選択肢や見送りを提案することも、納得できる診療の一部です。",
        },
      ],
      process: [
        "悩みや希望を聞く",
        "肌・体調・既往歴を確認する",
        "方法・効果・リスク・費用を説明する",
        "同意した内容で施術し、経過を確認する",
      ],
      note: "ここで紹介するのは一般的な案内です。効果や適応には個人差があり、自由診療を含むため、診察時に詳細をご確認ください。",
      official: "クリニック公式の美容医療案内",
      officialUrl: `${clinicUrl}/rejuvenation/`,
    },
    regenerate: {
      title: "再生医療",
      eyebrow: "REGENERATIVE MEDICINE",
      lead: "期待だけでなく、根拠・限界・リスクを丁寧に確認する再生医療。",
      sections: [
        {
          heading: "再生医療をどう考えるか",
          body: "細胞や血液に含まれる成分など、身体の修復に関わる仕組みを研究・応用する医療分野です。治療法によって目的、エビデンス、承認や届出の枠組み、費用が異なるため、ひとくくりに判断しないことが大切です。",
        },
        {
          heading: "クリニックで案内されている選択肢",
          body: "公式サイトでは、幹細胞治療、PRP（多血小板血漿）、幹細胞培養上清液・エクソソームに関する案内があります。いずれも治療の目的や方法を個別に確認し、期待できることと不確かなことを分けて説明します。",
          items: [
            "幹細胞治療：細胞の採取・培養・投与を含む治療",
            "PRP療法：自身の血液から血小板を含む血漿を分離して用いる方法",
            "培養上清液・エクソソーム：製剤の由来・成分・投与方法を確認する治療",
          ],
        },
        {
          heading: "情報を受け取るときのポイント",
          body: "どの疾患・症状を対象にするのか、研究段階か臨床で確立した方法か、代替治療はあるか、費用と副作用は何かを確認しましょう。『再生』『若返り』という言葉だけで治療効果を判断しないことが重要です。",
        },
        {
          heading: "PRP・培養上清液について",
          body: "PRPは採血した血液から血小板を含む血漿を分離し、注入する方法です。公式サイトでは、目元の細かいしわ、くすみ、乾燥、肌の弾力などを相談テーマとして紹介しています。一方、培養上清液・エクソソームは細胞そのものではなく、製造方法や由来、品質管理、投与方法を確認すべき製剤です。",
          items: [
            "PRP：採血・遠心分離・注入という流れ",
            "エクソソーム／培養上清液：点滴や水光注射など方法が異なる",
            "赤み・腫れ・内出血・痛みなどの副作用と、適さない体調を確認",
          ],
        },
        {
          heading: "再生医療を相談する前に",
          body: "治療の対象、期待できること、まだ分かっていないこと、代替案、費用、通院回数、治療後の連絡先を説明してもらいましょう。公式ページの内容や料金は更新されることがあるため、最新情報はクリニックへ確認してください。",
        },
        {
          heading: "幹細胞治療の一般的な流れ",
          body: "公式サイトでは、医師による相談・検査から、腹部などからの脂肪組織採取、細胞の分離・培養、品質確認後の点滴または注射、経過観察までの流れを案内しています。培養期間や投与方法は計画によって異なるため、治療前に必要な来院回数とスケジュールを確認します。",
          items: [
            "相談・診察：症状、既往歴、服薬、治療目的を確認",
            "検査・採取：血液検査や脂肪組織採取の可否を判断",
            "培養・品質確認：施設や計画に沿って細胞を調整",
            "投与・フォロー：点滴・注射後の経過を確認し、必要に応じて再診",
          ],
        },
        {
          heading: "PRPと培養上清液・エクソソームの違い",
          body: "PRPは本人の血液から血小板を含む血漿を分離して用いる方法です。培養上清液は細胞を培養した液体から得られる成分を製剤化したもの、エクソソームは細胞間の情報伝達に関わる小胞を指します。名称が似ていても由来、製造方法、含有成分、投与方法が異なるため、何をどのように投与するのかを確認する必要があります。",
          items: [
            "本人の血液を使うのか、培養由来の製剤なのか",
            "皮膚への注入、点滴など投与経路は何か",
            "製造・品質管理、保管、感染対策の説明があるか",
            "期待できる範囲と、まだ研究段階の部分がどこか",
          ],
        },
        {
          heading: "安全性・制度・費用を確認する",
          body: "公式サイトでは、再生医療等安全性確保法に基づく提供計画や認定再生医療等委員会による審査について案内しています。治療の種類によって制度上の区分や必要な手続きが異なるため、計画番号、説明・同意文書、検査費用、細胞採取・培養費用、投与後の診療費を含めて確認してください。",
        },
      ],
      process: [
        "目的と現在の状態を整理する",
        "治療の根拠・対象・選択肢を説明する",
        "リスク・費用・通院・同意内容を確認する",
        "同意後に実施し、経過をフォローする",
      ],
      note: "再生医療の効果や安全性は治療法・対象・個人の状態で異なります。このページは一般的な情報であり、治療を勧めるものではありません。",
      official: "クリニック公式の再生医療案内",
      officialUrl: `${clinicUrl}/regenerate/`,
    },
    urology: {
      title: "泌尿器科",
      eyebrow: "UROLOGY",
      lead: "相談しづらい排尿の悩みを、腎臓から尿道までの仕組みから考える。",
      sections: [
        {
          heading: "泌尿器科とは",
          body: "腎臓・尿管・膀胱・尿道などの尿路と、男性の前立腺・精巣などに関わる病気を診る診療科です。頻尿、血尿、排尿時の痛み、尿が出にくいといった症状には、さまざまな原因が隠れていることがあります。",
        },
        {
          heading: "このような変化があれば相談を",
          body: "症状が続く、繰り返す、急に変化した場合は、年齢のせいと決めつけず相談を検討してください。",
          items: [
            "トイレが近い・夜中に何度も起きる",
            "尿が出にくい・残尿感がある",
            "血尿、排尿時の痛み、尿の濁り",
            "尿漏れ、急な尿意、腰や背中の痛み",
            "男性機能や前立腺についての悩み",
          ],
        },
        {
          heading: "検査と治療",
          body: "症状を伺い、尿検査・血液検査・超音波検査などから必要な検査を組み合わせて原因を確認します。原因や重症度に応じて、生活上の助言、薬物療法、専門医療機関への紹介などを検討します。",
        },
        {
          heading: "主な疾患の例",
          body: "公式サイトでは、前立腺肥大症・前立腺がん・前立腺炎、膀胱炎・過活動膀胱・尿路結石、腎盂腎炎などを例に挙げています。症状が似ていても原因は異なるため、尿検査や血液検査、超音波検査などを組み合わせて確認します。",
          items: [
            "前立腺：頻尿、夜間頻尿、尿の出にくさ、残尿感",
            "膀胱・尿路：排尿時痛、尿の濁り、血尿、突然の強い尿意",
            "腎臓・尿管：腰や背中の痛み、発熱、吐き気を伴うことがある症状",
          ],
        },
        {
          heading: "受診を先延ばしにしないために",
          body: "血尿や排尿痛、急な腰痛、発熱などは、単なる年齢変化とは限りません。症状の強さや経過によっては早めの受診が必要です。強い痛み・高熱・嘔吐などがある場合は、通常の予約を待たず、地域の救急相談や医療機関に連絡してください。",
        },
        {
          heading: "泌尿器科で扱う主な疾患",
          body: "公式サイトでは、尿路感染症、尿路結石、前立腺肥大症・前立腺炎・前立腺がん、過活動膀胱、尿失禁、性感染症、男性更年期や性機能の悩みなどを例として紹介しています。女性の膀胱炎や尿漏れ、男性の前立腺症状など、性別や年齢を問わず相談できます。",
          items: [
            "膀胱炎・尿路感染症：排尿時の痛み、頻尿、濁り、発熱など",
            "尿路結石：腰や脇腹の強い痛み、血尿、吐き気など",
            "前立腺の病気：尿の勢い低下、夜間頻尿、残尿感など",
            "過活動膀胱・尿失禁：急な尿意、間に合わない、漏れるなど",
            "性感染症・男性機能：痛み、分泌物、性機能に関する悩みなど",
          ],
        },
        {
          heading: "検査で分かること",
          body: "症状と経過を聞いたうえで、尿検査では血尿や炎症、血液検査では感染や腎機能などを確認します。超音波検査では腎臓・膀胱・前立腺などの状態を確認することがあります。必要に応じて専門医療機関での画像検査や内視鏡検査につなげるなど、原因に応じて検査を組み合わせます。",
        },
        {
          heading: "女性・男性それぞれの相談",
          body: "女性では膀胱炎、尿漏れ、頻尿など、男性では前立腺肥大症、前立腺炎、性機能や男性更年期など、相談内容に応じた問診が重要です。泌尿器の悩みは話しにくいこともありますが、症状の始まった時期、頻度、痛み、服薬をメモしておくと診察が進めやすくなります。",
        },
      ],
      process: [
        "症状・経過・服薬を聞く",
        "必要な検査で原因を確認する",
        "診断と治療の選択肢を説明する",
        "経過を確認し、必要に応じて連携する",
      ],
      note: "血尿、急な強い痛み、発熱を伴う症状などは早めの医療機関への相談が必要な場合があります。緊急性は症状によって異なるため、自己判断せず医療機関にご相談ください。",
      official: "クリニック公式の泌尿器科案内",
      officialUrl: `${clinicUrl}/urology/`,
    },
  },
  en: {
    rejuvenation: {
      title: "Aesthetic medicine",
      eyebrow: "AESTHETIC MEDICINE",
      lead: "Care for the way you look, feel and move through everyday life.",
      sections: [
        {
          heading: "What aesthetic medicine means here",
          body: "Aesthetic care begins by understanding concerns about skin, facial change and appearance. Consultation, medical assessment and your own priorities come before choosing a procedure.",
        },
        {
          heading: "Common themes",
          body: "The clinic’s menu includes options for concerns such as pigmentation, wrinkles, laxity, acne scars, hair removal and men’s aesthetic care. The suitable approach depends on your assessment.",
        },
        {
          heading: "Choose with context",
          body: "Injectables, light-based treatments, HIFU, thread lifts and infusions each have different purposes, limits, risks, costs and follow-up needs. A treatment name is not a substitute for a consultation.",
        },
        {
          heading: "Examples from the clinic menu",
          body: "The official guide describes IPL photofacial M22 for several skin concerns and HIFU for non-incisional laxity care. It also lists injectables, skin treatments, hair removal and infusions. Suitability, session spacing, downtime and aftercare should be discussed for your skin and health history.",
        },
        {
          heading: "A broader menu, chosen by concern",
          body: "The clinic also introduces skin imaging with re-Beau 2, PicoWay laser, Dermapen, PRP, fillers, botulinum toxin, mesotherapy, medical hair removal and HARG hair treatment. The relevant question is not which procedure is popular, but which diagnosis, goal and recovery time fit you.",
          items: [
            "Pigmentation and redness: clarify the diagnosis before light or laser treatment",
            "Laxity and facial contour: compare HIFU, injectables and other approaches",
            "Texture and acne scars: discuss Dermapen, light treatment and skincare",
            "Hair concerns: separate hair removal from medical hair-loss treatment",
          ],
        },
        {
          heading: "What to confirm before and after treatment",
          body: "Ask about the exact device or product, treatment area, expected course, downtime, contraindications, total cost and follow-up. Redness, swelling, bruising, pain, pigmentation changes and infection are possible with some procedures. Bring your medication and medical history, and plan sun protection and skincare after treatment.",
        },
      ],
      process: [
        "Share your concerns and goals",
        "Review your skin, health and history",
        "Discuss options, risks, costs and alternatives",
        "Proceed only with informed consent and follow-up",
      ],
      note: "This is general information, not a treatment recommendation. Suitability, outcomes and risks vary; please confirm details with the clinic.",
      official: "Official clinic guide to aesthetic medicine",
      officialUrl: `${clinicUrl}/rejuvenation/`,
    },
    regenerate: {
      title: "Regenerative medicine",
      eyebrow: "REGENERATIVE MEDICINE",
      lead: "Hope matters. So do evidence, uncertainty and informed consent.",
      sections: [
        {
          heading: "A field with different levels of evidence",
          body: "Regenerative medicine includes approaches involving cells or blood-derived components and the body’s repair processes. Purpose, evidence, regulation, cost and risk vary by treatment; they should not be treated as one category.",
        },
        {
          heading: "Options described by the clinic",
          body: "The official clinic guide discusses stem-cell treatments, PRP and cell-culture supernatant/exosome products. Ask what the product is, what it is intended to treat, and what is known and unknown.",
        },
        {
          heading: "Questions worth asking",
          body: "What condition is being treated? What evidence applies to people like me? What alternatives exist? What are the risks, total costs and follow-up requirements? These questions support a careful decision.",
        },
        {
          heading: "PRP and culture-derived products",
          body: "PRP uses a patient’s blood, which is processed before injection. Culture-derived supernatant or exosome products are different preparations; ask about source, manufacturing, intended use, quality controls, risks and what remains uncertain.",
        },
        {
          heading: "How a stem-cell plan may proceed",
          body: "The clinic describes a sequence of consultation and testing, tissue collection, cell processing and culture, quality checks, administration by infusion or injection, and follow-up. The schedule and eligibility depend on the plan, so confirm the number of visits and the time required for processing before consenting.",
          items: [
            "Review symptoms, history, medicines and the purpose of treatment",
            "Complete the required examination and blood tests",
            "Discuss collection, culture, administration and monitoring",
            "Receive follow-up information and contact instructions",
          ],
        },
        {
          heading: "Regulation, safety and total cost",
          body: "The official guide describes a framework under Japan’s Act on the Safety of Regenerative Medicine and review by a certified committee. Ask for the treatment plan or plan number, consent documents, testing and collection costs, processing fees, administration costs and follow-up. A consultation should also explain what is not yet established.",
        },
      ],
      process: [
        "Clarify the goal and current condition",
        "Review evidence, scope and alternatives",
        "Confirm risks, cost, follow-up and consent",
        "Monitor the course after treatment",
      ],
      note: "This page provides general information and does not recommend treatment. Effects and safety depend on the method and individual circumstances.",
      official: "Official clinic guide to regenerative medicine",
      officialUrl: `${clinicUrl}/regenerate/`,
    },
    urology: {
      title: "Urology",
      eyebrow: "UROLOGY",
      lead: "A straightforward place to discuss urinary symptoms and men’s health.",
      sections: [
        {
          heading: "What urology covers",
          body: "Urology covers the kidneys, ureters, bladder and urethra, as well as the prostate and testes. Frequency, blood in the urine, pain or difficulty urinating can have different causes.",
        },
        {
          heading: "When to consider a consultation",
          body: "Consider asking for medical advice when symptoms persist, recur or change: frequent or nighttime urination, weak stream, residual sensation, blood, pain, leakage, urgency, back pain or concerns about male sexual function.",
        },
        {
          heading: "Assessment and next steps",
          body: "Depending on symptoms, clinicians may combine a history, urine or blood tests and ultrasound. Treatment may involve advice, medication or referral to a specialist service.",
        },
        {
          heading: "Examples of conditions",
          body: "The clinic guide discusses prostate conditions, cystitis, overactive bladder, urinary stones and kidney infection among other concerns. Similar symptoms can have different causes, so testing and follow-up matter.",
        },
        {
          heading: "Symptoms and conditions worth discussing",
          body: "The official urology guide includes urinary infections, stones, prostate disease, overactive bladder, incontinence, sexually transmitted infections and male sexual or hormonal concerns. Women and men can both seek advice for urinary symptoms.",
          items: [
            "Pain, frequency, cloudy urine or fever may point to infection",
            "Severe flank pain, nausea or blood may occur with stones",
            "Weak stream, nighttime urination or residual sensation may relate to the prostate",
            "Urgency and leakage can be assessed as overactive bladder or incontinence",
          ],
        },
        {
          heading: "What an assessment may include",
          body: "A consultation may combine symptom history with urine tests, blood tests and ultrasound. If further imaging, endoscopy or specialist treatment is needed, referral and coordination can be considered. Keeping a record of timing, frequency, pain, fever and medicines makes the consultation more useful.",
        },
      ],
      process: [
        "Discuss symptoms, timing and medicines",
        "Use appropriate tests to explore causes",
        "Explain findings and options",
        "Review progress and coordinate care if needed",
      ],
      note: "Sudden severe pain, fever or blood in the urine may require prompt medical attention. Seek professional advice rather than self-diagnosing.",
      official: "Official clinic guide to urology",
      officialUrl: `${clinicUrl}/urology/`,
    },
  },
  zh: {
    rejuvenation: {
      title: "美容医疗",
      eyebrow: "AESTHETIC MEDICINE",
      lead: "从容面对变化，让医疗贴近每个人的日常与表情。",
      sections: [
        {
          heading: "美容医疗是什么",
          body: "从皮肤状态、年龄变化与外观困扰出发，通过问诊与咨询整理目标，再一起讨论治疗选择。重要的不只是外表，也包括日常生活与心情。",
        },
        {
          heading: "常见的咨询主题",
          body: "诊所介绍的项目涉及色斑、皱纹、松弛、痘印、脱毛及男性美容等。适合的方法因人而异，需要先进行医学评估。",
        },
        {
          heading: "了解选项后再决定",
          body: "注射、光疗、HIFU、线雕与点滴等方法的目的、风险、费用和复诊需求不同。请不要只根据项目名称作决定。",
        },
        {
          heading: "诊所介绍的项目例子",
          body: "官方介绍了针对多种肌肤困扰的IPL光子嫩肤M22，以及非切开式紧致护理HIFU，也列出注射、肌肤护理、脱毛与点滴等项目。适用性、次数、恢复期和术后护理需要结合个人情况咨询。",
        },
        {
          heading: "从肌肤困扰选择方向",
          body: "诊所还介绍了re-Beau 2肌肤检测、PicoWay激光、微针、PRP、玻尿酸、肉毒素、水光注射、医美脱毛与HARG育发等项目。应先确认问题和目标，再比较设备、药剂、恢复期与费用，而不是只根据项目名称决定。",
          items: [
            "色斑与泛红：先区分斑点、肝斑或炎症后的色素变化",
            "松弛与轮廓：比较HIFU、注射等不同方案",
            "毛孔与痘印：讨论微针、光疗和日常护理的组合",
            "毛发问题：区分脱毛与脱发治疗",
          ],
        },
        {
          heading: "治疗前后需要确认的事项",
          body: "请确认具体设备或产品、治疗范围、次数、恢复期、禁忌、总费用与复诊安排。部分治疗可能出现红肿、疼痛、淤青、色素变化或感染风险。咨询时请说明用药、既往病史和怀孕哺乳等情况，并按医嘱做好防晒与保湿。",
        },
      ],
      process: [
        "说明困扰与希望",
        "确认皮肤、健康状况与既往史",
        "了解方案、风险、费用与替代选择",
        "在充分同意后实施并复诊",
      ],
      note: "本页为一般信息，不构成治疗建议。适用性、效果与风险因人而异，请向诊所确认详情。",
      official: "诊所官方美容医疗介绍",
      officialUrl: `${clinicUrl}/rejuvenation/`,
    },
    regenerate: {
      title: "再生医疗",
      eyebrow: "REGENERATIVE MEDICINE",
      lead: "关注期待，也同样关注证据、不确定性与知情同意。",
      sections: [
        {
          heading: "证据程度各不相同的领域",
          body: "再生医疗包含细胞、血液成分及身体修复机制相关的方法。治疗目的、证据、监管、费用与风险因方法而异，不能一概而论。",
        },
        {
          heading: "诊所介绍的选项",
          body: "官方介绍包括干细胞治疗、PRP以及细胞培养上清液／外泌体相关项目。应确认产品来源、治疗目标，以及已知和未知之处。",
        },
        {
          heading: "咨询时可以问什么",
          body: "治疗针对什么问题？有哪些证据？是否有替代方案？风险、总费用及复诊安排是什么？这些问题有助于谨慎决定。",
        },
        {
          heading: "PRP与培养上清液类产品",
          body: "PRP使用本人血液，经处理后进行注射。培养上清液或外泌体是不同的制剂，应了解来源、制造管理、用途、风险以及仍不确定的部分。",
        },
        {
          heading: "干细胞治疗的大致流程",
          body: "官方介绍的流程包括咨询与检查、组织采集、细胞处理与培养、质量确认、点滴或注射，以及治疗后的复诊。具体方案、培养时间和来院次数会因计划而异，接受治疗前应确认完整时间表。",
          items: [
            "确认症状、既往史、用药和治疗目的",
            "完成必要的检查和血液检测",
            "了解采集、培养、投与和观察方式",
            "确认复诊安排及出现异常时的联系方法",
          ],
        },
        {
          heading: "制度、安全与总费用",
          body: "官方页面介绍了日本再生医疗安全性相关法律框架及认证委员会审查。请确认治疗计划或计划编号、知情同意书、检查与采集费用、培养费用、投与费用和后续诊疗，同时了解目前尚未确定的部分。",
        },
      ],
      process: [
        "整理目标与目前状态",
        "了解证据、适用范围与替代方案",
        "确认风险、费用、复诊与同意内容",
        "治疗后观察并复诊",
      ],
      note: "本页为一般信息，不推荐具体治疗。效果与安全性取决于方法和个人情况。",
      official: "诊所官方再生医疗介绍",
      officialUrl: `${clinicUrl}/regenerate/`,
    },
    urology: {
      title: "泌尿科",
      eyebrow: "UROLOGY",
      lead: "从肾脏到尿道，坦然讨论难以启齿的排尿困扰。",
      sections: [
        {
          heading: "泌尿科诊疗什么",
          body: "泌尿科诊疗肾脏、输尿管、膀胱、尿道，以及男性前列腺和睾丸相关疾病。尿频、血尿、疼痛或排尿困难可能有多种原因。",
        },
        {
          heading: "出现这些变化时可以咨询",
          body: "症状持续、反复或突然变化时，可以考虑咨询：尿频或夜尿、尿流变弱、残尿感、血尿、疼痛、尿失禁、强烈尿意、腰背痛或男性功能困扰。",
        },
        {
          heading: "检查与下一步",
          body: "医生会结合症状，选择尿液、血液或超声等检查。根据原因和程度，可能提供生活建议、药物治疗或转诊。",
        },
        {
          heading: "常见疾病例子",
          body: "诊所介绍涉及前列腺疾病、膀胱炎、膀胱过度活动、尿路结石及肾盂肾炎等。相似症状可能由不同原因造成，因此检查和复诊很重要。",
        },
        {
          heading: "可以咨询的症状与疾病",
          body: "官方泌尿科介绍还涉及尿路感染、结石、前列腺疾病、膀胱过度活动、尿失禁、性传播感染，以及男性性功能或激素相关困扰。女性和男性都可以因排尿症状寻求咨询。",
          items: [
            "疼痛、尿频、尿液混浊或发热可能与感染有关",
            "腰腹剧痛、恶心或血尿可能出现在结石等疾病中",
            "尿流变弱、夜尿或残尿感可能与前列腺有关",
            "强烈尿意和漏尿可以评估膀胱过度活动或尿失禁",
          ],
        },
        {
          heading: "检查可能包括什么",
          body: "医生会结合症状和经过，安排尿液、血液或超声等检查。如需进一步影像、内窥镜或专科治疗，可考虑转诊与协作。记录症状出现时间、频率、疼痛、发热和用药，有助于更准确地咨询。",
        },
      ],
      process: [
        "了解症状、时间和用药",
        "通过必要检查寻找原因",
        "说明结果与选择",
        "复诊观察，必要时协作转诊",
      ],
      note: "突发剧烈疼痛、发热或血尿有时需要尽快就医。请寻求专业意见，不要自行诊断。",
      official: "诊所官方泌尿科介绍",
      officialUrl: `${clinicUrl}/urology/`,
    },
  },
};
