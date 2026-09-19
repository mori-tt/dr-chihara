import { DialogueIndex } from "@/components/dialogues";
import { dialogueMetadata } from "@/lib/dialogue-metadata";
export const metadata = dialogueMetadata("ja");
export default function Page() {
  return <DialogueIndex locale="ja" />;
}
