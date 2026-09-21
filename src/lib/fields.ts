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
