import type { Metadata } from "next";
import { type Locale } from "./content";
import { fieldCopy, type FieldSlug } from "./fields";
import { ogImage, pageMetadata, rssLink, siteTitle, siteUrl } from "./metadata";

export function fieldMetadata(locale: Locale, slug: FieldSlug): Metadata {
  const copy = fieldCopy[locale][slug];
  const url = `${siteUrl}/${locale === "ja" ? "" : `${locale}/`}fields/${slug}/`;
  const fullTitle = `${copy.title} | ${siteTitle(locale)}`;
  const image = ogImage(
    `/images/og/field-${slug}-${locale}.png`,
    `/images/og/profile-${locale}.png`,
  );
  return {
    ...pageMetadata(locale),
    title: copy.title,
    description: copy.lead,
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
      ...pageMetadata(locale).openGraph,
      title: fullTitle,
      description: copy.lead,
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
      description: copy.lead,
      images: [image],
    },
  };
}
