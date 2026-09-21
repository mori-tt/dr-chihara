import { notFound } from "next/navigation";
import { FieldPage } from "@/components/field-page";
import { fieldCopy, fieldSlugs, type FieldSlug } from "@/lib/fields";
import { pageMetadata, siteUrl } from "@/lib/metadata";
export const dynamicParams = false;
export function generateStaticParams() {
  return ["en", "zh"].flatMap((lang) =>
    fieldSlugs.map((slug) => ({ lang, slug })),
  );
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (
    (lang !== "en" && lang !== "zh") ||
    !fieldSlugs.includes(slug as FieldSlug)
  )
    notFound();
  const locale = lang as "en" | "zh";
  const copy = fieldCopy[locale][slug as FieldSlug];
  const url = `${siteUrl}/${lang}/fields/${slug}/`;
  return {
    ...pageMetadata(locale),
    title: `${copy.title} | Yoshitomo Chihara`,
    description: copy.lead,
    alternates: {
      canonical: url,
      languages: {
        ja: `${siteUrl}/fields/${slug}/`,
        en: `${siteUrl}/en/fields/${slug}/`,
        "zh-Hans": `${siteUrl}/zh/fields/${slug}/`,
        "x-default": `${siteUrl}/fields/${slug}/`,
      },
    },
    openGraph: {
      ...pageMetadata(locale).openGraph,
      title: `${copy.title} | Yoshitomo Chihara`,
      description: copy.lead,
      url,
    },
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (
    (lang !== "en" && lang !== "zh") ||
    !fieldSlugs.includes(slug as FieldSlug)
  )
    notFound();
  return <FieldPage locale={lang as "en" | "zh"} slug={slug as FieldSlug} />;
}
