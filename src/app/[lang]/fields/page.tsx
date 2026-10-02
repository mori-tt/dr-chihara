import { notFound } from "next/navigation";
import { FieldsIndex } from "@/components/fields-index";
import { fieldsHubMetadata } from "@/lib/field-metadata";
export const dynamicParams = false;
export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "zh" }];
}
type Props = { params: Promise<{ lang: string }> };
export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  if (lang !== "en" && lang !== "zh") notFound();
  return fieldsHubMetadata(lang);
}
export default async function Page({ params }: Props) {
  const { lang } = await params;
  if (lang !== "en" && lang !== "zh") notFound();
  return <FieldsIndex locale={lang} />;
}
