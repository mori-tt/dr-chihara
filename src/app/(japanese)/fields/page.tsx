import { FieldsIndex } from "@/components/fields-index";
import { fieldsHubMetadata } from "@/lib/field-metadata";
export const metadata = fieldsHubMetadata("ja");
export default function Page() {
  return <FieldsIndex locale="ja" />;
}
