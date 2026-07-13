import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./Certifications.module.scss";

const CertificationLightbox = ({ certification, onClose }) => {
  const closeRef = useRef(null);

  const { name, issuer, date, category, description, image } = certification;

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={`${name} certificate`}
    >
      <div className={styles.lightbox}>
        <button
          type="button"
          ref={closeRef}
          onClick={onClose}
          className={`${styles.closeBtn} link`}
          aria-label="Close certificate preview"
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
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className={styles.lightboxImageWrap}>
          <Image
            src={image}
            alt={`${name} certificate issued by ${issuer}`}
            width={1400}
            height={1000}
            sizes="(max-width: 900px) 100vw, 56rem"
            className={styles.lightboxImage}
            priority
          />
        </div>

        <div className={styles.lightboxBody}>
          <span className={styles.category}>{category}</span>
          <h3 className={`${styles.name} mt-1`}>{name}</h3>
          <span className={styles.meta}>
            <span>{issuer}</span>
            <span className={styles.dot} aria-hidden="true" />
            <span>{date}</span>
          </span>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default CertificationLightbox;
