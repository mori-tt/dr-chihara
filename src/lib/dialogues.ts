import { localePath, type Locale } from "./content";

export const dialoguePath = (locale: Locale, slug?: string) =>
  `${localePath(locale)}dialogues/${slug ? `${slug}/` : ""}`;
export const dialogueCopy = {
  ja: {
    label: "私の哲学",
    subtitle: "千原良友の対談シリーズ",
    title: ["一人の歩みに、", "ひとつの哲学。"],
    intro:
      "何を大切にし、どんな道を選んできたのか。さまざまな分野を歩む方々との対話を通じて、その人ならではの考え方に触れる連載をお届けする予定です。",
    homeTitle: ["対話から見つける、", "生き方のヒント。"],
    homeIntro:
      "人との出会いから、視点が広がる。千原良友がゲストの経験や価値観に耳を傾ける対談シリーズ。",
    explore: "対談シリーズを見る",
    all: "対談一覧へ",
    home: "ホーム",
    upcoming: "対談は、これから。",
    upcomingBody:
      "最初の対談を準備しています。公開まで、記事のサンプルをご覧いただけます。",
    sample: "記事サンプル",
    sampleNote:
      "このページは対談記事の雛形です。ゲスト名・本文・写真は差し替え用で、実際の対談や発言を掲載したものではありません。",
    read: "記事を読む",
    preview: "記事サンプルを見る",
    archive: "すべての対談",
    contents: "この記事の内容",
    guest: "ゲスト",
    interviewer: "聞き手",
    profile: "プロフィール",
    question: "質問",
    answer: "ゲスト",
    exampleQuestion: "質問例",
    exampleAnswer: "回答欄",
    afterword: "対談を終えて",
    quote: "この対談の言葉",
    photo: "写真について",
    credits: "取材・制作",
    back: "一覧に戻る",
    related: "次の対話へ",
    relatedBody: "新しい対談は、このページで順次ご紹介します。",
    hostBio:
      "医師・医学博士。ノリス美容クリニック院長。泌尿器科の臨床、米国でのがん研究、分子病理学を経て美容医療へ。",
    hostProfile: "千原良友のプロフィール",
    draftDate: "公開日未定",
    readTime: "分で読む",
  },
  en: {
    label: "My Philosophy",
    subtitle: "Conversations with Yoshitomo Chihara",
    title: ["Every life.", "A perspective of its own."],
    intro:
      "What do we value, and how do we choose our path? This upcoming series explores personal perspectives through conversations with people from different walks of life.",
    homeTitle: ["New perspectives.", "One conversation at a time."],
    homeIntro:
      "A forthcoming conversation series in which Yoshitomo Chihara listens to guests’ experiences, choices and values.",
    explore: "Explore the conversations",
    all: "All conversations",
    home: "Home",
    upcoming: "Conversations to come.",
    upcomingBody:
      "Our first conversation is in preparation. In the meantime, explore the sample article.",
    sample: "Sample article",
    sampleNote:
      "This is an article template. Guest details, text and photographs are placeholders, not a record of a real conversation or statements.",
    read: "Read the conversation",
    preview: "Explore the sample",
    archive: "All conversations",
    contents: "In this conversation",
    guest: "Guest",
    interviewer: "Interviewer",
    profile: "Profile",
    question: "Question",
    answer: "Guest",
    exampleQuestion: "Sample question",
    exampleAnswer: "Answer placeholder",
    afterword: "After the conversation",
    quote: "A thought to take away",
    photo: "About the photograph",
    credits: "Production credits",
    back: "Back to conversations",
    related: "The next conversation",
    relatedBody: "New conversations will appear here as they are published.",
    hostBio:
      "Physician, PhD and director of Norris Beauty Clinic. His background spans urology, cancer research in the United States, molecular pathology and aesthetic medicine.",
    hostProfile: "About Yoshitomo Chihara",
    draftDate: "Publication date to be announced",
    readTime: "min read",
  },
  zh: {
    label: "我的哲学",
    subtitle: "千原良友对谈系列",
    title: ["每一段人生，", "都有独特的哲学。"],
    intro:
      "珍视什么，又如何选择人生的方向？本系列计划通过与不同领域人士的对话，走近他们的经历与价值观。",
    homeTitle: ["从对话中，", "发现生活的新视角。"],
    homeIntro: "千原良友将与不同领域的嘉宾交流，倾听他们的经历、选择与价值观。",
    explore: "查看对谈系列",
    all: "全部对谈",
    home: "首页",
    upcoming: "对话，即将开始。",
    upcomingBody: "首篇对谈正在准备中。正式发布前，欢迎浏览文章示例。",
    sample: "文章示例",
    sampleNote:
      "本页为对谈文章模板。嘉宾资料、正文与照片均为待替换内容，并非真实对谈或发言记录。",
    read: "阅读对谈",
    preview: "浏览文章示例",
    archive: "全部对谈",
    contents: "本文目录",
    guest: "嘉宾",
    interviewer: "采访者",
    profile: "个人简介",
    question: "提问",
    answer: "嘉宾",
    exampleQuestion: "提问示例",
    exampleAnswer: "回答占位内容",
    afterword: "对谈后记",
    quote: "对谈中的一句话",
    photo: "照片说明",
    credits: "制作信息",
    back: "返回对谈列表",
    related: "下一场对话",
    relatedBody: "新的对谈将在此陆续发布。",
    hostBio:
      "医师、医学博士，诺里斯美容诊所院长。从泌尿科临床、美国癌症研究和分子病理学，走向美容医疗。",
    hostProfile: "了解千原良友",
    draftDate: "发布日期待定",
    readTime: "分钟阅读",
  },
};

export type DialogueTranslation = {
  title: string;
  category: string;
  introduction: string;
  guest: {
    name: string;
    role: string;
    biography: string;
    image?: string;
    imageAlt?: string;
  };
  coverAlt: string;
  coverCaption: string;
  sections: {
    id: string;
    title: string;
    exchanges: { question: string; answer: string[] }[];
    image?: string;
    imageAlt?: string;
    caption?: string;
  }[];
  quote?: string;
  afterword: string[];
  credits: string;
};
type DialogueBase = {
  slug: string;
  cover: string;
  translations: Record<Locale, DialogueTranslation>;
};
export type Dialogue = DialogueBase &
  (
    | {
        status: "template";
        publishedAt?: never;
        volume?: never;
        readingMinutes?: never;
      }
    | {
        status: "published";
        publishedAt: string;
        volume: string;
        readingMinutes: number;
      }
  );

// Copy this object for each interview; see docs/dialogues.md for publication steps.
export const dialogues: Dialogue[] = [
  {
    slug: "sample",
    status: "template",
    cover: "/images/consultation.webp",
    translations: {
      ja: {
        title: "経験を、これからの力に。",
        category: "生き方と価値観",
        introduction:
          "［ここに対談の導入文を入れます。ゲストがどんな方なのか、今回どのようなテーマでお話を伺ったのかを紹介します。読者が対談の背景を知り、続きを読みたくなる入口に。］",
        guest: {
          name: "ゲストのお名前",
          role: "肩書き・所属",
          biography:
            "［ここにゲストのプロフィールを入れます。これまでの歩み、現在の活動、今回の対談につながる背景などを紹介します。肩書きは対談時点の情報を記載します。］",
        },
        coverAlt:
          "ノリス美容クリニックのカウンセリングルーム。対談写真の仮画像。",
        coverCaption:
          "仮画像：ノリス美容クリニックのカウンセリングルーム。公開時に対談写真へ差し替えます。",
        sections: [
          {
            id: "origins",
            title: "いまにつながる、原点。",
            exchanges: [
              {
                question: "今の道を選ぶきっかけとなった経験を教えてください。",
                answer: [
                  "［ゲストの回答を入れます。原点となった出来事や出会いを、対談の言葉を活かして紹介します。］",
                  "［段落を分けて続きを記載できます。具体的なエピソードや、その時に感じたことを掘り下げます。］",
                ],
              },
              {
                question:
                  "その経験は、現在の考え方にどのようにつながっていますか。",
                answer: [
                  "［問いに対するゲストの回答を入れます。必要に応じて質問と回答の組を追加できます。］",
                ],
              },
            ],
          },
          {
            id: "values",
            title: "選択のそばにある、価値観。",
            exchanges: [
              {
                question: "迷ったとき、大切にしている判断の軸はありますか。",
                answer: [
                  "［ゲストが大切にしている価値観や哲学を記載します。ご本人の確認を経た言葉に差し替えます。］",
                ],
              },
            ],
            image: "/images/lounge.webp",
            imageAlt: "ノリス美容クリニックの待合室。本文写真の仮画像。",
            caption:
              "本文写真の挿入例。現在はクリニックの待合室写真を使用しています。",
          },
          {
            id: "future",
            title: "これから、描いていくこと。",
            exchanges: [
              {
                question:
                  "これから挑戦したいことや、次の世代に伝えたいことを教えてください。",
                answer: [
                  "［今後の展望や読者へのメッセージを入れます。対談の余韻が残る言葉で、この章を締めくくります。］",
                ],
              },
            ],
          },
        ],
        quote: "ここに、対談を象徴する言葉を。",
        afterword: [
          "［千原先生の対談後記を入れます。会話を通じて印象に残ったこと、新しく気づいた視点などを、ご本人の原稿に差し替えて掲載します。］",
        ],
        credits:
          "［対談日・場所／取材・構成／撮影などのクレジットを記載します。］",
      },
      en: {
        title: "Turning experience into possibility.",
        category: "Life & values",
        introduction:
          "[Introduce the guest, the subject of the conversation and the context behind it. This opening gives readers a reason to explore the conversation.]",
        guest: {
          name: "Guest name",
          role: "Title / affiliation",
          biography:
            "[Add the guest’s background, current work and the experiences relevant to this conversation. Use their title at the time of the interview.]",
        },
        coverAlt:
          "Consultation room at Norris Beauty Clinic, used as a placeholder for an interview photograph.",
        coverCaption:
          "Placeholder: the consultation room at Norris Beauty Clinic. Replace with an interview photograph before publication.",
        sections: [
          {
            id: "origins",
            title: "Where it all began.",
            exchanges: [
              {
                question: "What experience first led you to choose this path?",
                answer: [
                  "[Insert the guest’s answer, describing the experiences and encounters that shaped their path.]",
                  "[Continue in a new paragraph. Develop specific stories and the reflections behind them.]",
                ],
              },
              {
                question:
                  "How does that experience influence the way you think today?",
                answer: [
                  "[Insert the guest’s answer. Add further question-and-answer pairs as needed.]",
                ],
              },
            ],
          },
          {
            id: "values",
            title: "The values behind a choice.",
            exchanges: [
              {
                question: "When a decision feels difficult, what guides you?",
                answer: [
                  "[Insert the guest’s perspective, using wording reviewed by the interviewee.]",
                ],
              },
            ],
            image: "/images/lounge.webp",
            imageAlt:
              "The clinic’s waiting lounge, used as a placeholder for an article photograph.",
            caption:
              "Example of an inline photograph. This is currently a photograph of the clinic’s waiting lounge.",
          },
          {
            id: "future",
            title: "What comes next.",
            exchanges: [
              {
                question:
                  "What would you like to explore next, or pass on to the next generation?",
                answer: [
                  "[Insert the guest’s future plans or message to readers to close this chapter.]",
                ],
              },
            ],
          },
        ],
        quote: "A defining thought from the conversation goes here.",
        afterword: [
          "[Insert Dr. Chihara’s afterword, replacing this placeholder with his own reflections on the conversation.]",
        ],
        credits:
          "[Add interview date, location, writing, editing and photography credits.]",
      },
      zh: {
        title: "让经历，成为前行的力量。",
        category: "人生与价值观",
        introduction:
          "［在此填写对谈导语。介绍嘉宾的背景、本次对谈的主题，以及展开这场交流的缘由。］",
        guest: {
          name: "嘉宾姓名",
          role: "职务・所属机构",
          biography:
            "［在此介绍嘉宾的经历、当前工作及与本次主题相关的背景。职务以对谈时的信息为准。］",
        },
        coverAlt: "诺里斯美容诊所咨询室，作为对谈照片的占位图片。",
        coverCaption:
          "临时图片：诺里斯美容诊所咨询室。正式发布时请替换为对谈照片。",
        sections: [
          {
            id: "origins",
            title: "一切开始的地方。",
            exchanges: [
              {
                question: "是什么经历让您选择了现在的道路？",
                answer: [
                  "［在此填写嘉宾的回答，介绍影响其人生道路的经历与相遇。］",
                  "［可分段继续填写，通过具体故事呈现当时的感受与思考。］",
                ],
              },
              {
                question: "这段经历如何影响您今天的想法？",
                answer: ["［在此填写嘉宾的回答，可根据需要增加问答。］"],
              },
            ],
          },
          {
            id: "values",
            title: "选择背后的价值观。",
            exchanges: [
              {
                question: "面对困难的选择时，您会遵循怎样的原则？",
                answer: [
                  "［填写嘉宾珍视的价值观，并替换为经过本人确认的文字。］",
                ],
              },
            ],
            image: "/images/lounge.webp",
            imageAlt: "诊所候诊室，作为正文照片的占位图片。",
            caption: "正文插图示例。当前使用的是诊所候诊室照片。",
          },
          {
            id: "future",
            title: "接下来，想描绘的未来。",
            exchanges: [
              {
                question: "未来想尝试什么，又希望给下一代留下怎样的话语？",
                answer: [
                  "［在此填写嘉宾的未来展望或给读者的寄语，作为本章的结束。］",
                ],
              },
            ],
          },
        ],
        quote: "在此放入对谈中令人印象深刻的一句话。",
        afterword: [
          "［在此填写千原医师的对谈后记，并替换为他本人对于本次交流的感悟。］",
        ],
        credits: "［填写对谈日期、地点、采访、编辑与摄影等信息。］",
      },
    },
  },
];

export const getDialogue = (slug: string) =>
  dialogues.find((article) => article.slug === slug);
export const publishedDialogues = () =>
  dialogues
    .filter((article) => article.status === "published")
    .sort((a, b) => (b.publishedAt || "").localeCompare(a.publishedAt || ""));
export const visibleDialogues = () =>
  publishedDialogues().length
    ? publishedDialogues()
    : dialogues.filter((article) => article.status === "template");
