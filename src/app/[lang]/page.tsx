import { notFound } from "next/navigation";
import { Site } from "@/components/site";
import { pageMetadata } from "@/lib/metadata";
export const dynamicParams = false;
export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "zh" }];
}
type Props = { params: Promise<{ lang: string }> };
export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  return pageMetadata(lang === "zh" ? "zh" : "en");
}
export default async function Page({ params }: Props) {
  const { lang } = await params;
  if (lang !== "en" && lang !== "zh") notFound();
  return <Site locale={lang} />;
}
