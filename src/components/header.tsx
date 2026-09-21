"use client";
import { useEffect, useRef, useState } from "react";
import { content, localePath, type Locale } from "@/lib/content";
import { dialogueCopy, dialoguePath } from "@/lib/dialogues";
import { fieldPath, type FieldSlug } from "@/lib/fields";
const anchors = ["about", "philosophy", "journey"];
const fieldSlugs: FieldSlug[] = ["rejuvenation", "regenerate", "urology"];
export function Header({
  locale,
  section = "",
}: {
  locale: Locale;
  section?: string;
}) {
  const c = content[locale];
  const homeAnchor = (anchor: string) =>
    `${section ? localePath(locale) : ""}#${anchor}`;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLElement>("a")?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
      if (e.key === "Tab") {
        const items = [
          ...panel.current!.querySelectorAll<HTMLElement>("a,button"),
          button.current!,
        ];
        const first = items[0],
          last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", key);
    };
  }, [open]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  function close() {
    setOpen(false);
    button.current?.focus();
  }
  const languages = (
    <div className="languages" aria-label="Language">
      {(["ja", "en", "zh"] as const).map((l) => (
        <a
          key={l}
          href={`${localePath(l)}${section}`}
          hrefLang={l === "zh" ? "zh-Hans" : l}
          lang={l === "zh" ? "zh-Hans" : l}
          aria-current={locale === l ? "page" : undefined}
        >
          {l === "ja" ? "JP" : l === "en" ? "EN" : "中文"}
        </a>
      ))}
    </div>
  );
  return (
    <>
      <a className="skip-link" href="#main">
        {c.skip}
      </a>
      <header className={`header ${scrolled ? "is-scrolled" : ""}`}>
        <a
          className="wordmark"
          href={localePath(locale)}
          aria-label="Yoshitomo Chihara"
        >
          <span className="monogram">
            yc<span>·</span>
          </span>
          <span>
            YOSHITOMO
            <br />
            CHIHARA<span className="brand-sub">PHYSICIAN & PHD</span>
          </span>
        </a>
        <nav
          className="desktop-nav"
          aria-label={
            locale === "ja"
              ? "メインナビゲーション"
              : locale === "zh"
                ? "主导航"
                : "Main navigation"
          }
        >
          {c.nav.slice(0, 3).map((n, i) => (
            <a key={n} href={homeAnchor(anchors[i])}>
              {n}
            </a>
          ))}
          <a href={homeAnchor("practice")}>{c.practiceLabel}</a>
          <a href={homeAnchor("clinic")}>{c.nav[3]}</a>
          <a
            href={dialoguePath(locale)}
            aria-current={section.startsWith("dialogues/") ? "page" : undefined}
          >
            {dialogueCopy[locale].label}
          </a>
        </nav>
        <div className="header-actions">
          {languages}
          <button
            ref={button}
            className={`menu-button ${open ? "is-open" : ""}`}
            aria-label={open ? c.close : c.menu}
            aria-expanded={open}
            aria-controls="menu-panel"
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>
      {open && (
        <div
          className="menu-overlay"
          id="menu-panel"
          ref={panel}
          role="dialog"
          aria-modal="true"
          aria-label={c.menu}
        >
          <div className="menu-inner">
            <p className="eyebrow">EXPLORE</p>
            {c.nav.slice(0, 3).map((n, i) => (
              <a key={n} href={homeAnchor(anchors[i])} onClick={close}>
                <span>0{i + 1}</span>
                {n}
                <span>↗</span>
              </a>
            ))}
            <a href={homeAnchor("practice")} onClick={close}>
              <span>04</span>
              {c.practiceLabel}
              <span>↗</span>
            </a>
            <div className="menu-field-links" aria-label={c.practiceLabel}>
              {fieldSlugs.map((slug, index) => (
                <a key={slug} href={fieldPath(locale, slug)} onClick={close}>
                  <span>04.{index + 1}</span>
                  {c.practices[index].title}
                  <span>↗</span>
                </a>
              ))}
            </div>
            <a href={homeAnchor("clinic")} onClick={close}>
              <span>05</span>
              {c.nav[3]}
              <span>↗</span>
            </a>
            <a href={homeAnchor("contact")} onClick={close}>
              <span>06</span>
              {c.contact}
              <span>↗</span>
            </a>
            <a href={dialoguePath(locale)} onClick={close}>
              <span>07</span>
              {dialogueCopy[locale].label}
              <span>↗</span>
            </a>
            {languages}
            <p className="menu-footer">YOSHITOMO CHIHARA / OSAKA, JAPAN</p>
          </div>
        </div>
      )}
    </>
  );
}
