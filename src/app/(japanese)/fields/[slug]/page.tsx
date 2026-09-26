import { notFound } from "next/navigation";
import { FieldPage } from "@/components/field-page";
import { fieldMetadata } from "@/lib/field-metadata";
import { fieldSlugs, type FieldSlug } from "@/lib/fields";
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
    return fieldMetadata("ja", slug as FieldSlug);
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
