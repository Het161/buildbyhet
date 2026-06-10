export default function TypingIndicator() {
  return (
    <div
      role="status"
      className="font-mono text-xs text-gray-light-3 px-1 py-2 select-none"
    >
      <span aria-hidden="true" className="text-purple-light">
        askhet ❯
      </span>{" "}
      <span className="sr-only">AskHet is typing</span>
      <span aria-hidden="true">
        typing
        <span className="inline-block ml-0.5 motion-safe:animate-pulse">…</span>
      </span>
    </div>
  );
}
