import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import JourneyScene from "./JourneyScene";
import SignatureDraw from "./SignatureDraw";
import JourneyAudio from "./JourneyAudio";
import { JOURNEY_ENDING, JOURNEY_AUDIO } from "../../constants";
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
  const introRef = useRef(null);
  const sceneRef = useRef(null);
  const breathRef = useRef(new Set());
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const [soundOn, setSoundOn] = useState(false);
  const audioRef = useRef(null);
  const lastPRef = useRef(0);

  const N = chapters.length;
  const hasAudio = Boolean(JOURNEY_AUDIO.pad);

  const toggleSound = useCallback(async () => {
    const a = audioRef.current;
    if (!a) return;
    if (soundOn) {
      a.disable();
      setSoundOn(false);
      try {
        localStorage.setItem("journey-sound", "off");
      } catch {
        /* private mode */
      }
    } else {
      const ok = await a.enable();
      if (!ok) return;
      a.setProgress(lastPRef.current);
      setSoundOn(true);
      try {
        localStorage.setItem("journey-sound", "on");
      } catch {
        /* private mode */
      }
    }
  }, [soundOn]);

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
      // Opening ritual clears the moment the reader begins to move.
      if (introRef.current) {
        const o = 1 - smoothstep(0.0, 0.035, p);
        introRef.current.style.opacity = o.toFixed(3);
        introRef.current.style.visibility = o < 0.01 ? "hidden" : "visible";
      }
      // Held breath — once per chapter, as its pull-quote reaches the reading
      // line. A beat where the scene slows and the frame draws in.
      const local = p * N - chapter;
      if (
        chapters[chapter]?.pull &&
        local > 0.45 &&
        local < 0.62 &&
        !breathRef.current.has(chapter)
      ) {
        breathRef.current.add(chapter);
        sceneRef.current?.holdBreath();
      }

      // Ambient bed follows the scroll; the chime marks the ch6 → ch7 turn.
      lastPRef.current = p;
      if (audioRef.current) {
        audioRef.current.setProgress(p);
        if (chapter >= 6) audioRef.current.chime();
      }

      if (chapter !== activeRef.current) {
        activeRef.current = chapter;
        setActive(chapter);
      }
    },
    [N, chapters]
  );

  // Escape closes the memory-object lightbox.
  useEffect(() => {
    if (!lightbox) return undefined;
    const onEsc = (e) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [lightbox]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    const scene = new JourneyScene(host);
    sceneRef.current = scene;
    scene.onFrame = handleFrame;
    scene.onContextLost = () => onContextLost?.();
    scene.onMemoryOpen = (artifact) => setLightbox(artifact);
    scene.start();

    // Ambient bed (opt-in, its own toggle). If the reader left it on before,
    // resume on their first gesture — audio can't autostart without one.
    let gestureCleanup;
    if (hasAudio) {
      audioRef.current = new JourneyAudio({
        padSrc: JOURNEY_AUDIO.pad,
        chimeSrc: JOURNEY_AUDIO.chime,
      });
      let pref = "off";
      try {
        pref = localStorage.getItem("journey-sound") || "off";
      } catch {
        /* private mode */
      }
      if (pref === "on") {
        const resume = async () => {
          const ok = await audioRef.current?.enable();
          if (ok) {
            audioRef.current.setProgress(lastPRef.current);
            setSoundOn(true);
          }
          gestureCleanup?.();
        };
        ["pointerdown", "keydown", "wheel", "touchstart"].forEach((ev) =>
          window.addEventListener(ev, resume, { once: true, passive: true })
        );
        gestureCleanup = () =>
          ["pointerdown", "keydown", "wheel", "touchstart"].forEach((ev) =>
            window.removeEventListener(ev, resume)
          );
      }
    }

    // Opening ritual — only when the page actually loads at the top. The name
    // settles, the honest-version line follows, particles fade up out of the
    // dark, and the Δ pulses once (foreshadowing where this is all going)
    // before the scroll affordance appears. Scrolling at any point clears it.
    let ritual;
    const atTop = (window.scrollY || window.pageYOffset || 0) < 6;
    const opacityU = scene.monolith?.material.uniforms.uOpacity;
    if (atTop && opacityU) {
      opacityU.value = 0;
      const name = introRef.current?.querySelector("[data-ritual='name']");
      const sub = introRef.current?.querySelector("[data-ritual='sub']");
      const hint = introRef.current?.querySelector("[data-ritual='hint']");
      gsap.set([name, sub, hint], { autoAlpha: 0, y: 14 });
      ritual = gsap.timeline({ delay: 0.35 });
      ritual
        .to(name, { autoAlpha: 1, y: 0, duration: 0.9, ease: "power2.out" })
        .to(sub, { autoAlpha: 1, y: 0, duration: 0.9, ease: "power2.out" }, "+=0.35")
        .to(opacityU, { value: 0.9, duration: 1.4, ease: "power1.inOut" }, "-=0.5")
        // Subliminal convergence flicker: 0 → ~0.06 → 0.
        .to(scene, { introFlicker: 0.06, duration: 0.6, ease: "sine.in" }, "-=0.6")
        .to(scene, { introFlicker: 0.0, duration: 0.9, ease: "sine.out" })
        .to(hint, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" }, "-=0.3");
    } else if (introRef.current) {
      introRef.current.style.opacity = "0";
      introRef.current.style.visibility = "hidden";
    }

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
      ritual?.kill();
      tween.scrollTrigger?.kill();
      tween.kill();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("keydown", onKey);
      gestureCleanup?.();
      audioRef.current?.disable();
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

      {/* Opening ritual — the threshold before chapter one. Never blocks scroll. */}
      <div ref={introRef} className={styles.intro} aria-hidden="true">
        <p data-ritual="name" className={styles.introName}>
          Het Patel
        </p>
        <p data-ritual="sub" className={styles.introSub}>
          Class 9 to now. The honest version.
        </p>
        <span data-ritual="hint" className={styles.introHint}>
          Scroll
          <span className={styles.introChevron} />
        </span>
      </div>

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
            {/* The artifact is a glass slab in the scene, not a DOM figure —
                the Tier-3 essay carries the accessible inline image. */}
          </div>
        ))}
      </div>

      {/* Chapter rail — an escape hatch, always reachable. The line is the path
          walked; passed dots fill in behind you. */}
      <nav className={styles.rail} aria-label="Chapters">
        <span className={styles.railTrack} aria-hidden="true">
          <span
            className={styles.railProgress}
            style={{ height: `${(active / (N - 1)) * 100}%` }}
          />
        </span>
        <ol className={styles.railList}>
          {chapters.map((ch, i) => (
            <li key={ch.id}>
              <button
                type="button"
                onClick={() => scrollToChapter(i)}
                aria-label={`Chapter ${ch.chapter} — ${ch.title}`}
                aria-current={i === active ? "true" : undefined}
                className={`${styles.railDot} ${
                  i === active
                    ? styles.railDotActive
                    : i < active
                    ? styles.railDotPassed
                    : ""
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

      {/* Journey-only ambient bed — separate from the site's SoundBar, off by
          default. Only present when a pad is configured. */}
      {hasAudio && (
        <button
          type="button"
          onClick={toggleSound}
          aria-pressed={soundOn}
          aria-label={soundOn ? "Turn ambient sound off" : "Turn ambient sound on"}
          className={`${styles.soundToggle} ${
            soundOn ? styles.soundToggleOn : ""
          } link`}
        >
          <span className={styles.soundBarsMini} aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          {soundOn ? "Sound on" : "Sound"}
        </button>
      )}

      {/* Ending — the assembled Δ, then a dedication, the signature drawing
          itself on, the journey in one line, and three ways out. */}
      <div
        ref={endingRef}
        className={styles.ending}
        style={{ opacity: 0, pointerEvents: "none" }}
      >
        <div className={styles.endingInner}>
          {JOURNEY_ENDING.dedication?.text && (
            <p className={styles.dedication}>
              {JOURNEY_ENDING.dedication.text}
              {JOURNEY_ENDING.dedication.gloss && (
                <span className={styles.dedicationGloss}>
                  {JOURNEY_ENDING.dedication.gloss}
                </span>
              )}
            </p>
          )}

          {JOURNEY_ENDING.signature && (
            <SignatureDraw
              src={JOURNEY_ENDING.signature}
              play={active === N - 1}
              className={styles.signature}
            />
          )}

          <p className={styles.recap}>
            {chapters.map((c) => c.title).join("  →  ")}
          </p>

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
      </div>

      {/* Memory-object lightbox — opened by clicking a slab. */}
      {lightbox && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt || "Artifact"}
          onClick={() => setLightbox(null)}
        >
          <figure
            className={styles.lightboxInner}
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={lightbox.src} alt={lightbox.alt || ""} decoding="async" />
            {lightbox.caption && (
              <figcaption className={styles.lightboxCaption}>
                {lightbox.caption}
              </figcaption>
            )}
          </figure>
          <button
            type="button"
            className={`${styles.lightboxClose} link`}
            aria-label="Close"
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
};

export default JourneyExperience;
