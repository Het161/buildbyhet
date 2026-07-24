import styles from "./Hackathons.module.scss";

// Fixed right-edge progress rail — one accessible dot per station, active dot
// enlarged in its accent, plus year markers where a date exists.
const HackathonRail = ({ items, active, onJump }) => (
  <nav className={styles.rail} aria-label="Hackathon stations">
    <ol className={styles.railList}>
      {items.map((item, i) => {
        const isActive = i === active;
        const year = (item.date || "").match(/\b(20\d{2})\b/)?.[1];
        return (
          <li key={item.slug} className={styles.railItem}>
            <button
              type="button"
              onClick={() => onJump(i)}
              aria-label={`Go to ${item.project}${
                item.event ? ` — ${item.event}` : ""
              }`}
              aria-current={isActive ? "true" : undefined}
              className={`${styles.railDot} link`}
              style={
                isActive
                  ? {
                      background: item.accent || "#8b31ff",
                      borderColor: item.accent || "#8b31ff",
                    }
                  : undefined
              }
            />
            {year && <span className={styles.railYear}>{year}</span>}
          </li>
        );
      })}
    </ol>
  </nav>
);

export default HackathonRail;
