import { notFound } from "next/navigation";
import { TopicPage } from "@/components/topic-page";
import { allTopics, findTopic } from "@/lib/care-topics";
import { topicMetadata } from "@/lib/field-metadata";
import type { FieldSlug } from "@/lib/fields";
export const dynamicParams = false;
export function generateStaticParams() {
  return ["en", "zh"].flatMap((lang) =>
    allTopics().map(({ slug, topic }) => ({ lang, slug, topic: topic.id })),
  );
}
type Props = { params: Promise<{ lang: string; slug: string; topic: string }> };
export async function generateMetadata({ params }: Props) {
  const { lang, slug, topic } = await params;
  if ((lang !== "en" && lang !== "zh") || !findTopic(slug, topic)) notFound();
  return topicMetadata(lang, slug as FieldSlug, topic);
}
export default async function Page({ params }: Props) {
  const { lang, slug, topic } = await params;
  if ((lang !== "en" && lang !== "zh") || !findTopic(slug, topic)) notFound();
  return <TopicPage locale={lang} slug={slug as FieldSlug} id={topic} />;
}
