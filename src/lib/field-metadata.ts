import type { Metadata } from "next";
import { type Locale } from "./content";
import { fieldCopy, fieldsHub, type FieldSlug } from "./fields";
import { careTopics } from "./care-guide";
import { topicSeo } from "./care-topics";
import {
  canonicalUrl,
  ogImage,
  pageMetadata,
  rssLink,
  siteTitle,
} from "./metadata";

function buildMetadata(
  locale: Locale,
  suffix: string,
  seoTitle: string,
  description: string,
  imagePath: string,
): Metadata {
  const base = pageMetadata(locale);
  const url = `${canonicalUrl}/${locale === "ja" ? "" : `${locale}/`}${suffix}`;
  const fullTitle = `${seoTitle} | ${siteTitle(locale)}`;
  const image = ogImage(imagePath, `/images/og/profile-${locale}.png`);
  return {
    ...base,
    title: seoTitle,
    description,
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
      ...base.openGraph,
      title: fullTitle,
      description,
      url,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          type: "image/png",
          alt: fullTitle,
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

export const fieldMetadata = (locale: Locale, slug: FieldSlug): Metadata =>
  buildMetadata(
    locale,
    `fields/${slug}/`,
    fieldCopy[locale][slug].seoTitle,
    fieldCopy[locale][slug].seoDescription,
    `/images/og/field-${slug}-${locale}.png`,
  );

export const fieldsHubMetadata = (locale: Locale): Metadata =>
  buildMetadata(
    locale,
    "fields/",
    fieldsHub[locale].seoTitle,
    fieldsHub[locale].seoDescription,
    `/images/og/profile-${locale}.png`,
  );

export const topicMetadata = (
  locale: Locale,
  slug: FieldSlug,
  id: string,
): Metadata => {
  const topic = careTopics[slug].find((item) => item.id === id)!;
  const seo = topicSeo(locale, slug, topic);
  return buildMetadata(
    locale,
    `fields/${slug}/${id}/`,
    seo.title,
    seo.description,
    `/images/og/field-${slug}-${locale}.png`,
  );
};
