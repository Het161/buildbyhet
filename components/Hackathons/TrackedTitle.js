import { forwardRef, useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./Hackathons.module.scss";

// A project title locked to its slab. The OUTER element is positioned every
// frame by the parent (translate to the projected anchor); the INNER glitch
// layers animate on their own transforms, so positioning and glitch never
// fight. The glitch fires once each time the station becomes active.
const TrackedTitle = forwardRef(({ text, active }, ref) => {
  const mainRef = useRef(null);
  const redRef = useRef(null);
  const cyanRef = useRef(null);
  const wasActive = useRef(false);

  useEffect(() => {
    if (!active || wasActive.current) {
      wasActive.current = active;
      return undefined;
    }
    wasActive.current = true;

    const main = mainRef.current;
    const red = redRef.current;
    const cyan = cyanRef.current;
    if (!main) return undefined;

    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches;
    if (reduced) return undefined;

    const tl = gsap.timeline();
    tl.set([red, cyan], { opacity: 0.7 })
      .set(main, { skewX: 5, x: -5, clipPath: "inset(12% 0 58% 0)" })
      .set(red, { x: -7 })
      .set(cyan, { x: 7 })
      .set(main, { skewX: -4, x: 6, clipPath: "inset(62% 0 12% 0)" }, "+=0.1")
      .set(red, { x: 6 }, "<")
      .set(cyan, { x: -6 }, "<")
      .set(main, { skewX: 2, x: -2, clipPath: "inset(38% 0 40% 0)" }, "+=0.1")
      .set(red, { x: -3 }, "<")
      .set(cyan, { x: 3 }, "<")
      .set(main, { skewX: 0, x: 0, clipPath: "inset(0% 0 0% 0)" }, "+=0.1")
      .to([red, cyan], { opacity: 0, x: 0, duration: 0.14 }, "<");

    return () => tl.kill();
  }, [active]);

  return (
    <span ref={ref} className={styles.trackedTitle} style={{ opacity: 0 }}>
      <span className={styles.glitchInner}>
        <span
          ref={redRef}
          className={`${styles.gLayer} ${styles.gRed}`}
          aria-hidden="true"
        >
          {text}
        </span>
        <span
          ref={cyanRef}
          className={`${styles.gLayer} ${styles.gCyan}`}
          aria-hidden="true"
        >
          {text}
        </span>
        <span ref={mainRef} className={styles.gMain}>
          {text}
        </span>
      </span>
    </span>
  );
});

TrackedTitle.displayName = "TrackedTitle";

export default TrackedTitle;
