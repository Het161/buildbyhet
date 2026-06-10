import { memo } from "react";
import styles from "./askhet.module.css";

const CHIPS = [
  "What has Het built?",
  "What's his tech stack?",
  "Tell me about HireLoop",
  "Is Het available for work?",
];

interface Props {
  onSelect: (text: string) => void;
  disabled?: boolean;
}

function SuggestedChips({ onSelect, disabled }: Props) {
  return (
    <div
      role="group"
      aria-label="Suggested questions"
      className={styles.chipList}
    >
      {CHIPS.map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => onSelect(c)}
          disabled={disabled}
          className={styles.chip}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

export default memo(SuggestedChips);
