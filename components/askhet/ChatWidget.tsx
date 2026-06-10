import { useCallback, useEffect, useRef, useState } from "react";
import ChatWindow from "./ChatWindow";

const TOOLTIP_DISMISS_KEY = "askhet-tooltip-dismissed";
const TOOLTIP_DELAY_MS = 5000;

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // First-visit tooltip after 5s, unless dismissed.
  useEffect(() => {
    if (typeof window === "undefined") return;
    let dismissed = false;
    try {
      dismissed = window.localStorage.getItem(TOOLTIP_DISMISS_KEY) === "1";
    } catch {
      /* localStorage might be disabled */
    }
    if (dismissed) return;
    const t = window.setTimeout(
      () => setTooltipVisible(true),
      TOOLTIP_DELAY_MS
    );
    return () => window.clearTimeout(t);
  }, []);

  const dismissTooltip = useCallback(() => {
    setTooltipVisible(false);
    try {
      window.localStorage.setItem(TOOLTIP_DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  const openPanel = useCallback(() => {
    setOpen(true);
    if (tooltipVisible) dismissTooltip();
  }, [tooltipVisible, dismissTooltip]);

  const closePanel = useCallback(() => {
    setOpen(false);
    queueMicrotask(() => buttonRef.current?.focus());
  }, []);

  // Esc-to-close + initial focus + focus trap + body scroll lock — only when open.
  useEffect(() => {
    if (!open || !panelRef.current) return;
    const panel = panelRef.current;

    // Body scroll lock.
    const prevBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Esc handler.
    const onDocKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        closePanel();
      }
    };
    document.addEventListener("keydown", onDocKey);

    // Focus trap on Tab.
    const onPanelKey = (e: globalThis.KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusables = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter((el) => el.offsetParent !== null);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    panel.addEventListener("keydown", onPanelKey);

    // Initial focus: on mobile prefer the panel container (avoid surprise
    // keyboard); on desktop drop straight into the textarea.
    const isDesktop =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(min-width: 640px)").matches;
    const t = window.setTimeout(() => {
      if (isDesktop) {
        const ta = panel.querySelector("textarea");
        if (ta instanceof HTMLTextAreaElement) {
          ta.focus();
          return;
        }
      }
      panel.focus();
    }, 50);

    return () => {
      document.removeEventListener("keydown", onDocKey);
      panel.removeEventListener("keydown", onPanelKey);
      document.body.style.overflow = prevBodyOverflow;
      window.clearTimeout(t);
    };
  }, [open, closePanel]);

  return (
    <>
      {/* Floating button */}
      <button
        ref={buttonRef}
        type="button"
        aria-label={open ? "Close AskHet AI chat" : "Open AskHet AI chat"}
        aria-expanded={open}
        aria-controls="askhet-panel"
        aria-haspopup="dialog"
        title={open ? "Close AskHet" : "Ask Het (AI)"}
        onClick={() => (open ? closePanel() : openPanel())}
        style={{
          bottom: "calc(1.25rem + env(safe-area-inset-bottom, 0px))",
          right: "calc(1.25rem + env(safe-area-inset-right, 0px))",
        }}
        className="askhet-fab fixed z-[50] w-14 h-14 rounded-full bg-purple text-white flex items-center justify-center shadow-lg shadow-purple/40 hover:shadow-purple/70 motion-safe:transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      >
        <span
          aria-hidden="true"
          className="font-mono text-base font-bold tracking-tighter"
        >
          ❯_
        </span>
      </button>

      {/* First-visit tooltip */}
      {tooltipVisible && !open && (
        <div
          style={{
            bottom: "calc(5.75rem + env(safe-area-inset-bottom, 0px))",
            right: "calc(1.25rem + env(safe-area-inset-right, 0px))",
          }}
          className="askhet-tooltip fixed z-[55] font-mono text-xs bg-gray-dark-5 border border-purple/40 px-3 py-2 rounded-md shadow-lg shadow-black/40 text-gray-light-1 flex items-center gap-3 max-w-[14rem]"
        >
          <span>Ask AI about Het</span>
          <button
            type="button"
            onClick={dismissTooltip}
            aria-label="Dismiss tooltip"
            title="Dismiss"
            className="text-gray-light-3 hover:text-white inline-flex items-center justify-center min-w-[32px] min-h-[32px] -m-1 p-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-purple"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}

      {/* Backdrop + panel */}
      {open && (
        <>
          <div
            onClick={closePanel}
            aria-hidden="true"
            className="fixed inset-0 z-[60] bg-black/40 motion-safe:transition-opacity"
          />
          <div
            ref={panelRef}
            id="askhet-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="askhet-dialog-title"
            aria-keyshortcuts="Escape"
            tabIndex={-1}
            className="askhet-panel fixed z-[70] inset-0 sm:inset-auto sm:bottom-5 sm:right-5 sm:w-[380px] sm:h-[600px] sm:max-h-[calc(100vh-2.5rem)] flex outline-none focus-visible:ring-2 focus-visible:ring-purple"
          >
            <ChatWindow onClose={closePanel} variant="widget" />
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes askhetSlideUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (prefers-reduced-motion: no-preference) {
          :global(.askhet-panel) {
            animation: askhetSlideUp 180ms ease-out;
          }
          :global(.askhet-tooltip) {
            animation: askhetSlideUp 200ms ease-out;
          }
        }
      `}</style>
    </>
  );
}
