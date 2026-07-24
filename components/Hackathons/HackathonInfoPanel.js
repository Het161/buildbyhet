import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./Hackathons.module.scss";

// Fixed lower-third panel synced to the active station. Every field is optional
// and omitted when empty — nothing ever renders "undefined".
const HackathonInfoPanel = ({ item, onOpenGallery }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
    );
  }, [item?.slug]);

  if (!item) return null;

  const accent = item.accent || "#8b31ff";
  const result = item.result;
  const stack = (item.stack || []).filter(Boolean);

  return (
    <div className={styles.panel}>
      <div ref={contentRef} className={styles.panelInner}>
        <div className={styles.panelMeta}>
          {item.event && <span className={styles.event}>{item.event}</span>}
          {item.date && <span className={styles.date}>{item.date}</span>}
        </div>

        {result && result.label && (
          <span
            className={`${styles.badge} ${styles[`badge_${result.status}`] || ""}`}
            style={
              result.status === "highlight"
                ? { background: accent, borderColor: accent }
                : { borderColor: accent, color: accent }
            }
          >
            {result.status === "pending" && (
              <span className={styles.pulse} style={{ background: accent }} />
            )}
            {result.label}
          </span>
        )}

        <h2 className={styles.project}>{item.project}</h2>

        {item.tagline && <p className={styles.tagline}>{item.tagline}</p>}

        {stack.length > 0 && (
          <div className={styles.stack}>
            {stack.map((tech) => (
              <span key={tech} className={styles.chip}>
                {tech}
              </span>
            ))}
          </div>
        )}

        <div className={styles.actions}>
          {item.liveUrl && (
            <a
              href={item.liveUrl}
              target="_blank"
              rel="noreferrer"
              className={`${styles.cta} ${styles.ctaPrimary} link`}
              style={{ background: accent }}
            >
              Live Demo ↗
            </a>
          )}
          {item.certSlug && (
            <a
              href={`/certifications#${item.certSlug}`}
              className={`${styles.cta} ${styles.ctaSecondary} link`}
            >
              Certificate
            </a>
          )}
          {item.media?.gallery?.length > 0 && (
            <button
              type="button"
              onClick={onOpenGallery}
              className={`${styles.cta} ${styles.ctaSecondary} link`}
            >
              Photos ({item.media.gallery.length})
            </button>
          )}
          {item.media?.deck && (
            <a
              href={item.media.deck}
              target="_blank"
              rel="noreferrer"
              className={`${styles.cta} ${styles.ctaSecondary} link`}
            >
              Pitch Deck ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default HackathonInfoPanel;
