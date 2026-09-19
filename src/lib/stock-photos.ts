import type { Locale } from "./content";

export const stockPhotos = {
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
