import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { CERTIFICATIONS } from "../../constants";
import CertificationCard from "./CertificationCard";
import CertificationLightbox from "./CertificationLightbox";
import styles from "./Certifications.module.scss";

const ALL = "All";

const Certifications = () => {
  const sectionRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState(ALL);
  const [selected, setSelected] = useState(null);

  const filters = useMemo(() => {
    const counts = CERTIFICATIONS.reduce((acc, cert) => {
      acc[cert.category] = (acc[cert.category] || 0) + 1;
      return acc;
    }, {});

    return [
      { name: ALL, count: CERTIFICATIONS.length },
      ...Object.entries(counts).map(([name, count]) => ({ name, count })),
    ];
  }, []);

  const visible = useMemo(
    () =>
      activeFilter === ALL
        ? CERTIFICATIONS
        : CERTIFICATIONS.filter((cert) => cert.category === activeFilter),
    [activeFilter]
  );

  useEffect(() => {
    const revealTl = gsap.timeline({
      defaults: { ease: "power2.out" },
      paused: true,
    });

    revealTl.from(sectionRef.current.querySelectorAll(".staggered-reveal"), {
      opacity: 0,
      y: 24,
      duration: 0.5,
      stagger: 0.12,
    });

    // Plays through once on enter (fires immediately when the section is
    // already in view on load) — a scrubbed reveal would leave the grid
    // stranded at partial opacity on a page that opens at the section.
    const scrollTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => revealTl.play(),
    });

    return () => {
      scrollTrigger.kill();
      revealTl.progress(1);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="w-full relative select-none section-container py-8"
    >
      <div className="flex flex-col">
        <p className="uppercase tracking-widest text-gray-light-1 staggered-reveal">
          CERTIFICATIONS
        </p>
        <h1 className="text-6xl mt-2 font-medium text-gradient w-fit staggered-reveal">
          Certifications
        </h1>
        <h2 className="text-[1.65rem] font-medium md:max-w-lg max-w-sm mt-2 staggered-reveal">
          Hackathons, bootcamps and AI challenges — the rooms where I learned to
          build fast.
        </h2>

        <div className={`${styles.filterRow} mt-10 staggered-reveal`}>
          {filters.map((filter) => (
            <button
              key={filter.name}
              type="button"
              onClick={() => setActiveFilter(filter.name)}
              aria-pressed={activeFilter === filter.name}
              className={`${styles.filterChip} link ${
                activeFilter === filter.name ? styles.filterChipActive : ""
              }`}
            >
              {filter.name}
              <span className={styles.filterCount}>{filter.count}</span>
            </button>
          ))}
        </div>

        <div className={`${styles.grid} mt-8 staggered-reveal`}>
          {visible.map((certification) => (
            <CertificationCard
              key={certification.slug}
              certification={certification}
              onOpen={() => setSelected(certification)}
            />
          ))}
        </div>
      </div>

      {selected && (
        <CertificationLightbox
          certification={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
};

export default Certifications;
