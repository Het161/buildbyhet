import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import HackathonInfoPanel from "./HackathonInfoPanel";
import HackathonRail from "./HackathonRail";
import TrackedTitle from "./TrackedTitle";
import styles from "./Hackathons.module.scss";

gsap.registerPlugin(ScrollToPlugin);

const VoidTrajectory = dynamic(() => import("./VoidTrajectory"), { ssr: false });

const smoothstep01 = (x, a, b) => {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

// Orchestrates the WebGL fly-through and its DOM overlay: tracked titles synced
// each frame, the active-station info panel, the rail, and keyboard nav. The
// canvas is lazy + client-only; the DOM overlay is server-rendered.
const HackathonsExperience = ({ items, scrollId, tier3, onContextLost }) => {
  const [active, setActive] = useState(0);
  const titleRefs = useRef([]);
  const activeRef = useRef(0);
  const glowRef = useRef(null);
  const introRef = useRef(null);
  const outroRef = useRef(null);
  const panelRef = useRef(null);

  const stationT = (i) => (i + 1) / (items.length + 1);

  // Aggregate stats computed from the data — never hardcoded.
  const total = items.length;
  const highlights = items
    .filter((it) => it.result?.status === "highlight")
    .map((it) => it.result.label);

  const scrollToStation = useCallback(
    (i) => {
      const idx = Math.max(0, Math.min(items.length - 1, i));
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      gsap.to(window, {
        scrollTo: { y: stationT(idx) * max },
        duration: 0.8,
        ease: "power2.inOut",
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items.length]
  );

  // Per-frame: position the tracked titles at their slabs' projected anchors.
  const handleFrame = useCallback((state) => {
    const shown = new Set();
    state.titles.forEach(({ index, x, y, opacity }) => {
      const el = titleRefs.current[index];
      if (!el) return;
      shown.add(index);
      el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
      el.style.opacity = opacity.toFixed(3);
    });
    titleRefs.current.forEach((el, i) => {
      if (el && !shown.has(i)) el.style.opacity = "0";
    });
    if (glowRef.current && state.mood) {
      glowRef.current.style.setProperty("--mood", state.mood.join(", "));
    }

    // Intro fades out as the journey begins; outro resolves at the end.
    const p = state.p ?? 0;
    if (introRef.current) {
      const o = 1 - smoothstep01(p, 0.015, 0.08);
      introRef.current.style.opacity = o.toFixed(3);
      introRef.current.style.pointerEvents = o > 0.05 ? "auto" : "none";
    }
    if (outroRef.current) {
      const o = smoothstep01(p, 0.9, 0.985);
      outroRef.current.style.opacity = o.toFixed(3);
      outroRef.current.style.pointerEvents = o > 0.5 ? "auto" : "none";
    }
    // Info panel yields to the intro/outro overlays at the extremes.
    if (panelRef.current) {
      const pv =
        Math.min(smoothstep01(p, 0.04, 0.11), 1 - smoothstep01(p, 0.88, 0.95));
      panelRef.current.style.opacity = pv.toFixed(3);
    }
  }, []);

  const handleIndex = useCallback((i) => {
    activeRef.current = i;
    setActive(i);
  }, []);

  // Keyboard nav: Arrow/Page keys jump between stations (not raw scroll).
  useEffect(() => {
    if (tier3) return undefined;
    const onKey = (e) => {
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        scrollToStation(activeRef.current + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        scrollToStation(activeRef.current - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [tier3, scrollToStation]);

  if (tier3) return null;

  return (
    <div className={styles.experience}>
      <div className={styles.canvasWrap}>
        <VoidTrajectory
          items={items}
          scrollId={scrollId}
          onIndex={handleIndex}
          onFrame={handleFrame}
          onContextLost={onContextLost}
        />
      </div>

      {/* Ambient mood glows — --mood is lerped per frame toward the accent. */}
      <div ref={glowRef} className={styles.glowLayer} aria-hidden="true">
        <span className={`${styles.glow} ${styles.glowA}`} />
        <span className={`${styles.glow} ${styles.glowB}`} />
      </div>

      {/* Tracked titles — positioned each frame from projected slab anchors;
          glitch fires as each becomes active. */}
      <div className={styles.titles}>
        {items.map((item, i) => (
          <TrackedTitle
            key={item.slug}
            ref={(el) => (titleRefs.current[i] = el)}
            text={item.project}
            active={i === active}
          />
        ))}
      </div>

      {/* Intro — rendered on load (the LCP element); fades out on scroll. */}
      <div ref={introRef} className={styles.intro}>
        <p className={styles.introEyebrow}>{total} builds · one obsession</p>
        <h1 className={styles.introTitle}>Hackathon Journey</h1>
        <p className={styles.introSub}>
          Fly through every project I&apos;ve shipped against the clock.
        </p>
        <span className={styles.scrollHint} aria-hidden="true">
          scroll
          <span className={styles.chevron} />
        </span>
      </div>

      {/* Outro — stats + CTAs, fades in at the end of the path. */}
      <div
        ref={outroRef}
        className={styles.outro}
        style={{ opacity: 0, pointerEvents: "none" }}
      >
        <p className={styles.outroEyebrow}>The run so far</p>
        <div className={styles.stats}>
          <span className={styles.statBig}>{total}</span>
          <span className={styles.statUnit}>hackathons</span>
          {highlights.map((h) => (
            <span key={h} className={styles.statChip}>
              {h}
            </span>
          ))}
        </div>
        <div className={styles.outroActions}>
          <Link
            href="/certifications"
            className={`${styles.cta} ${styles.ctaPrimary} link`}
            style={{ background: "#7000ff" }}
          >
            View Certifications
          </Link>
          <Link
            href="/#contact"
            className={`${styles.cta} ${styles.ctaSecondary} link`}
          >
            Let&apos;s Talk
          </Link>
        </div>
      </div>

      <div ref={panelRef}>
        <HackathonInfoPanel item={items[active]} />
      </div>
      <HackathonRail items={items} active={active} onJump={scrollToStation} />
    </div>
  );
};

export default HackathonsExperience;
