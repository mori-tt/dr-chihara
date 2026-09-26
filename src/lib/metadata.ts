import type { Metadata } from "next";
import { existsSync } from "node:fs";
import path from "node:path";
import { content, type Locale, asset } from "./content";
import { fieldCopy, type FieldSlug } from "./fields";
import { careCheckedAt, careTopics } from "./care-guide";
import { careFaq } from "./care-support";
import { dialogueCopy, type Dialogue } from "./dialogues";
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://mori-tt.github.io/dr-chihara";

/** Keep this in sync with the most recent editorial change when publishing. */
export const siteLastModified =
  process.env.NEXT_PUBLIC_SITE_LAST_MODIFIED || "2026-09-21";

/**
 * Set NEXT_PUBLIC_NOINDEX=1 for staging/preview builds (e.g. GitHub Pages)
 * so search engines drop that host from the index while still being able
 * to crawl and see the canonical URL of the production site.
 */
export const siteNoindex = process.env.NEXT_PUBLIC_NOINDEX === "1";

export const siteTitle = (locale: Locale) =>
  locale === "ja" ? "千原良友" : "Yoshitomo Chihara";

export const feedUrl = (locale: Locale) =>
  `${siteUrl}/${locale === "ja" ? "" : `${locale}/`}feed.xml`;

export const rssLink = (locale: Locale) => ({
  "application/rss+xml": [
    { url: feedUrl(locale), title: `${dialogueCopy[locale].label} — RSS` },
  ],
});

const localeLanguage = (locale: Locale) =>
  locale === "zh" ? "zh-Hans" : locale;

export const ogLocales = (locale: Locale) => ({
  locale: locale === "zh" ? "zh_CN" : locale === "ja" ? "ja_JP" : "en_US",
  alternateLocale:
    locale === "ja"
      ? ["en_US", "zh_CN"]
      : locale === "en"
        ? ["ja_JP", "zh_CN"]
        : ["ja_JP", "en_US"],
});

/** Prefer a generated card when it exists; fall back to a plain image path. */
export const ogImage = (preferred: string, fallback: string) =>
  `${siteUrl}${
    existsSync(path.join(process.cwd(), "public", preferred))
      ? preferred
      : fallback
  }`;

export function pageMetadata(locale: Locale): Metadata {
  const copy = content[locale];
  const url = `${siteUrl}/${locale === "ja" ? "" : `${locale}/`}`;
  const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;
  return {
    title: { absolute: copy.title },
    description: copy.description,
    authors: [{ name: "千原良友 / Yoshitomo Chihara", url }],
    creator: "Yoshitomo Chihara",
    publisher: "Yoshitomo Chihara",
    category: "medical",
    robots: {
      index: !siteNoindex,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    metadataBase: new URL(siteUrl),
    ...(googleVerification || bingVerification
      ? {
          verification: {
            ...(googleVerification ? { google: googleVerification } : {}),
            ...(bingVerification
              ? { other: { "msvalidate.01": bingVerification } }
              : {}),
          },
        }
      : {}),
    alternates: {
      canonical: url,
      languages: {
        ja: `${siteUrl}/`,
        en: `${siteUrl}/en/`,
        "zh-Hans": `${siteUrl}/zh/`,
        "x-default": `${siteUrl}/`,
      },
      types: rssLink(locale),
    },
    openGraph: {
      type: "website",
      title: copy.title,
      description: copy.description,
      url,
      siteName: "Yoshitomo Chihara",
      ...ogLocales(locale),
      images: [
        {
          url: `${siteUrl}/images/og/profile-${locale}.png`,
          width: 1200,
          height: 630,
          type: "image/png",
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
    icons: {
      icon: [
        { url: asset("/icon.svg"), type: "image/svg+xml" },
        { url: asset("/icon.png"), sizes: "512x512", type: "image/png" },
      ],
      apple: asset("/apple-touch-icon.png"),
    },
    appleWebApp: {
      capable: true,
      title: siteTitle(locale),
      statusBarStyle: "default",
    },
  };
}
export function websiteSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: "Yoshitomo Chihara",
    alternateName: "千原良友",
    url: siteUrl,
    inLanguage: ["ja", "en", "zh-Hans"],
    publisher: { "@id": `${siteUrl}/#person` },
    about: { "@id": `${siteUrl}/#person` },
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

export function clinicSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": "https://www.norris-beauty-clinic.com/#clinic",
    name: "ノリス美容クリニック",
    alternateName: "Norris Beauty Clinic",
    url: "https://www.norris-beauty-clinic.com/",
    telephone: "+81-6-6772-3456",
    image: `${siteUrl}/images/reception.webp`,
    address: {
      "@type": "PostalAddress",
      postalCode: "543-0031",
      addressRegion: "大阪府",
      addressLocality: "大阪市天王寺区",
      streetAddress: "石ケ辻町18−21 上六ときビル4階",
      addressCountry: "JP",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "10:30",
      closes: "19:00",
    },
    medicalSpecialty: ["PlasticSurgery", "Urologic"],
    geo: {
      "@type": "GeoCoordinates",
      latitude: 34.65,
      longitude: 135.5167,
    },
    hasMap:
      "https://www.google.com/maps/search/?api=1&query=Norris+Beauty+Clinic+Osaka",
    employee: { "@id": `${siteUrl}/#person` },
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

export function medicalWebPageSchema(locale: Locale, slug: FieldSlug) {
  const c = fieldCopy[locale][slug];
  const url = `${siteUrl}/${locale === "ja" ? "" : `${locale}/`}fields/${slug}/`;
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "@id": `${url}#webpage`,
    url,
    name: `${c.title} | ${siteTitle(locale)}`,
    description: c.lead,
    inLanguage: localeLanguage(locale),
    lastReviewed: careCheckedAt,
    reviewedBy: {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "千原良友 / Yoshitomo Chihara",
      url: `${siteUrl}/${locale === "ja" ? "" : `${locale}/`}`,
    },
    about: { "@type": "MedicalEntity", name: c.title },
    medicalAudience: { "@type": "MedicalAudience", audienceType: "Patient" },
    significantLink: c.officialUrl,
    isAccessibleForFree: true,
    isPartOf: { "@id": `${siteUrl}/#website` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: careTopics[slug].map((topic, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${url}#${topic.id}`,
        name: topic.title[locale],
        item: {
          "@type": slug === "urology" ? "MedicalCondition" : "MedicalProcedure",
          name: topic.title[locale],
          description: topic.description[locale],
          url: `${url}#${topic.id}`,
        },
      })),
    },
  };
}

export function faqSchema(locale: Locale, slug: FieldSlug) {
  const url = `${siteUrl}/${locale === "ja" ? "" : `${locale}/`}fields/${slug}/`;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    inLanguage: localeLanguage(locale),
    isPartOf: { "@id": `${url}#webpage` },
    mainEntity: careFaq[slug].map((qa) => ({
      "@type": "Question",
      name: qa.question[locale],
      acceptedAnswer: { "@type": "Answer", text: qa.answer[locale] },
    })),
  };
}

export function collectionSchema(locale: Locale, articles: Dialogue[]) {
  const copy = dialogueCopy[locale];
  const url = `${siteUrl}/${locale === "ja" ? "" : `${locale}/`}dialogues/`;
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#collection`,
    url,
    name: copy.label,
    description: copy.intro,
    inLanguage: localeLanguage(locale),
    isPartOf: { "@id": `${siteUrl}/#website` },
    ...(articles.length
      ? {
          mainEntity: {
            "@type": "ItemList",
            itemListElement: articles.map((article, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `${url}${article.slug}/`,
              name: article.translations[locale].title,
            })),
          },
        }
      : {}),
  };
}
