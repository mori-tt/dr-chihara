"use client";
import { content, type Locale } from "@/lib/content";
export function Journey({ locale }: { locale: Locale }) {
  const c = content[locale];
  return (
    <div className="journey-list">
      <div id="career-entries">
        {c.journey.map(([year, title, description]) => (
          <article
            className={`career-row ${year === "2022" ? "current" : ""}`}
            key={year}
          >
            <span className="career-year">
              {year}
              <span className="career-dot" />
            </span>
            <div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
            {year === "2022" && <span className="now">NOW</span>}
          </article>
        ))}
      </div>
    </div>
  );
}
