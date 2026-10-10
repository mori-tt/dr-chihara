import { notFound } from "next/navigation";
import { DialogueIndex } from "@/components/dialogues";
import { dialogueMetadata } from "@/lib/dialogue-metadata";
import { dialoguesEnabled } from "@/lib/dialogues";
export const metadata = dialogueMetadata("ja");
export default function Page() {
  if (!dialoguesEnabled) notFound();
  return <DialogueIndex locale="ja" />;
}
