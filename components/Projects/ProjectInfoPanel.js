import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./Projects.module.scss";

// DOM panel synced to the centred project on the WebGL ring. Text never lives
// in the canvas; this is the accessible, selectable source of truth for the
// project the ring is currently focused on.
const ProjectInfoPanel = ({ project, onOpenModal }) => {
  const contentRef = useRef(null);

  // Fast swap animation whenever the centred project changes.
  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
    );
  }, [project?.slug || project?.name]);

  if (!project) return null;

  const category = (project.tags && project.tags[0]) || "Project";

  return (
    <div className={`${styles.panel} section-container`} aria-live="polite">
      <div ref={contentRef}>
        <p className={styles.panelCategory}>{category}</p>
        <h3 className={styles.panelName}>{project.name}</h3>
        {project.tagline && (
          <p className={styles.panelTagline}>&ldquo;{project.tagline}&rdquo;</p>
        )}
        <p className={styles.panelDescription}>{project.description}</p>

        {project.tags && project.tags.length > 0 && (
          <div className={styles.panelTags}>
            {project.tags.slice(0, 4).map((tag) => (
              <span key={tag} className={styles.panelTag}>
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className={styles.panelActions}>
          {project.hasModal ? (
            <button
              type="button"
              onClick={onOpenModal}
              className={`${styles.cta} ${styles.ctaPrimary} link`}
            >
              View Details
              <Arrow />
            </button>
          ) : (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className={`${styles.cta} ${styles.ctaPrimary} link`}
            >
              Visit
              <ExternalArrow />
            </a>
          )}

          {project.hasModal && (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className={`${styles.cta} ${styles.ctaSecondary} link`}
            >
              Visit Live
              <ExternalArrow />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Arrow = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="14"
    height="14"
    aria-hidden="true"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const ExternalArrow = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="14"
    height="14"
    aria-hidden="true"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

export default ProjectInfoPanel;
