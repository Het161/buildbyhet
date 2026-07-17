import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { MENULINKS, PROJECTS } from "../../constants";
import ProjectModal from "./ProjectModal/ProjectModal";
import ProjectInfoPanel from "./ProjectInfoPanel";
import styles from "./Projects.module.scss";

// The WebGL ring is client-only and lives in its own lazy chunk — it never
// touches SSR and stays out of the initial bundle.
const OrbitalGallery = dynamic(() => import("./OrbitalGallery"), {
  ssr: false,
});

function webglSupported() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

const Projects = () => {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);

  // null = still deciding; "webgl" | "fallback" once known (client only).
  const [mode, setMode] = useState(null);
  const [contextLost, setContextLost] = useState(false); // WebGL gave out
  const [mounted, setMounted] = useState(false); // lazy gallery mount
  const [centeredIndex, setCenteredIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const galleryApi = useRef(null);

  // Decide render mode: no WebGL / reduced-motion → static DOM grid.
  useEffect(() => {
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches;
    setMode(reduce || !webglSupported() ? "fallback" : "webgl");
  }, []);

  // Heading reveal (plays once on enter; matches the site's staggered pattern).
  useEffect(() => {
    if (!sectionRef.current) return undefined;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });
      tl.from(sectionRef.current.querySelectorAll(".staggered-reveal"), {
        opacity: 0,
        y: 24,
        duration: 0.5,
        stagger: 0.12,
        ease: "power2.out",
      });
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => tl.play(),
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Lazily mount the gallery when the stage is within ~1.5 viewports.
  useEffect(() => {
    if (mode !== "webgl" || !stageRef.current) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          io.disconnect();
        }
      },
      { rootMargin: "150% 0px" }
    );
    io.observe(stageRef.current);
    return () => io.disconnect();
  }, [mode]);

  // Keep sibling ScrollTriggers (About/Work/Contact pins) aligned once the
  // gallery has taken its space.
  useEffect(() => {
    if (!mounted) return undefined;
    const id = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => clearTimeout(id);
  }, [mounted]);

  const centeredProject = PROJECTS[centeredIndex] || PROJECTS[0];

  const handleActivate = (index) => {
    const project = PROJECTS[index];
    if (!project) return;
    if (project.hasModal) setSelectedProject(project);
    else window.open(project.url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <section
        ref={sectionRef}
        id={MENULINKS[2].ref}
        className="w-full relative select-none"
      >
        <div className="section-container py-8">
          <p className="uppercase tracking-widest text-gray-light-1 staggered-reveal">
            PROJECTS
          </p>
          <h1 className="text-6xl mt-2 font-medium text-gradient w-fit staggered-reveal">
            My Projects
          </h1>
          <h2 className="text-[1.65rem] font-medium md:max-w-lg max-w-sm mt-2 staggered-reveal">
            Some things I&apos;ve built with love, expertise and a pinch of
            magical ingredients.
          </h2>
        </div>

        {/* Always-rendered, visually-hidden list for crawlers & screen readers
            (the canvas carries no text). */}
        <ul className={styles.srOnly}>
          {PROJECTS.map((project) => (
            <li key={project.name}>
              <a href={project.url}>{project.name}</a> — {project.description}
            </li>
          ))}
        </ul>

        {mode === "fallback" || contextLost ? (
          <div className="section-container">
            <FallbackGrid onOpenModal={setSelectedProject} />
          </div>
        ) : (
          <>
            <div ref={stageRef} className={styles.stage}>
              <div className={styles.canvasHost}>
                {mounted && (
                  <OrbitalGallery
                    items={PROJECTS}
                    onIndex={setCenteredIndex}
                    onActivate={handleActivate}
                    onApi={(api) => {
                      galleryApi.current = api;
                    }}
                    onContextLost={() => setContextLost(true)}
                  />
                )}
              </div>

              <button
                type="button"
                aria-label="Previous project"
                onClick={() => galleryApi.current?.snap(-1)}
                className={`${styles.navBtn} ${styles.navPrev} link`}
              >
                <NavArrow direction="left" />
              </button>
              <button
                type="button"
                aria-label="Next project"
                onClick={() => galleryApi.current?.snap(1)}
                className={`${styles.navBtn} ${styles.navNext} link`}
              >
                <NavArrow direction="right" />
              </button>

              <span className={styles.hint}>Drag · scroll to spin</span>
            </div>

            <ProjectInfoPanel
              project={centeredProject}
              onOpenModal={() =>
                centeredProject?.hasModal &&
                setSelectedProject(centeredProject)
              }
            />
          </>
        )}
      </section>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
};

const NavArrow = ({ direction }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    width="22"
    height="22"
    aria-hidden="true"
    style={{ transform: direction === "left" ? "rotate(180deg)" : "none" }}
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

// Static DOM grid — the reduced-motion / no-WebGL / context-lost fallback.
const FallbackGrid = ({ onOpenModal }) => (
  <div className={styles.fallbackGrid}>
    {PROJECTS.map((project) =>
      project.hasModal ? (
        <button
          key={project.name}
          type="button"
          onClick={() => onOpenModal(project)}
          className={`${styles.fallbackCard} link`}
        >
          <FallbackCardInner project={project} label="View details" />
        </button>
      ) : (
        <a
          key={project.name}
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className={`${styles.fallbackCard} link`}
        >
          <FallbackCardInner project={project} label="Visit ↗" />
        </a>
      )
    )}
  </div>
);

const FallbackCardInner = ({ project, label }) => (
  <>
    <span
      className={styles.fallbackAccent}
      style={{
        background: `linear-gradient(135deg, ${project.gradient[0]} 0%, ${project.gradient[1]} 100%)`,
      }}
    />
    <span className={styles.fallbackBody}>
      <span className={styles.fallbackName}>{project.name}</span>
      <span className={styles.fallbackDesc}>{project.description}</span>
      <span className={styles.fallbackLink}>{label}</span>
    </span>
  </>
);

export default Projects;
