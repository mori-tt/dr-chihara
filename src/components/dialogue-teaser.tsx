import type { Locale } from "@/lib/content";
import { dialogueCopy, dialoguePath } from "@/lib/dialogues";
import { stockPhotos, stockLabel } from "@/lib/stock-photos";
import { Picture } from "./picture";

export function DialogueTeaser({ locale }: { locale: Locale }) {
  const c = dialogueCopy[locale];
  const photo = stockPhotos.conversation;
  return (
    <section
      className="section dialogue-teaser"
      id="dialogues"
      aria-labelledby="dialogues-title"
    >
      <div className="section-label">
        <span className="section-number">✳︎</span>
        <span>DIALOGUES</span>
        <span className="label-local">{c.label}</span>
      </div>
      <div className="dialogue-teaser-grid">
        {/* Decorative duplicate of the text link below; hidden from the a11y tree to avoid a redundant stop. */}
        <a
          className="dialogue-teaser-image"
          href={dialoguePath(locale)}
          tabIndex={-1}
          aria-hidden="true"
        >
          <Picture
            src={photo.src}
            alt=""
            width={photo.width}
            height={photo.height}
            widths={[480, 800, 1200]}
            sizes="(max-width: 600px) 86vw, (max-width: 1800px) 40vw, 720px"
          />
          <span>
            A CONVERSATION
            <br />
            OPENS A NEW DOOR.
          </span>
          <span className="teaser-arrow">↗</span>
        </a>
        <div>
          <p className="eyebrow">{c.subtitle}</p>
          <h2 className="section-title" id="dialogues-title">
            {c.homeTitle.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </h2>
          <p>{c.homeIntro}</p>
          <small className="stock-credit">
            {stockLabel[locale]} · {photo.credit}
          </small>
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
