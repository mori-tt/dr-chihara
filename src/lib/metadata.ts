import type { Metadata } from "next";
import { content, type Locale, asset } from "./content";
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://mori-tt.github.io/dr-chihara";

/** Keep this in sync with the most recent editorial change when publishing. */
export const siteLastModified =
  process.env.NEXT_PUBLIC_SITE_LAST_MODIFIED || "2026-09-21";

const localeLanguage = (locale: Locale) =>
  locale === "zh" ? "zh-Hans" : locale;

export function pageMetadata(locale: Locale): Metadata {
  const copy = content[locale];
  const url = `${siteUrl}/${locale === "ja" ? "" : `${locale}/`}`;
  return {
    title: copy.title,
    description: copy.description,
    authors: [{ name: "千原良友 / Yoshitomo Chihara", url }],
    creator: "Yoshitomo Chihara",
    publisher: "Yoshitomo Chihara",
    category: "medical",
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
      alternateLocale:
        locale === "ja"
          ? ["en_US", "zh_CN"]
          : locale === "en"
            ? ["ja_JP", "zh_CN"]
            : ["ja_JP", "en_US"],
      images: [
        {
          url: `${siteUrl}/images/og/profile-${locale}.png`,
          width: 1200,
          height: 630,
          alt: copy.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
      images: [`${siteUrl}/images/og/profile-${locale}.png`],
    },
    icons: { icon: asset("/icon.svg") },
  };
}
export function personSchema(locale: Locale) {
  const language = localeLanguage(locale);
  const profileUrl = `${siteUrl}/${locale === "ja" ? "" : `${locale}/`}`;
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${profileUrl}#profile`,
    inLanguage: language,
    dateModified: siteLastModified,
    mainEntity: {
      "@id": `${siteUrl}/#person`,
      "@type": "Person",
      name: "千原良友",
      alternateName: "Yoshitomo Chihara",
      jobTitle: content[locale].role,
      url: profileUrl,
      image: [
        `${siteUrl}/images/portrait.webp`,
        `${siteUrl}/images/og/profile-${locale}.png`,
      ],
      description: content[locale].description,
      knowsAbout:
        locale === "ja"
          ? ["泌尿器科", "再生医療", "美容医療", "分子病理学"]
          : locale === "zh"
            ? ["泌尿科", "再生医学", "美容医学", "分子病理学"]
            : [
                "urology",
                "regenerative medicine",
                "aesthetic medicine",
                "molecular pathology",
              ],
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "奈良県立医科大学",
      },
      hasCredential: content[locale].credentials.map((name) => ({
        "@type": "EducationalOccupationalCredential",
        name,
      })),
      worksFor: {
        "@type": "MedicalClinic",
        name: "ノリス美容クリニック",
        url: "https://www.norris-beauty-clinic.com/",
      },
      sameAs: ["https://www.norris-beauty-clinic.com/doctor/"],
    },
  };
}

export function breadcrumbSchema(
  locale: Locale,
  items: Array<{ name: string; path?: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path !== undefined
        ? {
            item: `${siteUrl}/${locale === "ja" ? "" : `${locale}/`}${item.path}`,
          }
        : {}),
    })),
  };
}
