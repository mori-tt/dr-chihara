import { basePath, type Locale } from "./content";
import { careTopics, type CareTopic } from "./care-guide";
import { feeRows } from "./care-support";
import { fieldSlugs, type FieldSlug } from "./fields";

export const topicPath = (locale: Locale, slug: FieldSlug, id: string) =>
  `${basePath}/${locale === "ja" ? "" : `${locale}/`}fields/${slug}/${id}/`;

export const allTopics = () =>
  fieldSlugs.flatMap((slug) =>
    careTopics[slug].map((topic) => ({ slug, topic })),
  );

export const findTopic = (slug: string, id: string): CareTopic | undefined =>
  careTopics[slug as FieldSlug]?.find((topic) => topic.id === id);

const feePrefixes: Record<string, string[]> = {
  photofacial: ["M22"],
  picolaser: ["ピコ"],
  hifu: ["HIFU"],
  dermapen: ["ダーマペン"],
  hyaluronic: ["ヒアルロン酸"],
  vital: ["水光注射"],
  epilation: ["医療脱毛"],
  harg: ["HARG"],
  "stem-cell": ["幹細胞"],
  prp: ["PRP"],
  exosome: ["培養上清液", "エクソソーム"],
};

export const feesForTopic = (id: string) =>
  fieldSlugs
    .flatMap((slug) => feeRows[slug])
    .filter((row) =>
      (feePrefixes[id] ?? []).some((prefix) => row.label.ja.startsWith(prefix)),
    );

/** Search-result title and description for one topic page. */
export function topicSeo(locale: Locale, slug: FieldSlug, topic: CareTopic) {
  const title = topic.title[locale];
  const concern = topic.concern[locale];
  const urology = slug === "urology";
  const hasFees = feesForTopic(topic.id).length > 0;
  if (locale === "ja")
    return {
      title: `${title}｜${urology ? "検査・治療・受診の目安" : "流れ・経過・リスク"}（大阪・上本町）`,
      description: `${title}（${concern}）の考え方、進め方、${urology ? "受診の目安" : "通院・経過の目安"}、リスクと注意点${hasFees ? "、公式料金の目安" : ""}を、大阪・上本町のノリス美容クリニック院長 千原良友が一般向けに整理しました。`,
    };
  if (locale === "zh")
    return {
      title: `${title}：${urology ? "检查、治疗与就诊参考" : "流程、恢复与风险"}（大阪上本町）`,
      description: `${title}（${concern}）的基本思路、流程、${urology ? "就诊参考" : "就诊与恢复参考"}、风险与注意事项${hasFees ? "及官方费用参考" : ""}，由大阪上本町诺里斯美容诊所院长千原良友以一般信息形式整理。`,
    };
  return {
    title: `${title}: ${urology ? "tests and care" : "process and risks"}`,
    description: `${title}: ${urology ? "tests, treatment and when to seek care" : `process, recovery and risks${hasFees ? ", plus fees" : ""}`}. Explained by Dr. Yoshitomo Chihara, Norris Beauty Clinic, Osaka.`,
  };
}
