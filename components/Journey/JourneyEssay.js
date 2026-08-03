import Link from "next/link";
import styles from "./Journey.module.scss";
import { JOURNEY_ENDING } from "../../constants";

// The always-rendered, crawlable narrative. In Tier 3 (reduced-motion / no
// WebGL / context lost) it IS the page — a typeset long-form essay. All chapter
// text is real DOM here in every tier.
const JourneyEssay = ({ chapters }) => (
  <article className={styles.essay}>
    <header className={styles.essayHead}>
      <p className={styles.essayEyebrow}>Class 9 → now</p>
      <h1 className={styles.essayTitle}>My Journey</h1>
      <p className={styles.essaySub}>
        Six years, told plainly. The pattern, each time: show up short, close
        the gap, repeat.
      </p>
    </header>

    {chapters.map((ch, i) => (
      <section
        key={ch.id}
        id={ch.id}
        className={styles.chapter}
        aria-label={`Chapter ${ch.chapter} — ${ch.title}`}
      >
        <div className={styles.chapterMeta}>
          <span className={styles.chapterNum}>{ch.chapter}</span>
          <span className={styles.chapterPeriod}>{ch.period}</span>
        </div>

        <h2
          className={`${styles.chapterTitle} ${
            i === chapters.length - 1 ? styles.chapterTitleFinal : ""
          }`}
        >
          {ch.title}
        </h2>

        <p className={styles.chapterBody}>{ch.body}</p>

        {ch.pull && <p className={styles.pull}>{ch.pull}</p>}

        {ch.artifact?.src && (
          <figure className={styles.artifact}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ch.artifact.src}
              alt={ch.artifact.alt || ""}
              loading="lazy"
              decoding="async"
            />
            {ch.artifact.caption && (
              <figcaption>{ch.artifact.caption}</figcaption>
            )}
          </figure>
        )}
      </section>
    ))}

    <footer className={styles.essayEnd}>
      {JOURNEY_ENDING.dedication?.text && (
        <p className={styles.dedication}>
          {JOURNEY_ENDING.dedication.text}
          {JOURNEY_ENDING.dedication.gloss && (
            <span className={styles.dedicationGloss}>
              {JOURNEY_ENDING.dedication.gloss}
            </span>
          )}
        </p>
      )}
      <p className={styles.recap}>{chapters.map((c) => c.title).join("  →  ")}</p>
      <div className={styles.endingCtas}>
        <Link href="/hackathons" className={`${styles.cta} ${styles.ctaPrimary} link`}>
          See the hackathons →
        </Link>
        <Link href="/#projects" className={`${styles.cta} ${styles.ctaSecondary} link`}>
          See the work →
        </Link>
        <Link href="/#contact" className={`${styles.cta} ${styles.ctaSecondary} link`}>
          Let&apos;s talk →
        </Link>
      </div>
    </footer>
  </article>
);

export default JourneyEssay;
