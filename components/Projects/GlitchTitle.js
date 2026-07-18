import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./Projects.module.scss";

// Centred-project title as real DOM text (SEO + crisp type), overlaid on the
// canvas. On each project change it runs a short slice/RGB-split glitch and
// settles clean. Fires only on change — never loops — and is skipped entirely
// under prefers-reduced-motion.
const GlitchTitle = ({ text }) => {
  const mainRef = useRef(null);
  const redRef = useRef(null);
  const cyanRef = useRef(null);
  const firstRun = useRef(true);

  useEffect(() => {
    const main = mainRef.current;
    const red = redRef.current;
    const cyan = cyanRef.current;
    if (!main || !text) return undefined;

    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches;

    // No glitch on first paint or under reduced motion — just show the text.
    if (reduced || firstRun.current) {
      firstRun.current = false;
      gsap.set([red, cyan], { opacity: 0, x: 0 });
      gsap.set(main, { x: 0, skewX: 0, clipPath: "inset(0% 0 0% 0)" });
      return undefined;
    }

    const tl = gsap.timeline();
    tl.set([red, cyan], { opacity: 0.7 })
      // frame 1 — top slice kicks right, RGB splits apart
      .set(main, { skewX: 5, x: -5, clipPath: "inset(12% 0 58% 0)" })
      .set(red, { x: -7 })
      .set(cyan, { x: 7 })
      // frame 2 — bottom slice kicks the other way
      .set(
        main,
        { skewX: -4, x: 6, clipPath: "inset(62% 0 12% 0)" },
        "+=0.1"
      )
      .set(red, { x: 6 }, "<")
      .set(cyan, { x: -6 }, "<")
      // frame 3 — mid slice, smaller
      .set(
        main,
        { skewX: 2, x: -2, clipPath: "inset(38% 0 40% 0)" },
        "+=0.1"
      )
      .set(red, { x: -3 }, "<")
      .set(cyan, { x: 3 }, "<")
      // settle clean
      .set(main, { skewX: 0, x: 0, clipPath: "inset(0% 0 0% 0)" }, "+=0.1")
      .to([red, cyan], { opacity: 0, x: 0, duration: 0.14 }, "<");

    return () => tl.kill();
  }, [text]);

  if (!text) return null;

  return (
    <div className={styles.glitchWrap}>
      <span
        ref={redRef}
        className={`${styles.glitchLayer} ${styles.glitchRed}`}
        aria-hidden="true"
      >
        {text}
      </span>
      <span
        ref={cyanRef}
        className={`${styles.glitchLayer} ${styles.glitchCyan}`}
        aria-hidden="true"
      >
        {text}
      </span>
      <h3 ref={mainRef} className={styles.glitchTitle}>
        {text}
      </h3>
    </div>
  );
};

export default GlitchTitle;
