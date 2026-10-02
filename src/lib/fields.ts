import type { Locale } from "./content";
import { basePath, clinicUrl } from "./content";

export type FieldSlug = "rejuvenation" | "regenerate" | "urology";
export type FieldSection = { heading: string; body: string; items?: string[] };
export type FieldCopy = {
  title: string;
  eyebrow: string;
  lead: string;
  /** Descriptive <title> (without the site name) for search results. */
  seoTitle: string;
  /** Meta description: what the page covers, who wrote it, where the clinic is. */
  seoDescription: string;
  sections: FieldSection[];
  process: string[];
  note: string;
  official: string;
  officialUrl: string;
  /** Official clinic menus not covered on this page, linked for completeness. */
  moreOfficial?: { intro: string; links: { label: string; url: string }[] };
};

export const fieldSlugs: FieldSlug[] = [
  "rejuvenation",
  "regenerate",
  "urology",
];
export const fieldsHubPath = (locale: Locale) =>
  `${basePath}/${locale === "ja" ? "" : `${locale}/`}fields/`;
export const fieldsHub: Record<
  Locale,
  {
    title: string;
    eyebrow: string;
    lead: string;
    seoTitle: string;
    seoDescription: string;
    view: string;
  }
> = {
  ja: {
    title: "診療のフィールド",
    eyebrow: "AREAS OF PRACTICE",
    lead: "美容医療・再生医療・泌尿器科。それぞれの診療を、一般向けに整理しました。",
    seoTitle: "診療のフィールド：美容医療・再生医療・泌尿器科",
    seoDescription:
      "大阪・上本町のノリス美容クリニック院長 千原良友の診療分野。美容医療、再生医療、泌尿器科それぞれの治療の選び方・症状・料金の目安・注意点を、一般向けに案内します。",
    view: "詳しく見る",
  },
  en: {
    title: "Areas of practice",
    eyebrow: "AREAS OF PRACTICE",
    lead: "Aesthetic medicine, regenerative medicine and urology, each explained in plain language.",
    seoTitle: "Areas of practice: aesthetic, regenerative, urology",
    seoDescription:
      "Areas of practice of Dr. Yoshitomo Chihara, Norris Beauty Clinic, Osaka: aesthetic medicine, regenerative medicine and urology, with fees, risks and what to consider.",
    view: "Read more",
  },
  zh: {
    title: "诊疗领域",
    eyebrow: "AREAS OF PRACTICE",
    lead: "美容医疗、再生医疗与泌尿科，以通俗的方式分别介绍。",
    seoTitle: "诊疗领域：美容医疗、再生医疗、泌尿科",
    seoDescription:
      "大阪上本町诺里斯美容诊所院长千原良友的诊疗领域：美容医疗、再生医疗与泌尿科，提供治疗选择、症状、费用参考与注意事项的一般性介绍。",
    view: "查看详情",
  },
};
export const fieldPath = (locale: Locale, slug: FieldSlug) =>
  `${basePath}/${locale === "ja" ? "" : `${locale}/`}fields/${slug}/`;

export const fieldCopy: Record<Locale, Record<FieldSlug, FieldCopy>> = {
  ja: {
    rejuvenation: {
      title: "美容医療",
      eyebrow: "AESTHETIC MEDICINE",
      lead: "変化を急がず、その人らしい表情と毎日に寄り添う医療。",
      seoTitle: "美容医療の診療案内：治療の選び方・料金の目安",
      seoDescription:
        "フォトフェイシャルM22、HIFU、ボトックス、ヒアルロン酸、ダーマペン、医療脱毛、HARG療法など、美容医療の選び方・通院の目安・リスクと公式料金の目安を、ノリス美容クリニック（大阪・上本町）院長 千原良友が一般向けに整理しました。",
      moreOfficial: {
        intro:
          "クリニック公式サイトでは、このページで扱っていない次のメニューも案内しています。内容・適応・料金は公式ページと診察でご確認ください。",
        links: [
          { label: "ホルモン注射", url: `${clinicUrl}/hormone/` },
          { label: "美容点滴", url: `${clinicUrl}/beauty/` },
          { label: "いぼ・ほくろ・タトゥー除去", url: `${clinicUrl}/mole/` },
          { label: "ピアス・その他", url: `${clinicUrl}/others/` },
          { label: "メンズメニュー", url: `${clinicUrl}/mens_menu/` },
          { label: "料金一覧", url: `${clinicUrl}/fee/` },
        ],
      },
      sections: [
        {
          heading: "美容医療とは",
          body: "肌の状態、年齢に伴う変化、輪郭や表情のお悩みなどを、診察とカウンセリングで整理し、治療の選択肢を一緒に考える領域です。見た目だけでなく、日々の過ごしやすさや気持ちも大切にします。",
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
      seoTitle: "再生医療の基礎知識：幹細胞・PRP・エクソソーム",
      seoDescription:
        "幹細胞治療・PRP療法・培養上清液（エクソソーム）の違い、治療の流れ、再生医療等安全性確保法に基づく制度と安全性、公式料金の目安を、ノリス美容クリニック院長・日本再生医療学会会員の千原良友が一般向けに整理。期待と根拠を分けて理解するための案内です。",
      sections: [
        {
          heading: "再生医療をどう考えるか",
          body: "細胞や血液に含まれる成分など、身体の修復に関わる仕組みを研究・応用する医療分野です。治療法によって目的、エビデンス、承認や届出の枠組み、費用が異なるため、ひとくくりに判断しないことが大切です。",
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
      seoTitle: "泌尿器科の診療案内：頻尿・血尿・前立腺・尿漏れ",
      seoDescription:
        "頻尿・夜間頻尿、血尿、排尿時の痛み、尿漏れ、前立腺の症状、性感染症、ED・男性更年期など泌尿器科で相談できる症状と、検査・治療の進め方、受診の目安を、泌尿器科での臨床経験をもつ千原良友（大阪・上本町 ノリス美容クリニック院長）が解説します。",
      sections: [
        {
          heading: "泌尿器科とは",
          body: "腎臓・尿管・膀胱・尿道などの尿路と、男性の前立腺・精巣などに関わる病気を診る診療科です。頻尿、血尿、排尿時の痛み、尿が出にくいといった症状には、さまざまな原因が隠れていることがあります。",
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
      moreOfficial: {
        intro:
          "クリニック公式サイトには、このページで扱っていない男性向けメニューや料金の詳細も掲載されています。",
        links: [
          { label: "メンズメニュー", url: `${clinicUrl}/mens_menu/` },
          { label: "料金一覧", url: `${clinicUrl}/fee/` },
        ],
      },
    },
  },
  en: {
    rejuvenation: {
      title: "Aesthetic medicine",
      eyebrow: "AESTHETIC MEDICINE",
      lead: "Care for the way you look, feel and move through everyday life.",
      seoTitle: "Aesthetic medicine: treatments and fees",
      seoDescription:
        "Aesthetic treatments—M22 photofacial, HIFU, injectables, hair removal, HARG—with fees and risks, by Dr. Yoshitomo Chihara, Norris Beauty Clinic, Osaka.",
      moreOfficial: {
        intro:
          "The clinic’s official site also lists the following menus, which this page does not cover. Details, eligibility and fees are on the official pages (Japanese) and confirmed in consultation.",
        links: [
          { label: "Hormone injections", url: `${clinicUrl}/hormone/` },
          { label: "Beauty infusions", url: `${clinicUrl}/beauty/` },
          { label: "Wart, mole and tattoo removal", url: `${clinicUrl}/mole/` },
          { label: "Piercing and other menus", url: `${clinicUrl}/others/` },
          { label: "Men’s menu", url: `${clinicUrl}/mens_menu/` },
          { label: "Full price list", url: `${clinicUrl}/fee/` },
        ],
      },
      sections: [
        {
          heading: "What aesthetic medicine means here",
          body: "Aesthetic care begins by understanding concerns about skin, facial change and appearance. Consultation, medical assessment and your own priorities come before choosing a procedure.",
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
      seoTitle: "Regenerative medicine: stem cells and PRP",
      seoDescription:
        "Stem-cell therapy, PRP and exosome supernatant: differences, regulation, safety and fees, by Dr. Yoshitomo Chihara, Norris Beauty Clinic, Osaka.",
      sections: [
        {
          heading: "A field with different levels of evidence",
          body: "Regenerative medicine includes approaches involving cells or blood-derived components and the body’s repair processes. Purpose, evidence, regulation, cost and risk vary by treatment; they should not be treated as one category.",
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
      seoTitle: "Urology: urinary symptoms and men’s health",
      seoDescription:
        "Urinary symptoms, prostate issues, STIs and ED—how a urology visit works, explained by urologist Dr. Yoshitomo Chihara at Norris Beauty Clinic, Osaka.",
      sections: [
        {
          heading: "What urology covers",
          body: "Urology covers the kidneys, ureters, bladder and urethra, as well as the prostate and testes. Frequency, blood in the urine, pain or difficulty urinating can have different causes.",
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
      moreOfficial: {
        intro:
          "The official site also lists a men’s menu and full price details not covered on this page (in Japanese).",
        links: [
          { label: "Men’s menu", url: `${clinicUrl}/mens_menu/` },
          { label: "Full price list", url: `${clinicUrl}/fee/` },
        ],
      },
    },
  },
  zh: {
    rejuvenation: {
      title: "美容医疗",
      eyebrow: "AESTHETIC MEDICINE",
      lead: "从容面对变化，让医疗贴近每个人的日常与表情。",
      seoTitle: "美容医疗：治疗选择、费用参考与注意事项",
      seoDescription:
        "由大阪上本町诺里斯美容诊所院长千原良友介绍M22光子嫩肤、HIFU、肉毒素、玻尿酸、微针、医疗脱毛、HARG育发等美容医疗的选择方法、就诊与恢复参考、风险以及官方费用参考。",
      moreOfficial: {
        intro:
          "诊所官方网站还介绍了本页未涉及的以下项目。具体内容、适应范围与费用请查看官方页面（日语）并在就诊时确认。",
        links: [
          { label: "激素注射", url: `${clinicUrl}/hormone/` },
          { label: "美容点滴", url: `${clinicUrl}/beauty/` },
          { label: "疣、痣与纹身去除", url: `${clinicUrl}/mole/` },
          { label: "穿环与其他项目", url: `${clinicUrl}/others/` },
          { label: "男士项目", url: `${clinicUrl}/mens_menu/` },
          { label: "价目一览", url: `${clinicUrl}/fee/` },
        ],
      },
      sections: [
        {
          heading: "美容医疗是什么",
          body: "从皮肤状态、年龄变化与外观困扰出发，通过问诊与咨询整理目标，再一起讨论治疗选择。重要的不只是外表，也包括日常生活与心情。",
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
      seoTitle: "再生医疗：干细胞、PRP与外泌体的区别",
      seoDescription:
        "干细胞治疗、PRP疗法与培养上清液（外泌体）的区别、治疗流程、日本的制度与安全性、官方费用参考，由诺里斯美容诊所院长、日本再生医疗学会会员千原良友以一般信息形式整理，帮助区分期待与依据。",
      sections: [
        {
          heading: "证据程度各不相同的领域",
          body: "再生医疗包含细胞、血液成分及身体修复机制相关的方法。治疗目的、证据、监管、费用与风险因方法而异，不能一概而论。",
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
      seoTitle: "泌尿科：尿频、血尿、前列腺与男性健康",
      seoDescription:
        "尿频与夜尿、血尿、排尿疼痛、漏尿、前列腺症状、性传播感染及ED等可在泌尿科咨询的症状，以及检查与治疗的流程，由具有泌尿科临床经验的千原良友（大阪上本町 诺里斯美容诊所院长）说明。",
      sections: [
        {
          heading: "泌尿科诊疗什么",
          body: "泌尿科诊疗肾脏、输尿管、膀胱、尿道，以及男性前列腺和睾丸相关疾病。尿频、血尿、疼痛或排尿困难可能有多种原因。",
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
      moreOfficial: {
        intro: "诊所官方网站还刊载了本页未涉及的男性项目与费用详情（日语）。",
        links: [
          { label: "男士项目", url: `${clinicUrl}/mens_menu/` },
          { label: "价目一览", url: `${clinicUrl}/fee/` },
        ],
      },
    },
  },
};
