import type { Metadata } from "next";
import { type Locale } from "./content";
import { fieldCopy, type FieldSlug } from "./fields";
import {
  canonicalUrl,
  ogImage,
  pageMetadata,
  rssLink,
  siteTitle,
} from "./metadata";

export function fieldMetadata(locale: Locale, slug: FieldSlug): Metadata {
  const copy = fieldCopy[locale][slug];
  const base = pageMetadata(locale);
  const url = `${canonicalUrl}/${locale === "ja" ? "" : `${locale}/`}fields/${slug}/`;
  const fullTitle = `${copy.seoTitle} | ${siteTitle(locale)}`;
  const image = ogImage(
    `/images/og/field-${slug}-${locale}.png`,
    `/images/og/profile-${locale}.png`,
  );
  return {
    ...base,
    title: copy.seoTitle,
    description: copy.seoDescription,
    alternates: {
      canonical: url,
      languages: {
        ja: `${canonicalUrl}/fields/${slug}/`,
        en: `${canonicalUrl}/en/fields/${slug}/`,
        "zh-Hans": `${canonicalUrl}/zh/fields/${slug}/`,
        "x-default": `${canonicalUrl}/fields/${slug}/`,
      },
      types: rssLink(locale),
    },
    openGraph: {
      ...base.openGraph,
      title: fullTitle,
      description: copy.seoDescription,
      url,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          type: "image/png",
          alt: `${copy.title} | ${siteTitle(locale)}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: copy.seoDescription,
      images: [image],
    },
  };
}
