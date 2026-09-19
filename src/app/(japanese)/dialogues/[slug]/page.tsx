import { notFound } from "next/navigation";
import { DialogueArticle } from "@/components/dialogues";
import { dialogues, getDialogue } from "@/lib/dialogues";
import { dialogueMetadata } from "@/lib/dialogue-metadata";
export const dynamicParams = false;
export function generateStaticParams() {
  return dialogues.map(({ slug }) => ({ slug }));
}
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = getDialogue(slug);
  if (!article) notFound();
  return dialogueMetadata("ja", article);
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const article = getDialogue(slug);
  if (!article) notFound();
  return <DialogueArticle locale="ja" article={article} />;
}
