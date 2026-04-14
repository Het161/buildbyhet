import { useEffect, useRef } from "react";
import Image from "next/image";
import VanillaTilt from "vanilla-tilt";
import styles from "./ProjectTile.module.scss";
import { PROJECT_IMAGES } from "../images";

const tiltOptions = {
  max: 5,
  speed: 400,
  glare: true,
  "max-glare": 0.2,
  gyroscope: false,
};

const ProjectTile = ({ project, classes, isDesktop, onOpenModal }) => {
  const projectCard = useRef(null);

  const { name, imageKey, description, gradient, url, tech, tags, tagline, hasModal } = project;

  const image = imageKey ? PROJECT_IMAGES[imageKey] : null;

  let additionalClasses = "";
  if (classes) {
    additionalClasses = classes;
  }

  useEffect(() => {
    VanillaTilt.init(projectCard.current, tiltOptions);
  }, [projectCard]);

  const cardInner = (
    <div
      ref={projectCard}
      className={`${styles.projectTile} rounded-3xl relative overflow-hidden max-w-full`}
      style={{
        background: `linear-gradient(135deg, ${gradient[0]} 0%, ${gradient[1]} 100%)`,
      }}
    >
      {/* Left side: Image (only when image exists) */}
      {image && (
        <div className={styles.imageContainer}>
          <Image
            src={image}
            alt={name}
            placeholder="blur"
            fill
            className={styles.projectImage}
          />
          <div className={styles.imageOverlay}></div>
        </div>
      )}

      {/* Right side: Content */}
      <div className={`${styles.contentContainer} ${image ? "" : styles.contentFull}`}>
        <div className={styles.textContent}>
          <h1 className={styles.projectTitle}>{name}</h1>
          {tagline && <p className={styles.projectTagline}>&ldquo;{tagline}&rdquo;</p>}
          <h2 className={styles.projectDescription}>{description}</h2>
          {tags && tags.length > 0 && (
            <div className={styles.tagRow}>
              {tags.slice(0, 3).map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          )}
        </div>
        {hasModal && (
          <div className={styles.viewDetails}>
            View Details
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
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );

  if (hasModal && onOpenModal) {
    return (
      <button
        onClick={onOpenModal}
        className={`overflow-hidden rounded-3xl snap-start link ${additionalClasses} ${styles.tileButton}`}
        style={{
          maxWidth: isDesktop ? "calc(100vw - 2rem)" : "calc(100vw - 4rem)",
          flex: "1 0 auto",
          WebkitMaskImage: "-webkit-radial-gradient(white, black)",
        }}
        aria-label={`View details for ${name}`}
      >
        {cardInner}
      </button>
    );
  }

  return (
    <a
      href={url}
      className={`overflow-hidden rounded-3xl snap-start link ${additionalClasses}`}
      target="_blank"
      rel="noreferrer"
      style={{
        maxWidth: isDesktop ? "calc(100vw - 2rem)" : "calc(100vw - 4rem)",
        flex: "1 0 auto",
        WebkitMaskImage: "-webkit-radial-gradient(white, black)",
      }}
    >
      {cardInner}
    </a>
  );
};

export default ProjectTile;
