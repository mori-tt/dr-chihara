import { notFound } from "next/navigation";
import { FieldPage } from "@/components/field-page";
import { fieldCopy, fieldSlugs, type FieldSlug } from "@/lib/fields";
import { pageMetadata, siteUrl } from "@/lib/metadata";
export const dynamicParams = false;
export function generateStaticParams() {
  return fieldSlugs.map((slug) => ({ slug }));
}
export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return params.then(({ slug }) => {
    if (!fieldSlugs.includes(slug as FieldSlug)) return notFound();
    const copy = fieldCopy.ja[slug as FieldSlug];
    const url = `${siteUrl}/fields/${slug}/`;
    return {
      ...pageMetadata("ja"),
      title: `${copy.title} | 千原良友`,
      description: copy.lead,
      alternates: {
        canonical: url,
        languages: {
          ja: url,
          en: `${siteUrl}/en/fields/${slug}/`,
          "zh-Hans": `${siteUrl}/zh/fields/${slug}/`,
          "x-default": url,
        },
      },
      openGraph: {
        ...pageMetadata("ja").openGraph,
        title: `${copy.title} | 千原良友`,
        description: copy.lead,
        url,
      },
    };
  });
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!fieldSlugs.includes(slug as FieldSlug)) notFound();
  return <FieldPage locale="ja" slug={slug as FieldSlug} />;
}
