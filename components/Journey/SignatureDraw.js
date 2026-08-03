import { useEffect, useRef, useState } from "react";

// Inlines an SVG and draws its strokes on when `play` flips true. Works for a
// single-stroke SVG or a potrace outline (we stroke the outline, then let the
// existing fill sit under it). A missing/!ok file renders nothing — no gap.
const SignatureDraw = ({ src, play, className }) => {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);
  const drawn = useRef(false);

  useEffect(() => {
    let cancelled = false;
    fetch(src)
      .then((r) => (r.ok ? r.text() : null))
      .then((txt) => {
        if (cancelled || !txt || !txt.includes("<svg") || !ref.current) return;
        ref.current.innerHTML = txt;
        const svg = ref.current.querySelector("svg");
        if (svg) {
          svg.removeAttribute("width");
          svg.removeAttribute("height");
          svg.style.width = "100%";
          svg.style.height = "100%";
        }
        ref.current
          .querySelectorAll("path, line, polyline, polygon")
          .forEach((el) => {
            const len = el.getTotalLength ? el.getTotalLength() : 0;
            if (!len) return;
            el.style.strokeDasharray = String(len);
            el.style.strokeDashoffset = String(len);
          });
        setReady(true);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [src]);

  useEffect(() => {
    if (!ready || !play || drawn.current || !ref.current) return;
    drawn.current = true;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    ref.current
      .querySelectorAll("path, line, polyline, polygon")
      .forEach((el, i) => {
        if (!el.getTotalLength || !el.getTotalLength()) return;
        if (reduce) {
          el.style.strokeDashoffset = "0";
          return;
        }
        el.style.transition = `stroke-dashoffset 1.1s ease ${i * 0.25}s`;
        requestAnimationFrame(() => {
          el.style.strokeDashoffset = "0";
        });
      });
  }, [ready, play]);

  return (
    <div ref={ref} className={className} role="img" aria-label="Het Patel's signature" />
  );
};

export default SignatureDraw;
