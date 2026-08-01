import styles from "./Hackathons.module.scss";

// The crawlable, accessible content: an <ol> of every station with full detail.
// In WebGL mode it's visually hidden (sr-only). In Tier 3 (no WebGL /
// reduced-motion / context lost) it IS the page layout.
const SemanticTimeline = ({ items, visible = false }) => {
  const list = (
    <ol className={visible ? styles.timeline : undefined}>
      {items.map((item) => {
        const accent = item.accent || "#8b31ff";
        const stack = (item.stack || []).filter(Boolean);
        return (
          <li
            key={item.slug}
            id={item.slug}
            className={visible ? styles.tlCard : undefined}
            style={visible ? { borderLeftColor: accent } : undefined}
          >
            <div className={visible ? styles.tlMeta : undefined}>
              {item.event &&
                (item.eventUrl ? (
                  <a
                    href={item.eventUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="link"
                  >
                    {item.event} ↗
                  </a>
                ) : (
                  <span>{item.event}</span>
                ))}
              {item.date && <span>{item.date}</span>}
              {item.result?.label && <span>{item.result.label}</span>}
            </div>
            <h2 className={visible ? styles.tlProject : undefined}>
              {item.project}
            </h2>
            {item.tagline && (
              <p className={visible ? styles.tlTagline : undefined}>
                {item.tagline}
              </p>
            )}
            {item.description && (
              <p className={visible ? styles.tlTagline : undefined}>
                {item.description}
              </p>
            )}
            {item.team && (
              <p className={visible ? styles.team : undefined}>{item.team}</p>
            )}
            {stack.length > 0 && (
              <div className={visible ? styles.tlStack : undefined}>
                {stack.map((tech) => (
                  <span key={tech} className={visible ? styles.chip : undefined}>
                    {tech}
                  </span>
                ))}
              </div>
            )}
            <div className={visible ? styles.tlLinks : undefined}>
              {item.liveUrl && (
                <a
                  href={item.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`${visible ? styles.tlLink : ""} link`}
                >
                  Live Demo ↗
                </a>
              )}
              {item.repoUrl && (
                <a
                  href={item.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`${visible ? styles.tlLink : ""} link`}
                >
                  GitHub ↗
                </a>
              )}
              {(item.videoUrl || item.media?.video) && (
                <a
                  href={item.videoUrl || item.media.video}
                  target="_blank"
                  rel="noreferrer"
                  className={`${visible ? styles.tlLink : ""} link`}
                >
                  Demo Video ↗
                </a>
              )}
              {item.media?.deck && (
                <a
                  href={item.media.deck}
                  target="_blank"
                  rel="noreferrer"
                  className={`${visible ? styles.tlLink : ""} link`}
                >
                  Pitch Deck ↗
                </a>
              )}
              {item.postUrl && (
                <a
                  href={item.postUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`${visible ? styles.tlLink : ""} link`}
                >
                  Announcement ↗
                </a>
              )}
              {item.certSlug && (
                <a
                  href={`/certifications#${item.certSlug}`}
                  className={`${visible ? styles.tlLink : ""} link`}
                >
                  Certificate
                </a>
              )}
            </div>

            {item.media?.gallery?.length > 0 && (
              <div className={visible ? styles.tlGallery : undefined}>
                {item.media.gallery.map((g) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={g.src}
                    src={g.src}
                    alt={g.alt || `${item.project} photo`}
                    loading="lazy"
                    decoding="async"
                    className={visible ? styles.tlThumb : undefined}
                  />
                ))}
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );

  if (!visible) return <div className={styles.srOnly}>{list}</div>;

  return (
    <section className={styles.fallback}>
      <header className={styles.fallbackHead}>
        <p className={styles.fallbackEyebrow}>Hackathon Journey</p>
        <h1 className={styles.fallbackTitle}>Building in public, on the clock</h1>
      </header>
      {list}
    </section>
  );
};

export default SemanticTimeline;
