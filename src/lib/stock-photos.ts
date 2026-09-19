import type { Locale } from "./content";

export const stockPhotos = {
  conversation: {
    src: "/images/stock/conversation.webp",
    credit: "Mike Jones / Pexels",
    url: "https://www.pexels.com/photo/two-people-with-coffee-cups-9051671/",
    alt: {
      ja: "コーヒーを手にテーブルを囲む二人。対話のイメージ写真。",
      en: "Two people sharing coffee at a table; an illustrative photograph of conversation.",
      zh: "两人围桌喝咖啡，交流的示意照片。",
    },
  },
  wellbeing: {
    src: "/images/stock/wellbeing.webp",
    credit: "Onur Burak Akın / Pexels",
    url: "https://www.pexels.com/photo/serene-forest-path-with-sunlight-filtering-through-trees-34269400/",
    alt: {
      ja: "木漏れ日が差す森の小道。穏やかな日常のイメージ写真。",
      en: "Sunlight filtering through a woodland path; an illustrative photograph of a quiet everyday moment.",
      zh: "阳光穿过林间小径，宁静日常的示意照片。",
    },
  },
  laboratory: {
    src: "/images/stock/laboratory.webp",
    credit: "Chokniti Khongchum / Pexels",
    url: "https://www.pexels.com/photo/person-holding-laboratory-flask-2280571/",
    alt: {
      ja: "実験器具とフラスコを持つ手。研究のイメージ写真。",
      en: "A gloved hand holding a flask beside laboratory equipment; illustrative research photograph.",
      zh: "手持烧瓶与实验器材，科研示意照片。",
    },
  },
  microscope: {
    src: "/images/stock/microscope.webp",
    credit: "Edward Jenner / Pexels",
    url: "https://www.pexels.com/photo/a-researcher-using-a-microscope-4031522/",
    alt: {
      ja: "顕微鏡で試料を観察する研究者。研究のイメージ写真。",
      en: "A researcher examining samples with a microscope; illustrative research photograph.",
      zh: "研究人员使用显微镜观察样本，科研示意照片。",
    },
  },
  stethoscope: {
    src: "/images/stock/stethoscope.webp",
    credit: "Pixabay / Pexels",
    url: "https://www.pexels.com/photo/blue-and-silver-stetoscope-40568/",
    alt: {
      ja: "書類の上に置かれた聴診器。医療のイメージ写真。",
      en: "A stethoscope resting on paperwork; illustrative medical photograph.",
      zh: "文件上的听诊器，医疗示意照片。",
    },
  },
};
export const stockLabel: Record<Locale, string> = {
  ja: "イメージ写真",
  en: "Illustrative stock photograph",
  zh: "图库示意照片",
};
