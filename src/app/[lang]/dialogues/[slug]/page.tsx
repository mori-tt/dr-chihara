import { notFound } from "next/navigation";
import { DialogueArticle } from "@/components/dialogues";
import { dialogues, getDialogue } from "@/lib/dialogues";
import { dialogueMetadata } from "@/lib/dialogue-metadata";
export const dynamicParams = false;
export function generateStaticParams() {
  // "output: export" rejects an empty list; the placeholder 404s in the page.
  const slugs = dialogues.length ? dialogues.map(({ slug }) => slug) : ["_"];
  return ["en", "zh"].flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
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
