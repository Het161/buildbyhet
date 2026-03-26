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

const ProjectTile = ({ project, classes, isDesktop }) => {
  const projectCard = useRef(null);

  const { name, imageKey, description, gradient, url, tech } = project;

  const image = PROJECT_IMAGES[imageKey];

  let additionalClasses = "";
  if (classes) {
    additionalClasses = classes;
  }

  useEffect(() => {
    VanillaTilt.init(projectCard.current, tiltOptions);
  }, [projectCard]);

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
      <div
        ref={projectCard}
        className={`${styles.projectTile} rounded-3xl relative overflow-hidden max-w-full`}
        style={{
          background: `linear-gradient(135deg, ${gradient[0]} 0%, ${gradient[1]} 100%)`,
        }}
      >
        {/* Left side: Image */}
        <div className={styles.imageContainer}>
          {image && (
            <Image
              src={image}
              alt={name}
              placeholder="blur"
              fill
              className={styles.projectImage}
            />
          )}
          <div className={styles.imageOverlay}></div>
        </div>

        {/* Right side: Content */}
        <div className={styles.contentContainer}>
          <div className={styles.textContent}>
            <h1 className={styles.projectTitle}>{name}</h1>
            <h2 className={styles.projectDescription}>{description}</h2>
          </div>
        </div>
      </div>
    </a>
  );
};

export default ProjectTile;
