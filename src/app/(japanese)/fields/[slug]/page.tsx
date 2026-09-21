import { notFound } from "next/navigation";
import { FieldPage } from "@/components/field-page";
import { fieldCopy, fieldSlugs, type FieldSlug } from "@/lib/fields";
import { pageMetadata } from "@/lib/metadata";
export const dynamicParams = false;
export function generateStaticParams() {
  return fieldSlugs.map((slug) => ({ slug }));
}
export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return params.then(({ slug }) =>
    fieldSlugs.includes(slug as FieldSlug)
      ? {
          ...pageMetadata("ja"),
          title: `${fieldCopy.ja[slug as FieldSlug].title} | 千原良友`,
          description: fieldCopy.ja[slug as FieldSlug].lead,
        }
      : notFound(),
  );
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
