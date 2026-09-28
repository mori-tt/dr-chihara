import type { Metadata } from "next";
import { type Locale } from "./content";
import { dialogueCopy, type Dialogue } from "./dialogues";
import {
  canonicalUrl,
  ogImage,
  ogLocales,
  pageMetadata,
  rssLink,
  siteNoindex,
  siteTitle,
} from "./metadata";

export function dialogueMetadata(locale: Locale, article?: Dialogue): Metadata {
  const copy = dialogueCopy[locale];
  const suffix = `dialogues/${article ? `${article.slug}/` : ""}`;
  const url = `${canonicalUrl}/${locale === "ja" ? "" : `${locale}/`}${suffix}`;
  const publishedArticle =
    article && article.status === "published" ? article : undefined;
  const pageTitle = `${article ? `${article.translations[locale].title} | ` : ""}${copy.label}`;
  const fullTitle = `${pageTitle} | ${siteTitle(locale)}`;
  const description = article
    ? article.status === "template"
      ? copy.sampleNote
      : article.translations[locale].introduction
    : copy.intro;
  const generated = !article || article.slug === "sample";
  const image = generated
    ? `${canonicalUrl}/images/og/${article ? "sample" : "crossroads"}-${locale}.png`
    : ogImage(
        `/images/og/article-${article.slug}-${locale}.png`,
        article.cover,
      );
  return {
    ...pageMetadata(locale),
    title: pageTitle,
    description,
    robots: {
      index: !siteNoindex && article?.status !== "template",
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    alternates: {
      canonical: url,
      languages: {
        ja: `${canonicalUrl}/${suffix}`,
        en: `${canonicalUrl}/en/${suffix}`,
        "zh-Hans": `${canonicalUrl}/zh/${suffix}`,
        "x-default": `${canonicalUrl}/${suffix}`,
      },
      types: rssLink(locale),
    },
    openGraph: {
      type: publishedArticle ? "article" : "website",
      title: fullTitle,
      description,
      url,
      siteName: "Yoshitomo Chihara",
      ...ogLocales(locale),
      ...(publishedArticle
        ? {
            publishedTime: publishedArticle.publishedAt,
            modifiedTime:
              publishedArticle.updatedAt ?? publishedArticle.publishedAt,
            authors: [`${canonicalUrl}/${locale === "ja" ? "" : `${locale}/`}`],
            section: publishedArticle.translations[locale].category,
          }
        : {}),
      images: [
        {
          url: image,
          type: image.endsWith(".webp") ? "image/webp" : "image/png",
          alt: generated
            ? fullTitle
            : article?.translations[locale].coverAlt || copy.label,
          ...(generated
            ? { width: 1200, height: 630 }
            : { width: article?.coverWidth, height: article?.coverHeight }),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
