import type { Metadata } from "next";
import { existsSync } from "node:fs";
import path from "node:path";
import {
  content,
  type Locale,
  asset,
  clinicReserveUrl,
  clinicUrl,
} from "./content";
import { fieldCopy, type FieldSlug } from "./fields";
import { careCheckedAt, careTopics } from "./care-guide";
import { careFaq } from "./care-support";
import { dialogueCopy, type Dialogue } from "./dialogues";
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://mori-tt.github.io/dr-chihara";
/**
 * Canonical (public identity) base URL for canonical/hreflang/OG/schema URLs.
 * Defaults to siteUrl. Set NEXT_PUBLIC_CANONICAL_URL so staging deployments
 * (e.g. GitHub Pages, which emits noindex) consolidate ranking signals to the
 * production domain. siteUrl itself stays the deployment host and is used for
 * this host's own files (robots.txt, sitemap.xml, RSS feed).
 */
export const canonicalUrl = process.env.NEXT_PUBLIC_CANONICAL_URL || siteUrl;
const personId = `${canonicalUrl}/#person`;
const clinicId = `${clinicUrl}/#clinic`;
const localeUrl = (locale: Locale, suffix = "") =>
  `${canonicalUrl}/${locale === "ja" ? "" : `${locale}/`}${suffix}`;

/** Keep this in sync with the most recent editorial change when publishing. */
export const siteLastModified =
  process.env.NEXT_PUBLIC_SITE_LAST_MODIFIED || "2026-09-27";

/**
 * Set NEXT_PUBLIC_NOINDEX=1 for staging/preview builds (e.g. GitHub Pages)
 * so search engines drop that host from the index while still being able
 * to crawl and see the canonical URL of the production site.
 */
export const siteNoindex = process.env.NEXT_PUBLIC_NOINDEX === "1";

export const siteTitle = (locale: Locale) =>
  locale === "ja" ? "千原良友" : "Yoshitomo Chihara";

// The feed file lives on the deployment host, so it uses siteUrl (not canonicalUrl).
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
  `${canonicalUrl}${
    existsSync(path.join(process.cwd(), "public", preferred))
      ? preferred
      : fallback
  }`;

export function pageMetadata(locale: Locale): Metadata {
  const copy = content[locale];
  const url = localeUrl(locale);
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
    metadataBase: new URL(canonicalUrl),
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
        ja: `${canonicalUrl}/`,
        en: `${canonicalUrl}/en/`,
        "zh-Hans": `${canonicalUrl}/zh/`,
        "x-default": `${canonicalUrl}/`,
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
          url: `${canonicalUrl}/images/og/profile-${locale}.png`,
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
      images: [`${canonicalUrl}/images/og/profile-${locale}.png`],
    },
    icons: {
      icon: [
        { url: asset("/favicon.ico"), sizes: "any" },
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
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${canonicalUrl}/#website`,
    name: "Yoshitomo Chihara",
    alternateName: "千原良友",
    url: canonicalUrl,
    inLanguage: ["ja", "en", "zh-Hans"],
    publisher: { "@id": personId },
    about: { "@id": personId },
  };
}

const clinicAddress = {
  "@type": "PostalAddress",
  postalCode: "543-0031",
  addressRegion: "大阪府",
  addressLocality: "大阪市天王寺区",
  streetAddress: "石ケ辻町18−21 上六ときビル4階",
  addressCountry: "JP",
};

export function personSchema(locale: Locale) {
  const profileUrl = localeUrl(locale);
  const specialties =
    locale === "ja"
      ? ["泌尿器科", "再生医療", "美容医療", "分子病理学"]
      : locale === "zh"
        ? ["泌尿科", "再生医学", "美容医学", "分子病理学"]
        : [
            "urology",
            "regenerative medicine",
            "aesthetic medicine",
            "molecular pathology",
          ];
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${profileUrl}#profile`,
    url: profileUrl,
    inLanguage: localeLanguage(locale),
    dateModified: siteLastModified,
    isPartOf: { "@id": `${canonicalUrl}/#website` },
    mainEntity: {
      "@id": personId,
      "@type": "Person",
      name: "千原良友",
      alternateName: ["Yoshitomo Chihara", "千原 良友"],
      honorificPrefix: "Dr.",
      givenName: locale === "en" ? "Yoshitomo" : "良友",
      familyName: locale === "en" ? "Chihara" : "千原",
      jobTitle: content[locale].role,
      hasOccupation: {
        "@type": "Occupation",
        name: locale === "ja" ? "医師" : locale === "zh" ? "医师" : "Physician",
      },
      url: profileUrl,
      image: [
        `${canonicalUrl}/images/portrait.webp`,
        `${canonicalUrl}/images/og/profile-${locale}.png`,
      ],
      description: content[locale].description,
      knowsAbout: specialties,
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "奈良県立医科大学",
        alternateName: "Nara Medical University",
      },
      hasCredential: content[locale].credentials.map((name) => ({
        "@type": "EducationalOccupationalCredential",
        name,
      })),
      memberOf: {
        "@type": "Organization",
        name: "日本再生医療学会",
        alternateName: "Japanese Society for Regenerative Medicine",
      },
      worksFor: { "@id": clinicId },
      workLocation: { "@type": "Place", address: clinicAddress },
      sameAs: [`${clinicUrl}/doctor/`],
    },
  };
}

export function clinicSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": clinicId,
    name: "ノリス美容クリニック",
    alternateName: "Norris Beauty Clinic",
    url: `${clinicUrl}/`,
    telephone: "+81-6-6772-3456",
    image: `${canonicalUrl}/images/reception.webp`,
    address: clinicAddress,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "10:30",
      closes: "19:00",
    },
    medicalSpecialty: [
      "https://schema.org/Dermatology",
      "https://schema.org/PlasticSurgery",
      "https://schema.org/Urologic",
    ],
    // Coordinates from the clinic's own map embed (norris-beauty-clinic.com/access/).
    geo: {
      "@type": "GeoCoordinates",
      latitude: 34.664259,
      longitude: 135.520492,
    },
    hasMap:
      "https://www.google.com/maps/search/?api=1&query=Norris+Beauty+Clinic+Osaka",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+81-6-6772-3456",
      contactType: "reservations",
      availableLanguage: "Japanese",
    },
    sameAs: ["https://www.instagram.com/norris_beautyclinic/"],
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: clinicReserveUrl,
        inLanguage: "ja",
        actionPlatform: [
          "https://schema.org/DesktopWebPlatform",
          "https://schema.org/MobileWebPlatform",
        ],
      },
    },
    founder: { "@id": personId },
    employee: { "@id": personId },
  };
}

export function articleSchema(locale: Locale, article: Dialogue) {
  const t = article.translations[locale];
  const url = localeUrl(locale, `dialogues/${article.slug}/`);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: t.title,
    description: t.introduction,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    inLanguage: localeLanguage(locale),
    image: `${canonicalUrl}${article.cover}`,
    author: { "@id": personId, "@type": "Person", name: "千原良友" },
    publisher: {
      "@type": "Organization",
      name: "Yoshitomo Chihara",
      url: canonicalUrl,
      logo: {
        "@type": "ImageObject",
        url: `${canonicalUrl}/icon.png`,
        width: 512,
        height: 512,
      },
    },
    articleSection: t.category,
    mainEntityOfPage: url,
    isPartOf: { "@id": `${canonicalUrl}/#website` },
    isAccessibleForFree: true,
    wordCount:
      t.introduction.length +
      t.sections
        .flatMap((s) => s.exchanges.flatMap((e) => [e.question, ...e.answer]))
        .join("").length,
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
        ? { item: localeUrl(locale, item.path) }
        : {}),
    })),
  };
}

export function medicalWebPageSchema(locale: Locale, slug: FieldSlug) {
  const c = fieldCopy[locale][slug];
  const url = localeUrl(locale, `fields/${slug}/`);
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "@id": `${url}#webpage`,
    url,
    name: `${c.seoTitle} | ${siteTitle(locale)}`,
    headline: c.title,
    description: c.seoDescription,
    inLanguage: localeLanguage(locale),
    lastReviewed: careCheckedAt,
    dateModified: careCheckedAt,
    author: { "@id": personId },
    reviewedBy: {
      "@type": "Person",
      "@id": personId,
      name: "千原良友 / Yoshitomo Chihara",
      url: localeUrl(locale),
    },
    about: { "@type": "MedicalEntity", name: c.title },
    medicalAudience: { "@type": "MedicalAudience", audienceType: "Patient" },
    significantLink: c.officialUrl,
    isAccessibleForFree: true,
    isPartOf: { "@id": `${canonicalUrl}/#website` },
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
  const url = localeUrl(locale, `fields/${slug}/`);
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
  const url = localeUrl(locale, "dialogues/");
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#collection`,
    url,
    name: copy.label,
    description: copy.intro,
    inLanguage: localeLanguage(locale),
    isPartOf: { "@id": `${canonicalUrl}/#website` },
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
