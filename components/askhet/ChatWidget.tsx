import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import ChatWindow from "./ChatWindow";
import styles from "./askhet.module.css";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function ChatWidget() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // SSR guard — createPortal needs a DOM node. Even with dynamic({ssr:false})
  // in _app.js this is belt-and-suspenders cheap.
  useEffect(() => {
    setMounted(true);
  }, []);

  const openPanel = useCallback(() => setOpen(true), []);
  const closePanel = useCallback(() => {
    setOpen(false);
    queueMicrotask(() => buttonRef.current?.focus());
  }, []);

  // Esc + focus trap + initial focus + (mobile-only) body scroll lock.
  useEffect(() => {
    if (!open || !panelRef.current) return;
    const panel = panelRef.current;

    const isMobile =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(max-width: 640px)").matches;
    let prevOverflow = "";
    if (isMobile) {
      prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }

    const onDocKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        closePanel();
      }
    };
    document.addEventListener("keydown", onDocKey);

    const onPanelKey = (e: globalThis.KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusables = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter((el) => el.offsetParent !== null);
      if (!focusables.length) return;
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

    // Initial focus: textarea on desktop, panel itself on mobile (avoid
    // surprise keyboard pop).
    const focusTimer = window.setTimeout(() => {
      if (!isMobile) {
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
      if (isMobile) document.body.style.overflow = prevOverflow;
      window.clearTimeout(focusTimer);
    };
  }, [open, closePanel]);

  if (!mounted) return null;

  return createPortal(
    <>
      {/* Floating button — hidden while the panel is open (per spec). */}
      {!open && (
        <button
          ref={buttonRef}
          type="button"
          aria-label="Open AskHet chat"
          aria-haspopup="dialog"
          title="Ask Het (AI)"
          onClick={openPanel}
          className={`${styles.root} ${styles.fab}`}
        >
          <span aria-hidden="true">❯_</span>
        </button>
      )}

      {/* Panel + backdrop */}
      {open && (
        <>
          <div
            aria-hidden="true"
            onClick={closePanel}
            className={`${styles.root} ${styles.backdrop}`}
          />
          <div
            ref={panelRef}
            id="askhet-panel"
            tabIndex={-1}
            aria-keyshortcuts="Escape"
            className={styles.root}
          >
            <ChatWindow onClose={closePanel} variant="widget" />
          </div>
        </>
      )}
    </>,
    document.body
  );
}
