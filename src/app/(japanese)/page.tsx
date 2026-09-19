import { Site } from "@/components/site";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("ja");
export default function Page() {
  return <Site locale="ja" />;
}
