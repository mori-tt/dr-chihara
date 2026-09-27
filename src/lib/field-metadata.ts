import type { Metadata } from "next";
import { type Locale } from "./content";
import { fieldCopy, type FieldSlug } from "./fields";
import { ogImage, pageMetadata, rssLink, siteTitle, siteUrl } from "./metadata";

export function fieldMetadata(locale: Locale, slug: FieldSlug): Metadata {
  const copy = fieldCopy[locale][slug];
  const base = pageMetadata(locale);
  const url = `${siteUrl}/${locale === "ja" ? "" : `${locale}/`}fields/${slug}/`;
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
        ja: `${siteUrl}/fields/${slug}/`,
        en: `${siteUrl}/en/fields/${slug}/`,
        "zh-Hans": `${siteUrl}/zh/fields/${slug}/`,
        "x-default": `${siteUrl}/fields/${slug}/`,
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
