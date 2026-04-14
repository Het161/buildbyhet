import { useEffect, useRef } from "react";
import styles from "./ProjectModal.module.scss";

const ProjectModal = ({ project, onClose }) => {
  const modalRef = useRef(null);

  const {
    name,
    tagline,
    description,
    url,
    tech,
    tags,
    location,
    stats,
    features,
    gradient,
  } = project;

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // Close on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={`${name} project details`}
    >
      <div className={styles.modal} ref={modalRef}>
        {/* Header bar with gradient accent */}
        <div
          className={styles.headerBar}
          style={{
            background: `linear-gradient(135deg, ${gradient[0]} 0%, ${gradient[1]} 100%)`,
          }}
        />

        {/* Close button */}
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="20"
            height="20"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Scrollable content */}
        <div className={styles.content}>
          {/* Title + tagline */}
          <div className={styles.titleBlock}>
            <h2 className={styles.projectName}>{name}</h2>
            {tagline && <p className={styles.tagline}>&ldquo;{tagline}&rdquo;</p>}
            {location && (
              <p className={styles.location}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="14"
                  height="14"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {location}
              </p>
            )}
          </div>

          {/* Live URL button */}
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className={styles.liveBtn}
            style={{
              background: `linear-gradient(135deg, ${gradient[0]} 0%, ${gradient[1]} 100%)`,
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              width="16"
              height="16"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            View Live Site
          </a>

          {/* Stats */}
          {stats && stats.length > 0 && (
            <div className={styles.statsGrid}>
              {stats.map((stat) => (
                <div key={stat.label} className={styles.statCard}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* About */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>About</h3>
            <p className={styles.sectionText}>{description}</p>
          </div>

          {/* Features */}
          {features && features.length > 0 && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Features Built</h3>
              <ul className={styles.featureList}>
                {features.map((feature) => (
                  <li key={feature} className={styles.featureItem}>
                    <span className={styles.featureDot} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          {tech && tech.length > 0 && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Tech Stack</h3>
              <div className={styles.tagRow}>
                {tech.map((t) => (
                  <span key={t} className={styles.techTag}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Categories</h3>
              <div className={styles.tagRow}>
                {tags.map((tag) => (
                  <span key={tag} className={styles.categoryTag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
