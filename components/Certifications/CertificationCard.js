import Image from "next/image";
import styles from "./Certifications.module.scss";

const CertificationCard = ({ certification, onOpen }) => {
  const {
    name,
    issuer,
    date,
    category,
    highlight,
    description,
    image,
    gradient,
  } = certification;

  return (
    <button
      type="button"
      onClick={onOpen}
      className={`${styles.card} link`}
      aria-label={`View the ${name} certificate from ${issuer}`}
    >
      <span
        className={styles.accentBar}
        style={{
          background: `linear-gradient(135deg, ${gradient[0]} 0%, ${gradient[1]} 100%)`,
        }}
      />

      <span className={styles.thumb}>
        <Image
          src={image}
          alt={`${name} certificate issued by ${issuer}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={styles.thumbImage}
        />
        <span className={styles.thumbScrim} />
        {highlight && <span className={styles.badge}>{highlight}</span>}
      </span>

      <span className={styles.body}>
        <span className={styles.category}>{category}</span>
        <h3 className={styles.name}>{name}</h3>
        <span className={styles.meta}>
          <span>{issuer}</span>
          <span className={styles.dot} aria-hidden="true" />
          <span>{date}</span>
        </span>
        <p className={styles.description}>{description}</p>

        <span className={styles.viewLink}>
          View certificate
          <svg
            className={styles.viewArrow}
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
        </span>
      </span>
    </button>
  );
};

export default CertificationCard;
