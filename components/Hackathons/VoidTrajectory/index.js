import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Scene from "./Scene";

gsap.registerPlugin(ScrollTrigger);

// React wrapper: fixed full-viewport canvas host. Native page scroll scrubs the
// camera via a ScrollTrigger tween on scene.scroll.p — wheel/touch are never
// captured. Owns resize, tab-visibility pause, and full teardown.
const VoidTrajectory = ({ items, scrollId, onIndex, onFrame, onContextLost }) => {
  const hostRef = useRef(null);
  const onIndexRef = useRef(onIndex);
  const onFrameRef = useRef(onFrame);
  const onContextLostRef = useRef(onContextLost);
  onIndexRef.current = onIndex;
  onFrameRef.current = onFrame;
  onContextLostRef.current = onContextLost;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    const scene = new Scene(host, { items });
    scene.onIndex = (i) => onIndexRef.current?.(i);
    scene.onFrame = (s) => onFrameRef.current?.(s);
    scene.onContextLost = () => onContextLostRef.current?.();
    scene.start();

    // Scrub the whole page scroll onto scene.scroll.p ∈ [0,1].
    const tween = gsap.to(scene.scroll, {
      p: 1,
      ease: "none",
      scrollTrigger: {
        trigger: `#${scrollId}`,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
      },
    });

    const ro = new ResizeObserver(() => scene.onResize());
    ro.observe(host);

    const onVis = () =>
      document.hidden ? scene.pause() : scene.start();
    document.addEventListener("visibilitychange", onVis);

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      scene.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={hostRef}
      className="hk-canvas-host"
      style={{ position: "fixed", inset: 0, touchAction: "pan-y" }}
      aria-hidden="true"
    />
  );
};

export default VoidTrajectory;
