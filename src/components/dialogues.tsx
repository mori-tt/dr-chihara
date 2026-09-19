import { Header } from "./header";
import { Footer } from "./footer";
import { asset, content, localePath, type Locale } from "@/lib/content";
import {
  dialogueCopy,
  dialoguePath,
  visibleDialogues,
  publishedDialogues,
  type Dialogue,
} from "@/lib/dialogues";
import { siteUrl } from "@/lib/metadata";

export function DialogueTeaser({ locale }: { locale: Locale }) {
  const c = dialogueCopy[locale];
  return (
    <section className="section dialogue-teaser" id="dialogues">
      <div className="section-label">
        <span className="section-number">✳</span>
        <span>DIALOGUES</span>
        <span className="label-local">{c.label}</span>
      </div>
      <div className="dialogue-teaser-grid">
        <a
          className="dialogue-teaser-image"
          href={dialoguePath(locale)}
          aria-label={c.explore}
        >
          <img
            src={asset("/images/consultation.webp")}
            alt={content[locale].consultAlt}
            width="767"
            height="511"
            loading="lazy"
          />
          <span aria-hidden="true">
            A CONVERSATION
            <br />
            OPENS A NEW DOOR.
          </span>
          <span className="teaser-arrow" aria-hidden="true">
            ↗
          </span>
        </a>
        <div>
          <p className="eyebrow">{c.subtitle}</p>
          <h2 className="section-title">
            {c.homeTitle.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </h2>
          <p>{c.homeIntro}</p>
          <a className="text-link" href={dialoguePath(locale)}>
            {c.explore}
            <span className="arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

function Breadcrumb({ locale, title }: { locale: Locale; title?: string }) {
  const c = dialogueCopy[locale];
  return (
    <nav
      className="dialogue-breadcrumb"
      aria-label={
        locale === "ja"
          ? "パンくずリスト"
          : locale === "zh"
            ? "面包屑导航"
            : "Breadcrumb"
      }
    >
      <a href={localePath(locale)}>{c.home}</a>
      <span aria-hidden="true">/</span>
      {title ? (
        <>
          <a href={dialoguePath(locale)}>{c.label}</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{title}</span>
        </>
      ) : (
        <span aria-current="page">{c.label}</span>
      )}
    </nav>
  );
}

function ArticleCard({
  article,
  locale,
}: {
  article: Dialogue;
  locale: Locale;
}) {
  const c = dialogueCopy[locale],
    t = article.translations[locale],
    sample = article.status === "template";
  return (
    <a className="dialogue-card" href={dialoguePath(locale, article.slug)}>
      <div className="dialogue-card-image">
        <img
          src={asset(article.cover)}
          alt={t.coverAlt}
          width="767"
          height="511"
          loading="lazy"
        />
        <span className="dialogue-badge">
          {sample ? c.sample : `VOL. ${article.volume}`}
        </span>
        <span className="dialogue-card-arrow" aria-hidden="true">
          ↗
        </span>
      </div>
      <div className="dialogue-card-copy">
        <p className="eyebrow">{t.category}</p>
        <h2>{t.title}</h2>
        <p className="dialogue-card-guest">
          {t.guest.name}
          <span>{t.guest.role}</span>
        </p>
        <div className="dialogue-card-bottom">
          <span>{sample ? c.draftDate : article.publishedAt}</span>
          <span>{sample ? c.preview : c.read} ↗</span>
        </div>
      </div>
    </a>
  );
}

export function DialogueIndex({ locale }: { locale: Locale }) {
  const c = dialogueCopy[locale],
    published = publishedDialogues();
  return (
    <div className={`site locale-${locale} dialogue-site`} id="top">
      <Header locale={locale} section="dialogues/" />
      <main id="main">
        <div className="dialogue-wrap">
          <Breadcrumb locale={locale} />
          <section className="dialogue-index-heading">
            <p className="eyebrow">
              <span className="status-dot" /> {c.subtitle}
            </p>
            <div className="dialogue-masthead">
              <span>
                DIALOGUES<span className="accent">.</span>
              </span>
              <h1>{c.label}</h1>
            </div>
            <div className="dialogue-index-intro">
              <h2>
                {c.title.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </h2>
              <p>{c.intro}</p>
            </div>
          </section>
          <section className="dialogue-archive" aria-labelledby="archive-title">
            <div className="dialogue-archive-heading">
              <h2 id="archive-title">{c.archive}</h2>
              <span>
                {published.length
                  ? String(published.length).padStart(2, "0")
                  : "COMING SOON"}
              </span>
            </div>
            {!published.length && (
              <div className="dialogue-coming">
                <span className="dialogue-asterisk" aria-hidden="true">
                  ✳
                </span>
                <div>
                  <h3>{c.upcoming}</h3>
                  <p>{c.upcomingBody}</p>
                </div>
              </div>
            )}
            <div className="dialogue-card-grid">
              {visibleDialogues().map((article) => (
                <ArticleCard
                  key={article.slug}
                  article={article}
                  locale={locale}
                />
              ))}
            </div>
          </section>
          <div className="dialogue-closing">
            <span aria-hidden="true">“</span>
            <p>{c.homeTitle.join(" ")}</p>
            <small>YOSHITOMO CHIHARA / DIALOGUES</small>
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </div>
  );
}

export function DialogueArticle({
  locale,
  article,
}: {
  locale: Locale;
  article: Dialogue;
}) {
  const c = dialogueCopy[locale],
    t = article.translations[locale],
    sample = article.status === "template";
  const canonical = `${siteUrl}/${locale === "ja" ? "" : `${locale}/`}dialogues/${article.slug}/`;
  return (
    <div className={`site locale-${locale} dialogue-site`} id="top">
      <Header locale={locale} section={`dialogues/${article.slug}/`} />
      <main id="main">
        <div className="dialogue-wrap">
          <Breadcrumb locale={locale} title={sample ? c.sample : t.title} />
          {sample && (
            <aside className="dialogue-sample-notice">
              <span>{c.sample}</span>
              <p>{c.sampleNote}</p>
            </aside>
          )}
          {!sample && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "Article",
                  headline: t.title,
                  description: t.introduction,
                  datePublished: article.publishedAt,
                  inLanguage: locale === "zh" ? "zh-Hans" : locale,
                  image: `${siteUrl}${article.cover}`,
                  author: { "@type": "Person", name: "Yoshitomo Chihara" },
                  mainEntityOfPage: canonical,
                }).replace(/</g, "\\u003c"),
              }}
            />
          )}
          <article>
            <header className="dialogue-article-heading">
              <a className="eyebrow" href={dialoguePath(locale)}>
                DIALOGUES / {c.label}
              </a>
              <div className="dialogue-article-meta">
                <span>{sample ? "SAMPLE" : `VOL. ${article.volume}`}</span>
                <span>{t.category}</span>
                <span>
                  {sample ? (
                    c.draftDate
                  ) : (
                    <time dateTime={article.publishedAt}>
                      {article.publishedAt}
                    </time>
                  )}
                </span>
                {!sample && (
                  <span>
                    {article.readingMinutes} {c.readTime}
                  </span>
                )}
              </div>
              <h1>{t.title}</h1>
              <div className="dialogue-byline">
                <span>
                  {c.guest} <strong>{t.guest.name}</strong>
                </span>
                <span aria-hidden="true">×</span>
                <span>
                  {c.interviewer} <strong>{content[locale].name}</strong>
                </span>
              </div>
            </header>
            <figure className="dialogue-cover">
              <img
                src={asset(article.cover)}
                alt={t.coverAlt}
                width="767"
                height="511"
                fetchPriority="high"
              />
              <figcaption>{t.coverCaption}</figcaption>
            </figure>
            <div className="dialogue-reading-grid">
              <aside className="dialogue-sidebar">
                <nav className="dialogue-toc" aria-label={c.contents}>
                  <p className="eyebrow">CONTENTS</p>
                  <h2>{c.contents}</h2>
                  {t.sections.map((s, i) => (
                    <a href={`#${s.id}`} key={s.id}>
                      <span>{String(i + 1).padStart(2, "0")}</span>
                      {s.title}
                    </a>
                  ))}
                  <a href="#afterword">
                    <span>↗</span>
                    {c.afterword}
                  </a>
                </nav>
                <a className="dialogue-back" href={dialoguePath(locale)}>
                  ← {c.back}
                </a>
              </aside>
              <div className="dialogue-body">
                <p className="dialogue-lead">{t.introduction}</p>
                <section
                  className="dialogue-guest"
                  aria-labelledby="guest-name"
                >
                  {t.guest.image ? (
                    <img
                      src={asset(t.guest.image)}
                      alt={t.guest.imageAlt || t.guest.name}
                      width="200"
                      height="240"
                    />
                  ) : (
                    <div
                      className="dialogue-guest-placeholder"
                      aria-hidden="true"
                    >
                      <span>PORTRAIT</span>
                      <span>＋</span>
                    </div>
                  )}
                  <div>
                    <span className="eyebrow">GUEST PROFILE</span>
                    <h2 id="guest-name">{t.guest.name}</h2>
                    <p className="dialogue-guest-role">{t.guest.role}</p>
                    <p>{t.guest.biography}</p>
                  </div>
                </section>
                {t.sections.map((s, i) => (
                  <section className="dialogue-chapter" id={s.id} key={s.id}>
                    <p className="eyebrow">
                      CHAPTER {String(i + 1).padStart(2, "0")}
                    </p>
                    <h2>{s.title}</h2>
                    {s.exchanges.map((e, index) => (
                      <div className="dialogue-exchange" key={index}>
                        <div className="dialogue-question">
                          <span>{sample ? c.exampleQuestion : c.question}</span>
                          <h3>{e.question}</h3>
                        </div>
                        <div className="dialogue-answer">
                          <span>{sample ? c.exampleAnswer : t.guest.name}</span>
                          <div>
                            {e.answer.map((p, j) => (
                              <p key={j}>{p}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                    {s.image && (
                      <figure className="dialogue-inline-photo">
                        <img
                          src={asset(s.image)}
                          alt={s.imageAlt || s.title}
                          width="767"
                          height="511"
                          loading="lazy"
                        />
                        {s.caption && <figcaption>{s.caption}</figcaption>}
                      </figure>
                    )}
                  </section>
                ))}
                {t.quote && (
                  <figure className="dialogue-quote">
                    <span aria-hidden="true">“</span>
                    <figcaption>{sample ? c.sample : c.quote}</figcaption>
                    <blockquote>{t.quote}</blockquote>
                  </figure>
                )}
                <section className="dialogue-afterword" id="afterword">
                  <p className="eyebrow">AFTER THE CONVERSATION</p>
                  <h2>{c.afterword}</h2>
                  {t.afterword.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                  <div className="dialogue-host">
                    <img
                      src={asset("/images/portrait.webp")}
                      alt={content[locale].portraitAlt}
                      width="767"
                      height="651"
                      loading="lazy"
                    />
                    <div>
                      <p className="eyebrow">{c.interviewer}</p>
                      <h3>{content[locale].name}</h3>
                      <p>{c.hostBio}</p>
                      <a href={`${localePath(locale)}#about`}>
                        {c.hostProfile} ↗
                      </a>
                    </div>
                  </div>
                </section>
                <div className="dialogue-credits">
                  <h2>{c.credits}</h2>
                  <p>{t.credits}</p>
                </div>
              </div>
            </div>
          </article>
          <section className="dialogue-next">
            <div>
              <p className="eyebrow">CONTINUE THE CONVERSATION</p>
              <h2>{c.related}</h2>
              <p>{c.relatedBody}</p>
            </div>
            <a className="text-link" href={dialoguePath(locale)}>
              {c.all}
              <span className="arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          </section>
        </div>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
