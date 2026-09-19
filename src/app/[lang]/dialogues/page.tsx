import { notFound } from "next/navigation";
import { DialogueIndex } from "@/components/dialogues";
import { dialogueMetadata } from "@/lib/dialogue-metadata";
export const dynamicParams = false;
export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "zh" }];
}
type Props = { params: Promise<{ lang: string }> };
export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  if (lang !== "en" && lang !== "zh") notFound();
  return dialogueMetadata(lang);
}
export default async function Page({ params }: Props) {
  const { lang } = await params;
  if (lang !== "en" && lang !== "zh") notFound();
  return <DialogueIndex locale={lang} />;
}
