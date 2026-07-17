import { useEffect, useRef } from "react";
import gsap from "gsap";

const Cursor = ({ isDesktop }) => {
  const cursor = useRef(null);
  const follower = useRef(null);

  useEffect(() => {
    if (isDesktop && document.body.clientWidth > 767) {
      follower.current.classList.remove("hidden");
      cursor.current.classList.remove("hidden");

      const moveCircle = (e) => {
        gsap.to(cursor.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: "none",
        });
        gsap.to(follower.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.3,
          ease: "none",
        });
      };

      const hover = () => {
        gsap.to(cursor.current, {
          scale: 0.5,
          duration: 0.3,
        });
        gsap.to(follower.current, {
          scale: 3,
          duration: 0.3,
        });
      };

      const unHover = () => {
        gsap.to(cursor.current, {
          scale: 1,
          duration: 0.3,
        });
        gsap.to(follower.current, {
          scale: 1,
          duration: 0.3,
        });
      };

      document.addEventListener("mousemove", moveCircle);

      // Delegated hover detection: works for `.link` elements added to the DOM
      // AFTER mount (lazy-loaded WebGL gallery CTAs, project/cert modals) —
      // a one-time querySelectorAll would miss those. mouseover/mouseout
      // bubble (unlike mouseenter/mouseleave), so we track the nearest
      // `.link` ancestor and only fire on entering/leaving its boundary.
      let activeLink = null;

      const onOver = (e) => {
        const link = e.target.closest?.(".link");
        if (link && link !== activeLink) {
          activeLink = link;
          hover();
        }
      };

      const onOut = (e) => {
        if (!activeLink) return;
        // Ignore moves that stay within the same `.link` subtree.
        if (e.relatedTarget && activeLink.contains(e.relatedTarget)) return;
        activeLink = null;
        unHover();
      };

      document.addEventListener("mouseover", onOver);
      document.addEventListener("mouseout", onOut);

      return () => {
        document.removeEventListener("mousemove", moveCircle);
        document.removeEventListener("mouseover", onOver);
        document.removeEventListener("mouseout", onOut);
      };
    }
  }, [cursor, follower, isDesktop]);

  return (
    <>
      <div
        ref={cursor}
        className="bg-white rounded-full mix-blend-difference fixed w-4 h-4 select-none pointer-events-none hidden"
        style={{ zIndex: 10000 }}
      />
      <div
        ref={follower}
        className="bg-white/[0.02] border border-white/[0.2] rounded-full fixed -top-3 -left-3 w-10 h-10 select-none pointer-events-none hidden"
        style={{ zIndex: 10000 }}
      />
    </>
  );
};

export default Cursor;
