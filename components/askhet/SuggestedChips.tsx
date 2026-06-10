import { memo } from "react";

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
      className="flex flex-wrap gap-2 gap-y-3 sm:gap-y-2 mt-4"
    >
      {CHIPS.map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => onSelect(c)}
          disabled={disabled}
          className="font-mono text-xs px-3 py-2.5 min-h-[44px] sm:min-h-[36px] inline-flex items-center rounded-md border border-purple/40 text-gray-light-2 hover:border-purple hover:text-white hover:bg-purple/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-purple"
        >
          {c}
        </button>
      ))}
    </div>
  );
}

export default memo(SuggestedChips);
