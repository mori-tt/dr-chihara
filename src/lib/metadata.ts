import type { Metadata } from "next";
import { content, type Locale, asset } from "./content";
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://mori-tt.github.io/dr-chihara";
export function pageMetadata(locale: Locale): Metadata {
  const copy = content[locale];
  const url = `${siteUrl}/${locale === "ja" ? "" : `${locale}/`}`;
  return {
    title: copy.title,
    description: copy.description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: url,
      languages: {
        ja: `${siteUrl}/`,
        en: `${siteUrl}/en/`,
        "zh-Hans": `${siteUrl}/zh/`,
        "x-default": `${siteUrl}/`,
      },
    },
    openGraph: {
      type: "website",
      title: copy.title,
      description: copy.description,
      url,
      siteName: "Yoshitomo Chihara",
      locale: locale === "zh" ? "zh_CN" : locale === "ja" ? "ja_JP" : "en_US",
      images: [
        {
          url: `${siteUrl}/images/portrait.webp`,
          width: 767,
          height: 651,
          alt: copy.portraitAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
      images: [`${siteUrl}/images/portrait.webp`],
    },
    icons: { icon: asset("/icon.svg") },
  };
}
export function personSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    inLanguage: locale === "zh" ? "zh-Hans" : locale,
    mainEntity: {
      "@type": "Person",
      name: "千原良友",
      alternateName: "Yoshitomo Chihara",
      jobTitle: content[locale].role,
      url: `${siteUrl}/${locale === "ja" ? "" : `${locale}/`}`,
      image: `${siteUrl}/images/portrait.webp`,
      worksFor: {
        "@type": "MedicalClinic",
        name: "ノリス美容クリニック",
        url: "https://www.norris-beauty-clinic.com/",
      },
      sameAs: ["https://www.norris-beauty-clinic.com/doctor/"],
    },
  };
}
