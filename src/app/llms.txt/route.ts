import { canonicalUrl } from "@/lib/metadata";
import { fieldCopy, fieldSlugs } from "@/lib/fields";
import { careCheckedAt, careTopics } from "@/lib/care-guide";
import { publishedDialogues } from "@/lib/dialogues";

export const dynamic = "force-static";

/**
 * llms.txt — a machine-readable index for AI search assistants
 * (https://llmstxt.org). Generated from the same data as the pages so it
 * stays in sync automatically.
 */
export function GET() {
  const url = (path: string) => `${canonicalUrl}/${path}`;
  const lines: string[] = [
    "# Yoshitomo Chihara — 千原良友",
    "",
    `> Personal website of Dr. Yoshitomo Chihara, physician & PhD, director of Norris Beauty Clinic (Uehommachi, Osaka, Japan). Trilingual guides to aesthetic medicine, regenerative medicine and urology, written for patients and reviewed against the clinic's official information (checked ${careCheckedAt}).`,
    "",
    "Every page exists in three languages: Japanese (paths below), English (`/en/` prefix) and Simplified Chinese (`/zh/` prefix).",
    "",
    "## Profile",
    `- [千原良友 | Yoshitomo Chihara](${url("")}): biography, credentials and the clinic overview`,
    `- [人間交差点 / Human Crossroads](${url("dialogues/")}): interview series index`,
    ...publishedDialogues().map(
      (article) =>
        `- [${article.translations.ja.title}](${url(`dialogues/${article.slug}/`)}): interview article`,
    ),
    "",
    "## Areas of practice",
    `- [診療のフィールド / Areas of practice](${url("fields/")}): hub for the three fields`,
  ];
  for (const slug of fieldSlugs) {
    const field = fieldCopy.ja[slug];
    lines.push(
      `- [${field.title} / ${field.eyebrow.toLowerCase()}](${url(`fields/${slug}/`)}): ${field.lead}`,
    );
    for (const topic of careTopics[slug]) {
      lines.push(
        `  - [${topic.title.ja}](${url(`fields/${slug}/${topic.id}/`)}): ${topic.concern.ja}`,
      );
    }
  }
  lines.push(
    "",
    "## Clinic",
    "- Norris Beauty Clinic: https://www.norris-beauty-clinic.com/ (Japanese)",
    "- Booking: https://www.norris-beauty-clinic.com/reserve/ (Japanese)",
    "- Address: 4F Ueroku-Toki Bldg, 18-21 Ishigatsuji-cho, Tennoji-ku, Osaka 543-0031, Japan",
    "- Hours: Wed–Sun 10:30–19:00 JST, closed Mon & Tue — Tel +81-6-6772-3456",
    "",
  );
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
