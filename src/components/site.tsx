import { Header } from "./header";
import { Footer } from "./footer";
import { DialogueTeaser } from "./dialogues";
import { Journey } from "./journey";
import { asset, clinicUrl, content, type Locale } from "@/lib/content";
import { personSchema } from "@/lib/metadata";
import { stockPhotos, stockLabel } from "@/lib/stock-photos";
function Arrow() {
  return (
    <span aria-hidden="true" className="arrow">
      ↗
    </span>
  );
}
function Label({
  number,
  en,
  local,
}: {
  number: string;
  en: string;
  local: string;
}) {
  return (
    <div className="section-label">
      <span className="section-number">{number}</span>
      <span>{en}</span>
      <span className="label-local">{local}</span>
    </div>
  );
}
export function Site({ locale }: { locale: Locale }) {
  const c = content[locale];
  const practicePhotos = [
    {
      src: "/images/consultation.webp",
      alt: {
        ja: content.ja.consultAlt,
        en: content.en.consultAlt,
        zh: content.zh.consultAlt,
      },
    },
    stockPhotos.laboratory,
    stockPhotos.stethoscope,
  ];
  return (
    <div className={`site locale-${locale}`} id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema(locale)).replace(/</g, "\\u003c"),
        }}
      />
      <Header locale={locale} />
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">
              <span className="status-dot" />
              YOSHITOMO CHIHARA — PERSONAL WEBSITE
            </p>
            <h1 id="hero-title">
              <span>CARE</span>
              <span>BEYOND</span>
              <span className="outline-word">
                BEAUTY<span className="hero-period">.</span>
              </span>
            </h1>
            <div className="hero-bottom">
              <div>
                <h2>
                  {c.hero[0]}
                  <br />
                  {c.hero[1]}
                </h2>
                <p>{c.intro}</p>
              </div>
              <a className="round-link" href="#about" aria-label={c.discover}>
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <div className="hero-photo">
            <img
              src={asset("/images/portrait.webp")}
              alt={c.portraitAlt}
              width="767"
              height="651"
              fetchPriority="high"
            />
            <div className="photo-top">
              <span>
                THE SCIENCE.
                <br />
                THE ART. THE HUMAN.
              </span>
              <span>
                OSAKA, JP
                <br />
                34°39′ N 135°31′ E
              </span>
            </div>
            <div className="photo-caption">
              <span>
                {c.name}
                <small>{c.role}</small>
              </span>
              <span className="photo-index">01 / PORTRAIT</span>
            </div>
            <span className="vertical-caption">
              A LIFELONG PURSUIT OF BETTER CARE
            </span>
          </div>
        </section>
        <div className="intro-strip">
          <span className="strip-mark">✳︎</span>
          <span>{c.strip}</span>
          <a href="#journey">
            MY JOURNEY <span aria-hidden="true">↗</span>
          </a>
        </div>
        <section className="section about" id="about">
          <Label number="01" en="ABOUT" local={c.aboutLabel} />
          <div className="about-grid">
            <div className="about-visual">
              <div className="about-image">
                <img
                  src={asset("/images/consultation.webp")}
                  alt={c.consultAlt}
                  width="767"
                  height="511"
                  loading="lazy"
                />
              </div>
              <div className="about-image-caption">
                <span>MEDICINE WITH A HUMAN PERSPECTIVE</span>
                <span>EST. 2022</span>
              </div>
              <div className="about-stamp">
                Yoshitomo
                <br />
                <span>Chihara</span>
              </div>
            </div>
            <div className="about-copy">
              <h2 className="section-title">
                {c.aboutTitle.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </h2>
              <p>{c.aboutBody}</p>
              <p>{c.aboutBody2}</p>
              <div className="name-block">
                <span className="doctor-name">{c.name}</span>
                <span>YOSHITOMO CHIHARA</span>
              </div>
              <div className="credentials">
                <h3>{c.qualifications}</h3>
                {[[0], [2, 3, 4], [1]].map((indices, group) => (
                  <div
                    className="credential-group"
                    key={c.credentialGroups[group]}
                  >
                    <h4>{c.credentialGroups[group]}</h4>
                    <ul>
                      {indices.map((index) => (
                        <li key={c.credentials[index]}>
                          {c.credentials[index]}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <a
                className="text-link"
                href={`${clinicUrl}/doctor/`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {c.profileLink}
                <Arrow />
              </a>
            </div>
          </div>
        </section>
        <section className="philosophy section" id="philosophy">
          <Label number="02" en="PHILOSOPHY" local={c.philosophyLabel} />
          <div className="philosophy-heading">
            <h2 className="section-title">
              {c.philosophyTitle.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </h2>
            <p>{c.philosophyIntro}</p>
          </div>
          <div className="principles">
            {c.principles.map((p, i) => (
              <article className="principle" key={p.title}>
                <span className="principle-number">
                  0{i + 1}
                  <span aria-hidden="true">{["↗", "✳︎", "∞"][i]}</span>
                </span>
                <h3>{p.title}</h3>
                <span className="principle-english">{p.en}</span>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
          <figure className="everyday-image">
            <img
              src={asset(stockPhotos.wellbeing.src)}
              alt={stockPhotos.wellbeing.alt[locale]}
              width="1600"
              height="2400"
              loading="lazy"
            />
            <figcaption>
              {stockLabel[locale]} · {stockPhotos.wellbeing.credit}
            </figcaption>
          </figure>
          <div className="philosophy-type" aria-hidden="true">
            SCIENCE. CARE. <em>YOU.</em>
          </div>
        </section>
        <DialogueTeaser locale={locale} />
        <section className="section journey" id="journey">
          <Label number="03" en="MY JOURNEY" local={c.journeyLabel} />
          <div className="journey-grid">
            <div className="journey-intro">
              <h2 className="section-title">
                {c.journeyTitle.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </h2>
              <p>{c.journeyIntro}</p>
              <div className="journey-locations">
                <span>NARA</span>
                <span className="location-line" />
                <span>LOS ANGELES</span>
                <span className="location-line" />
                <span>
                  OSAKA
                  <span className="status-dot" />
                </span>
              </div>
              <span className="journey-watermark" aria-hidden="true">
                1999
                <br />
                <i>—</i> NOW
              </span>
            </div>
            <Journey locale={locale} />
          </div>
        </section>
        <section className="section practice" id="practice">
          <Label number="04" en="FIELDS OF CARE" local={c.practiceLabel} />
          <h2 className="section-title">{c.practiceTitle}</h2>
          <div className="practice-grid">
            {c.practices.map((p, i) => (
              <a
                className="practice-card"
                key={p.title}
                href={`${clinicUrl}/${p.path}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="practice-stock">
                  <img
                    src={asset(practicePhotos[i].src)}
                    alt={practicePhotos[i].alt[locale]}
                    width="1600"
                    height="1067"
                    loading="lazy"
                  />
                  {i > 0 && (
                    <span className="stock-image-label">
                      {stockLabel[locale]}
                    </span>
                  )}
                </div>
                <div className="practice-card-heading">
                  <h3>{p.title}</h3>
                  <Arrow />
                </div>
                <span className="practice-en">{p.en}</span>
                <p>{p.text}</p>
                <span className="practice-more">{c.learnMore} ↗</span>
              </a>
            ))}
          </div>
          <p className="medical-note">{c.medicalNote}</p>
        </section>
        <section className="clinic" id="clinic">
          <div className="clinic-images">
            <img
              className="clinic-main-image"
              src={asset("/images/reception.webp")}
              alt={c.clinicAlt}
              width="767"
              height="511"
              loading="lazy"
            />
            <span className="clinic-photo-caption">
              NORRIS BEAUTY CLINIC / OSAKA
            </span>
            <img
              className="clinic-inset"
              src={asset("/images/lounge.webp")}
              alt={c.roomAlt}
              width="767"
              height="511"
              loading="lazy"
            />
          </div>
          <div className="clinic-copy">
            <Label number="05" en="THE CLINIC" local={c.clinicLabel} />
            <h2 className="section-title">
              {c.clinicTitle.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </h2>
            <p>{c.clinicBody}</p>
            <h3>{c.clinicName}</h3>
            <address>{c.address}</address>
            <p className="clinic-details">
              {c.access}
              <br />
              {c.hours}
            </p>
            <div className="clinic-links">
              <a
                className="text-link"
                href={clinicUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {c.official}
                <Arrow />
              </a>
              <a
                className="map-link"
                href="https://www.google.com/maps/search/?api=1&query=Norris+Beauty+Clinic+Osaka"
                target="_blank"
                rel="noopener noreferrer"
              >
                {c.map} ↗
              </a>
            </div>
          </div>
        </section>
        <section className="section contact" id="contact">
          <Label number="06" en="LET’S TALK" local={c.contactLabel} />
          <div className="contact-grid">
            <div>
              <h2 className="section-title">
                {c.contactTitle.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </h2>
              <p>{c.contactBody}</p>
            </div>
            <div className="contact-actions">
              <h3 className="contact-kind">{c.medicalContact}</h3>
              <a
                className="contact-button"
                href={`${clinicUrl}/contact/`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {c.contactButton}
                <span aria-hidden="true">↗</span>
              </a>
              <p className="external-note">{c.externalNote}</p>
              <a className="phone" href="tel:+81667723456">
                <span>{c.phoneLabel}</span>06-6772-3456
                <Arrow />
              </a>
              <p className="contact-hours">{c.hours}</p>
            </div>
          </div>
          <div className="editorial-contact" id="editorial-contact">
            <div>
              <p className="eyebrow">PRESS & CONVERSATIONS</p>
              <h3>{c.editorialContact}</h3>
              <p>{c.editorialBody}</p>
            </div>
            <div>
              <a
                className="text-link"
                href={`${clinicUrl}/contact/`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {c.editorialButton}
                <Arrow />
              </a>
              <p className="external-note">{c.editorialNote}</p>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
