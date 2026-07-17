import { useEffect, useRef } from "react";
import Gallery from "./Gallery";

// React wrapper around the OGL Gallery. Loaded via next/dynamic({ ssr:false })
// from Projects.js, so window/document are always available here. Owns the
// canvas host element plus the lifecycle glue: resize, viewport-visibility
// pause/resume, tab-visibility pause, and full teardown on unmount. The ring
// reads page scroll itself (see Gallery.update) so no ScrollTrigger is needed.
const OrbitalGallery = ({ items, onIndex, onActivate, onApi, onContextLost }) => {
  const containerRef = useRef(null);
  const galleryRef = useRef(null);
  const onIndexRef = useRef(onIndex);
  const onActivateRef = useRef(onActivate);
  const onApiRef = useRef(onApi);
  const onContextLostRef = useRef(onContextLost);

  // Keep callbacks fresh without re-initialising the WebGL context.
  onIndexRef.current = onIndex;
  onActivateRef.current = onActivate;
  onApiRef.current = onApi;
  onContextLostRef.current = onContextLost;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const gallery = new Gallery(container, {
      items,
      onIndex: (i) => onIndexRef.current?.(i),
      onActivate: (i) => onActivateRef.current?.(i),
      onContextLost: () => onContextLostRef.current?.(),
    });
    galleryRef.current = gallery;
    gallery.start();

    // Expose an imperative API for the DOM prev/next controls.
    onApiRef.current?.({ snap: (dir) => galleryRef.current?.snap(dir) });

    const resizeObserver = new ResizeObserver(() => gallery.onResize());
    resizeObserver.observe(container);

    // Pause the render loop entirely when the section is off-screen.
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? gallery.start() : gallery.pause()),
      { threshold: 0 }
    );
    io.observe(container);

    const onVisibility = () => {
      if (document.hidden) gallery.pause();
      else if (isOnScreen(container)) gallery.start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      resizeObserver.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      gallery.destroy();
      galleryRef.current = null;
      onApiRef.current?.(null);
    };
    // items is stable for the page's lifetime; intentionally init-once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className="orbital-canvas-host link"
      style={{
        width: "100%",
        height: "100%",
        touchAction: "pan-y",
        userSelect: "none",
      }}
      aria-hidden="true"
    />
  );
};

function isOnScreen(el) {
  const r = el.getBoundingClientRect();
  return r.bottom > 0 && r.top < window.innerHeight;
}

export default OrbitalGallery;
