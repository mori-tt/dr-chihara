import { notFound } from "next/navigation";
import { TopicPage } from "@/components/topic-page";
import { allTopics, findTopic } from "@/lib/care-topics";
import { topicMetadata } from "@/lib/field-metadata";
import type { FieldSlug } from "@/lib/fields";
export const dynamicParams = false;
export function generateStaticParams() {
  return allTopics().map(({ slug, topic }) => ({ slug, topic: topic.id }));
}
type Props = { params: Promise<{ slug: string; topic: string }> };
export async function generateMetadata({ params }: Props) {
  const { slug, topic } = await params;
  if (!findTopic(slug, topic)) notFound();
  return topicMetadata("ja", slug as FieldSlug, topic);
}
export default async function Page({ params }: Props) {
  const { slug, topic } = await params;
  if (!findTopic(slug, topic)) notFound();
  return <TopicPage locale="ja" slug={slug as FieldSlug} id={topic} />;
}
