import { notFound } from "next/navigation";
import { FieldPage } from "@/components/field-page";
import { fieldCopy, fieldSlugs, type FieldSlug } from "@/lib/fields";
import { pageMetadata } from "@/lib/metadata";
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
  return {
    ...pageMetadata(locale),
    title: `${fieldCopy[locale][slug as FieldSlug].title} | Yoshitomo Chihara`,
    description: fieldCopy[locale][slug as FieldSlug].lead,
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
