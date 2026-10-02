import { localePath, type Locale } from "@/lib/content";
import { careCheckedAt } from "@/lib/care-guide";
import { careUi as ui } from "@/lib/care-support";

/**
 * Visible authorship/review line for the medical guide pages, matching the
 * reviewedBy/lastReviewed values already declared in the JSON-LD graph.
 */
export function CareByline({ locale }: { locale: Locale }) {
  const colon = locale === "en" ? ": " : "：";
  return (
    <p className="care-byline">
      <span>
        {ui.byline[locale]}
        {locale === "en" ? " " : "："}
        <a href={`${localePath(locale)}#about`}>{ui.authorName[locale]}</a>
        {locale === "en" ? ", " : "（"}
        <span className="care-byline-role">
          {ui.authorRole[locale]}
          {locale === "en" ? "" : "）"}
        </span>
      </span>
      <span className="care-byline-date">
        {ui.checked[locale]}
        {colon}
        <time dateTime={careCheckedAt}>{careCheckedAt}</time>
      </span>
    </p>
  );
}
