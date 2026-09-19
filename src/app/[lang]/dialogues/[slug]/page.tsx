import { notFound } from "next/navigation";
import { DialogueArticle } from "@/components/dialogues";
import { dialogues, getDialogue } from "@/lib/dialogues";
import { dialogueMetadata } from "@/lib/dialogue-metadata";
export const dynamicParams = false;
export function generateStaticParams() {
  return ["en", "zh"].flatMap((lang) =>
    dialogues.map(({ slug }) => ({ lang, slug })),
  );
}
type Props = { params: Promise<{ lang: string; slug: string }> };
export async function generateMetadata({ params }: Props) {
  const { lang, slug } = await params;
  const article = getDialogue(slug);
  if ((lang !== "en" && lang !== "zh") || !article) notFound();
  return dialogueMetadata(lang, article);
}
export default async function Page({ params }: Props) {
  const { lang, slug } = await params;
  const article = getDialogue(slug);
  if ((lang !== "en" && lang !== "zh") || !article) notFound();
  return <DialogueArticle locale={lang} article={article} />;
}
