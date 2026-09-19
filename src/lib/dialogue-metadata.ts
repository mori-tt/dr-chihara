import type { Metadata } from "next";
import { type Locale } from "./content";
import { dialogueCopy, type Dialogue } from "./dialogues";
import { pageMetadata, siteUrl } from "./metadata";

export function dialogueMetadata(locale: Locale, article?: Dialogue): Metadata {
  const copy = dialogueCopy[locale];
  const suffix = `dialogues/${article ? `${article.slug}/` : ""}`;
  const url = `${siteUrl}/${locale === "ja" ? "" : `${locale}/`}${suffix}`;
  const title = `${article ? `${article.translations[locale].title} | ` : ""}${copy.label} | Yoshitomo Chihara`;
  const description = article
    ? article.status === "template"
      ? copy.sampleNote
      : article.translations[locale].introduction
    : copy.intro;
  const image = `${siteUrl}${article?.cover || "/images/stock/laboratory.webp"}`;
  return {
    ...pageMetadata(locale),
    title,
    description,
    robots:
      article?.status === "template"
        ? { index: false, follow: true }
        : { index: true, follow: true },
    alternates: {
      canonical: url,
      languages: {
        ja: `${siteUrl}/${suffix}`,
        en: `${siteUrl}/en/${suffix}`,
        "zh-Hans": `${siteUrl}/zh/${suffix}`,
        "x-default": `${siteUrl}/${suffix}`,
      },
    },
    openGraph: {
      type: article?.status === "published" ? "article" : "website",
      title,
      description,
      url,
      siteName: "Yoshitomo Chihara",
      locale: locale === "ja" ? "ja_JP" : locale === "zh" ? "zh_CN" : "en_US",
      images: [
        {
          url: image,
          alt: article?.translations[locale].coverAlt || copy.label,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
