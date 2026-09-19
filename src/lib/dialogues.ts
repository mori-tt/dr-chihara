import { localePath, type Locale } from "./content";
import { sampleDialogue } from "./sample-dialogue";

export const dialoguePath = (locale: Locale, slug?: string) =>
  `${localePath(locale)}dialogues/${slug ? `${slug}/` : ""}`;
export const dialogueCopy = {
  ja: {
    label: "人間交差点",
    subtitle: "千原良友の対談シリーズ",
    title: ["人生が交わる。", "視点が広がる。"],
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
      "最初の対談を準備しています。再生医療をテーマにした架空の対談記事を、サンプルとしてお読みいただけます。",
    sample: "架空の対談・サンプル",
    sampleNote:
      "この対談はフィクションです。ゲストの藤森 悠は架空の医師で、千原先生側の発言・引用・対談後記も含めて創作です。実際の対談、ご本人の見解・診療内容を示すものではありません。写真はイメージです。",
    read: "記事を読む",
    preview: "架空の対談を読む",
    archive: "すべての対談",
    contents: "この記事の内容",
    guest: "ゲスト",
    interviewer: "聞き手",
    profile: "プロフィール",
    question: "質問",
    answer: "ゲスト",
    exampleQuestion: "千原（創作）",
    exampleAnswer: "藤森（架空）",
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
    draftDate: "FICTION / SAMPLE",
    references: "一般的な医学情報の参考資料",
    readTime: "分で読む",
  },
  en: {
    label: "Human Crossroads",
    subtitle: "Conversations with Yoshitomo Chihara",
    title: ["Where lives meet.", "Where perspectives grow."],
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
      "Our first interview is in preparation. Explore a fictional conversation about regenerative medicine in the meantime.",
    sample: "Fictional conversation",
    sampleNote:
      "This is fiction. Dr. Yu Fujimori is an invented physician. Dr. Chihara’s lines, the quotation and the afterword are also fictional and do not represent his actual statements, views or clinical practice. Stock photographs are illustrative.",
    read: "Read the conversation",
    preview: "Read the fictional conversation",
    archive: "All conversations",
    contents: "In this conversation",
    guest: "Guest",
    interviewer: "Interviewer",
    profile: "Profile",
    question: "Question",
    answer: "Guest",
    exampleQuestion: "Chihara (fiction)",
    exampleAnswer: "Fujimori (fiction)",
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
    draftDate: "FICTION / SAMPLE",
    references: "References for general medical information",
    readTime: "min read",
  },
  zh: {
    label: "人生交汇点",
    subtitle: "千原良友对谈系列",
    title: ["人生在此交汇，", "视野由此拓展。"],
    intro:
      "珍视什么，又如何选择人生的方向？本系列计划通过与不同领域人士的对话，走近他们的经历与价值观。",
    homeTitle: ["从对话中，", "发现生活的新视角。"],
    homeIntro: "千原良友将与不同领域的嘉宾交流，倾听他们的经历、选择与价值观。",
    explore: "查看对谈系列",
    all: "全部对谈",
    home: "首页",
    upcoming: "对话，即将开始。",
    upcomingBody:
      "首篇真实对谈正在准备中。欢迎先阅读以再生医疗为主题的虚构对谈示例。",
    sample: "虚构对谈示例",
    sampleNote:
      "本篇为虚构对谈。嘉宾藤森悠是虚构医师，千原医师一方的发言、引语与后记也均为创作，不代表真实对谈、本人观点或诊疗内容。图库照片仅作示意。",
    read: "阅读对谈",
    preview: "阅读虚构对谈",
    archive: "全部对谈",
    contents: "本文目录",
    guest: "嘉宾",
    interviewer: "采访者",
    profile: "个人简介",
    question: "提问",
    answer: "嘉宾",
    exampleQuestion: "千原（虚构）",
    exampleAnswer: "藤森（虚构）",
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
    draftDate: "FICTION / SAMPLE",
    references: "一般医学信息参考资料",
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
    monogram?: string;
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

// Add real interviews here once their content is ready for publication.
export const dialogues: Dialogue[] = [sampleDialogue];

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
