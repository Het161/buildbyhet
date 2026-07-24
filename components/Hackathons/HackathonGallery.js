import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Hackathons.module.scss";

// Keyboard-accessible multi-image lightbox for a station's gallery. Adapted
// from CertificationLightbox: Escape / backdrop / ✕ close, arrow keys + on-
// screen buttons for prev/next. Images lazy-load (this only mounts on open).
const HackathonGallery = ({ title, images, startIndex = 0, onClose }) => {
  const [index, setIndex] = useState(startIndex);
  const closeRef = useRef(null);
  const count = images.length;

  const prev = useCallback(
    () => setIndex((i) => (i - 1 + count) % count),
    [count]
  );
  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  const onBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const current = images[index];

  return (
    <div
      className={styles.glBackdrop}
      onClick={onBackdrop}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} gallery`}
    >
      <div className={styles.glModal}>
        <button
          type="button"
          ref={closeRef}
          onClick={onClose}
          className={`${styles.glClose} link`}
          aria-label="Close gallery"
        >
          <Cross />
        </button>

        <div className={styles.glStage}>
          {count > 1 && (
            <button
              type="button"
              onClick={prev}
              className={`${styles.glNav} ${styles.glPrev} link`}
              aria-label="Previous image"
            >
              <Chevron dir="left" />
            </button>
          )}

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={current.src}
            src={current.src}
            alt={current.alt || `${title} — image ${index + 1}`}
            className={styles.glImage}
            loading="lazy"
            decoding="async"
          />

          {count > 1 && (
            <button
              type="button"
              onClick={next}
              className={`${styles.glNav} ${styles.glNext} link`}
              aria-label="Next image"
            >
              <Chevron dir="right" />
            </button>
          )}
        </div>

        <div className={styles.glFoot}>
          <span className={styles.glTitle}>{title}</span>
          {count > 1 && (
            <span className={styles.glCount}>
              {index + 1} / {count}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const Cross = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="20" height="20" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const Chevron = ({ dir }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="24"
    height="24"
    aria-hidden="true"
    style={{ transform: dir === "left" ? "rotate(180deg)" : "none" }}
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default HackathonGallery;
