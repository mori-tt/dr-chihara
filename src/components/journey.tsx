"use client";
import { useState } from "react";
import { content, type Locale } from "@/lib/content";
export function Journey({ locale }: { locale: Locale }) {
  // The full career is a central part of Dr. Chihara's profile, so it is
  // visible on first load. Visitors can still collapse it for a shorter view.
  const [expanded, setExpanded] = useState(true);
  const c = content[locale];
  const featured = ["1999", "2007", "2010", "2019", "2022"];
  return (
    <div className="journey-list">
      <div id="career-entries">
        {c.journey
          .filter((row) => expanded || featured.includes(row[0]))
          .map(([year, title, description]) => (
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
      <button
        className="text-link career-toggle"
        aria-expanded={expanded}
        aria-controls="career-entries"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? c.hideJourney : c.allJourney}
        <span aria-hidden="true">{expanded ? "−" : "+"}</span>
      </button>
    </div>
  );
}
