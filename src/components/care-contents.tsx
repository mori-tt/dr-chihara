"use client";

import { useEffect, useRef, useState } from "react";

export function CareContents({
  links,
  label,
  contactLabel,
  contactUrl,
  newTabText,
}: {
  links: string[][];
  label: string;
  contactLabel: string;
  contactUrl: string;
  newTabText: string;
}) {
  const [active, setActive] = useState("");
  const list = useRef<HTMLOListElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = links[0][0];
      for (const [id] of links) {
        if (
          (document.getElementById(id)?.getBoundingClientRect().top ??
            Infinity) <= 230
        )
          current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [links]);
  useEffect(() => {
    const container = list.current;
    const link = container?.querySelector<HTMLElement>(
      '[aria-current="location"]',
    );
    if (!container || !link || container.scrollWidth <= container.clientWidth)
      return;
    const a = link.getBoundingClientRect(),
      b = container.getBoundingClientRect();
    if (a.left < b.left || a.right > b.right)
      container.scrollLeft += a.left - b.left - 8;
  }, [active]);
  return (
    <nav className="care-toc" aria-label={label}>
      <p className="eyebrow">GUIDE</p>
      <p className="care-toc-label">{label}</p>
      <ol ref={list}>
        {links.map(([id, text], index) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-current={id === active ? "location" : undefined}
            >
              <span aria-hidden="true">0{index + 1}</span>
              {text}
            </a>
          </li>
        ))}
      </ol>
      <a
        className="care-toc-contact"
        href={contactUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        {contactLabel}
        <span className="visually-hidden">{newTabText}</span>
        <span aria-hidden="true"> ↗</span>
      </a>
    </nav>
  );
}
