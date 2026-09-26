import { notFound } from "next/navigation";
import { FieldPage } from "@/components/field-page";
import { fieldMetadata } from "@/lib/field-metadata";
import { fieldSlugs, type FieldSlug } from "@/lib/fields";
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
  return fieldMetadata(lang, slug as FieldSlug);
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
