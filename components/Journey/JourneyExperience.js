import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import JourneyScene from "./JourneyScene";
import styles from "./Journey.module.scss";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const smoothstep = (a, b, x) => {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

// Canvas backdrop + the sticky DOM chapter column, plus the escape hatches:
// chapter rail, keyboard nav, skip-to-end, and the ending CTAs. Native page
// scroll scrubs the camera/Δ; text is always real DOM.
const JourneyExperience = ({ chapters, scrollId, onContextLost }) => {
  const hostRef = useRef(null);
  const blockRefs = useRef([]);
  const endingRef = useRef(null);
  const skipRef = useRef(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);

  const N = chapters.length;

  const scrollToChapter = useCallback(
    (i) => {
      const idx = Math.max(0, Math.min(N - 1, i));
      const max = document.documentElement.scrollHeight - window.innerHeight;
      // Land a little into the chapter's range so it reads at rest.
      gsap.to(window, {
        scrollTo: { y: ((idx + 0.4) / N) * max },
        duration: 0.9,
        ease: "power2.inOut",
      });
    },
    [N]
  );

  const scrollToEnd = useCallback(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    gsap.to(window, { scrollTo: { y: max }, duration: 1.1, ease: "power2.inOut" });
  }, []);

  const handleFrame = useCallback(
    ({ p, chapter }) => {
      for (let i = 0; i < N; i++) {
        const el = blockRefs.current[i];
        if (!el) continue;
        const local = p * N - i;
        const fadeIn = smoothstep(0.0, 0.18, local);
        const fadeOut = 1 - smoothstep(0.82, 1.0, local);
        const op = Math.max(0, Math.min(1, fadeIn * fadeOut));
        const y = (1 - fadeIn) * 16 - smoothstep(0.82, 1.0, local) * 8;
        el.style.opacity = op.toFixed(3);
        el.style.transform = `translateY(${y.toFixed(1)}px)`;
        el.style.pointerEvents = op > 0.5 ? "auto" : "none";
      }
      // Ending CTAs resolve as the Δ finishes assembling.
      if (endingRef.current) {
        const o = smoothstep(0.94, 0.995, p);
        endingRef.current.style.opacity = o.toFixed(3);
        endingRef.current.style.pointerEvents = o > 0.5 ? "auto" : "none";
      }
      // Skip-to-end is only offered in the first two chapters.
      if (skipRef.current) {
        const o = 1 - smoothstep(2 / N, 2.4 / N, p);
        skipRef.current.style.opacity = o.toFixed(3);
        skipRef.current.style.pointerEvents = o > 0.4 ? "auto" : "none";
      }
      if (chapter !== activeRef.current) {
        activeRef.current = chapter;
        setActive(chapter);
      }
    },
    [N]
  );

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    const scene = new JourneyScene(host);
    scene.onFrame = handleFrame;
    scene.onContextLost = () => onContextLost?.();
    scene.start();

    const tween = gsap.to(scene.scroll, {
      p: 1,
      ease: "none",
      scrollTrigger: {
        trigger: `#${scrollId}`,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.4,
      },
    });

    const ro = new ResizeObserver(() => scene.onResize());
    ro.observe(host);
    const onVis = () => (document.hidden ? scene.pause() : scene.start());
    document.addEventListener("visibilitychange", onVis);

    const onKey = (e) => {
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        scrollToChapter(activeRef.current + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        scrollToChapter(activeRef.current - 1);
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("keydown", onKey);
      scene.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        ref={hostRef}
        className={styles.canvasHost}
        style={{ touchAction: "pan-y" }}
        aria-hidden="true"
      />
      <div className={styles.scrim} aria-hidden="true" />

      <div className={styles.textColumn}>
        {chapters.map((ch, i) => (
          <div
            key={ch.id}
            id={ch.id}
            ref={(el) => (blockRefs.current[i] = el)}
            className={styles.block}
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            <div className={styles.blockMeta}>
              <span className={styles.blockNum}>{ch.chapter}</span>
              <span className={styles.blockPeriod}>{ch.period}</span>
            </div>
            <h2
              className={`${styles.blockTitle} ${
                i === N - 1 ? styles.blockTitleFinal : ""
              }`}
            >
              {ch.title}
            </h2>
            <p className={styles.blockBody}>{ch.body}</p>
            {ch.pull && <p className={styles.blockPull}>{ch.pull}</p>}
            {ch.artifact?.src && (
              <figure className={styles.blockArtifact}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={ch.artifact.src}
                  alt={ch.artifact.alt || ""}
                  loading="lazy"
                  decoding="async"
                />
                {ch.artifact.caption && (
                  <figcaption>{ch.artifact.caption}</figcaption>
                )}
              </figure>
            )}
          </div>
        ))}
      </div>

      {/* Chapter rail — an escape hatch, always reachable. */}
      <nav className={styles.rail} aria-label="Chapters">
        <ol className={styles.railList}>
          {chapters.map((ch, i) => (
            <li key={ch.id}>
              <button
                type="button"
                onClick={() => scrollToChapter(i)}
                aria-label={`Chapter ${ch.chapter} — ${ch.title}`}
                aria-current={i === active ? "true" : undefined}
                className={`${styles.railDot} ${
                  i === active ? styles.railDotActive : ""
                } link`}
              />
            </li>
          ))}
        </ol>
      </nav>

      <button
        ref={skipRef}
        type="button"
        onClick={scrollToEnd}
        className={`${styles.skip} link`}
      >
        Skip to the end ↓
      </button>

      {/* Ending — the assembled Δ, then three ways out. */}
      <div
        ref={endingRef}
        className={styles.ending}
        style={{ opacity: 0, pointerEvents: "none" }}
      >
        <div className={styles.endingCtas}>
          <Link href="/hackathons" className={`${styles.cta} ${styles.ctaPrimary} link`}>
            See the hackathons →
          </Link>
          <Link href="/#projects" className={`${styles.cta} ${styles.ctaSecondary} link`}>
            See the work →
          </Link>
          <Link href="/#contact" className={`${styles.cta} ${styles.ctaSecondary} link`}>
            Let&apos;s talk →
          </Link>
        </div>
      </div>
    </>
  );
};

export default JourneyExperience;
