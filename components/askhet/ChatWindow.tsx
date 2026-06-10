import {
  useCallback,
  useEffect,
  useRef,
  useState,
  KeyboardEvent,
  ChangeEvent,
  FormEvent,
} from "react";
import clsx from "clsx";
import Message, { ChatMessage } from "./Message";
import SuggestedChips from "./SuggestedChips";
import TypingIndicator from "./TypingIndicator";
import styles from "./askhet.module.css";

const HISTORY_KEY = "askhet-history";
const MAX_INPUT_CHARS = 500;
const HISTORY_TO_SEND = 8;

interface Props {
  /** When provided, renders a close (×) button in the header. */
  onClose?: () => void;
  /** "widget" uses the floating panel; "page" uses the full-page container. */
  variant?: "widget" | "page";
}

const newId = (): string => {
  try {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
      return crypto.randomUUID();
    }
  } catch {
    /* fall through */
  }
  return `m-${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

export default function ChatWindow({ onClose, variant = "widget" }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pinnedToBottom, setPinnedToBottom] = useState(true);
  const [hasNewBelow, setHasNewBelow] = useState(false);

  const abortRef = useRef<AbortController | null>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const lastUserRef = useRef<string>("");
  const messagesRef = useRef<ChatMessage[]>([]);
  const isStreamingRef = useRef(false);
  const mountedRef = useRef(true);
  const hydratedRef = useRef(false);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);
  useEffect(() => {
    isStreamingRef.current = isStreaming;
  }, [isStreaming]);

  // Hydrate from sessionStorage once.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.sessionStorage.getItem(HISTORY_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setMessages(
            parsed
              .filter(
                (m: any) =>
                  m &&
                  (m.role === "user" || m.role === "assistant") &&
                  typeof m.content === "string"
              )
              .map((m: any) => ({
                id: typeof m.id === "string" ? m.id : newId(),
                role: m.role,
                content: m.content,
              }))
          );
        }
      }
    } catch {
      /* ignore */
    }
  }, []);

  // Persist only when idle.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!hydratedRef.current) {
      hydratedRef.current = true;
      return;
    }
    if (isStreaming) return;
    try {
      window.sessionStorage.setItem(HISTORY_KEY, JSON.stringify(messages));
    } catch {
      /* quota or disabled */
    }
  }, [messages, isStreaming]);

  // Abort in-flight on unmount.
  useEffect(() => {
    return () => {
      mountedRef.current = false;
      abortRef.current?.abort();
    };
  }, []);

  // Auto-scroll.
  useEffect(() => {
    if (!logRef.current) return;
    if (pinnedToBottom) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
      setHasNewBelow(false);
    } else {
      setHasNewBelow(true);
    }
  }, [messages, pinnedToBottom]);

  const handleLogScroll = useCallback(() => {
    const el = logRef.current;
    if (!el) return;
    const distFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    const atBottom = distFromBottom < 80;
    setPinnedToBottom(atBottom);
    if (atBottom) setHasNewBelow(false);
  }, []);

  const send = useCallback(
    async (text: string, historyOverride?: ChatMessage[]) => {
      const trimmed = text.trim();
      if (!trimmed || isStreamingRef.current) return;
      const clipped = trimmed.slice(0, MAX_INPUT_CHARS);

      const userMsg: ChatMessage = {
        id: newId(),
        role: "user",
        content: clipped,
      };
      lastUserRef.current = clipped;

      const base = historyOverride ?? messagesRef.current;
      const baseMessages = [...base, userMsg];
      const historyToSend = baseMessages.slice(-HISTORY_TO_SEND);
      const placeholder: ChatMessage = {
        id: newId(),
        role: "assistant",
        content: "",
      };

      setMessages([...baseMessages, placeholder]);
      setInput("");
      setError(null);
      setIsStreaming(true);
      isStreamingRef.current = true;
      setPinnedToBottom(true);
      // Reset textarea height.
      if (inputRef.current) inputRef.current.style.height = "auto";

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const resp = await fetch("/api/askhet", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: historyToSend }),
          signal: controller.signal,
        });

        if (!resp.ok) {
          let msg = "connection hiccup — try again";
          try {
            const j = await resp.json();
            if (j?.error) msg = j.error;
          } catch {
            /* ignore */
          }
          if (mountedRef.current) {
            setMessages((prev) => prev.slice(0, -1));
          }
          throw new Error(msg);
        }
        if (!resp.body) {
          if (mountedRef.current) setMessages((prev) => prev.slice(0, -1));
          throw new Error("empty response");
        }

        const reader = resp.body.getReader();
        const decoder = new TextDecoder();
        let acc = "";
        try {
          // eslint-disable-next-line no-constant-condition
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            acc += decoder.decode(value, { stream: true });
            if (!mountedRef.current) break;
            setMessages((prev) => {
              const next = prev.slice();
              const last = next[next.length - 1];
              if (last && last.role === "assistant") {
                next[next.length - 1] = { ...last, content: acc };
              }
              return next;
            });
          }
        } finally {
          try {
            await reader.cancel();
          } catch {
            /* ignore */
          }
        }

        if (!acc.trim() && mountedRef.current) {
          setMessages((prev) => prev.slice(0, -1));
          setError("the model returned an empty response — try again");
        }
      } catch (err: any) {
        if (err?.name === "AbortError") {
          if (mountedRef.current) {
            setMessages((prev) => {
              const last = prev[prev.length - 1];
              if (last && last.role === "assistant" && !last.content) {
                return prev.slice(0, -1);
              }
              return prev;
            });
          }
        } else if (mountedRef.current) {
          setError(err?.message || "connection hiccup — try again");
        }
      } finally {
        if (mountedRef.current) setIsStreaming(false);
        isStreamingRef.current = false;
        abortRef.current = null;
      }
    },
    []
  );

  const handleAbort = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const handleRetry = useCallback(() => {
    if (!lastUserRef.current) return;
    setError(null);
    let trimmed = messagesRef.current.slice();
    if (trimmed.length && trimmed[trimmed.length - 1].role === "assistant") {
      trimmed = trimmed.slice(0, -1);
    }
    if (trimmed.length && trimmed[trimmed.length - 1].role === "user") {
      trimmed = trimmed.slice(0, -1);
    }
    setMessages(trimmed);
    void send(lastUserRef.current, trimmed);
  }, [send]);

  const handleClear = useCallback(() => {
    abortRef.current?.abort();
    setMessages([]);
    setError(null);
    setInput("");
    lastUserRef.current = "";
    if (typeof window !== "undefined") {
      try {
        window.sessionStorage.removeItem(HISTORY_KEY);
      } catch {
        /* ignore */
      }
    }
    inputRef.current?.focus();
  }, []);

  const handleChipSelect = useCallback(
    (text: string) => {
      void send(text);
    },
    [send]
  );

  const onInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value.slice(0, MAX_INPUT_CHARS);
    setInput(value);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 96)}px`;
  };

  const onInputKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void send(input);
    }
  };

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isStreaming) {
      handleAbort();
    } else {
      void send(input);
    }
  };

  let lastAssistantIndex = -1;
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].role === "assistant") {
      lastAssistantIndex = i;
      break;
    }
  }

  const showTypingIndicator =
    isStreaming &&
    messages.length > 0 &&
    messages[messages.length - 1].role === "assistant" &&
    !messages[messages.length - 1].content;

  const charCount = input.length;
  const isEmpty = messages.length === 0;
  const isPanel = variant === "widget";

  return (
    <div
      className={clsx(styles.root, isPanel ? styles.panel : styles.pagePanel)}
      role={isPanel ? "dialog" : undefined}
      aria-modal={isPanel ? "true" : undefined}
      aria-labelledby={isPanel ? "askhet-dialog-title" : undefined}
    >
      {/* Header */}
      <header className={styles.header}>
        <span id="askhet-dialog-title" className={styles.headerTitle}>
          ❯ askhet
        </span>
        <span aria-hidden="true" className={styles.dot} />
        <span className={styles.srOnly}>AskHet status: online</span>
        <span className={styles.headerStatus}>online</span>
        <div className={styles.headerSpacer} />
        <span className={styles.headerModel}>groq · llama-3.3</span>
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear chat history"
          title="Clear chat history"
          className={styles.iconBtn}
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
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
          </svg>
        </button>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close chat"
            title="Close chat"
            className={styles.iconBtn}
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
        )}
      </header>

      {/* Messages */}
      <div
        ref={logRef}
        onScroll={handleLogScroll}
        className={styles.messages}
        role="log"
        aria-label="Chat conversation"
        aria-busy={isStreaming}
      >
        {isEmpty ? (
          <>
            <article
              aria-label="AskHet intro"
              className={clsx(styles.msgWrap, styles.msgWrapAssistant)}
            >
              <span className={styles.label}>
                askhet <span className={styles.glyph}>❯</span>
              </span>
              <div className={clsx(styles.bubble, styles.bubbleAssistant)}>
                <div className={styles.intro}>
                  Hi! I&apos;m <span className={styles.brand}>AskHet</span> 👋
                  — ask me anything about Het&apos;s projects, skills, or
                  availability.
                </div>
              </div>
            </article>
            <SuggestedChips
              onSelect={handleChipSelect}
              disabled={isStreaming}
            />
          </>
        ) : (
          <>
            {messages.map((m, i) => {
              // Hide the empty assistant placeholder; the TypingIndicator
              // below covers that slot until the first token arrives.
              if (
                i === messages.length - 1 &&
                m.role === "assistant" &&
                !m.content &&
                isStreaming
              ) {
                return null;
              }
              return (
                <Message
                  key={m.id || `i-${i}`}
                  message={m}
                  isStreaming={isStreaming && i === lastAssistantIndex}
                />
              );
            })}
            {showTypingIndicator && <TypingIndicator />}
          </>
        )}

        {error && (
          <div role="alert" className={styles.errorBox}>
            <span className={styles.errorIcon}>⚠ </span>
            <span>{error}</span>
            {lastUserRef.current && (
              <button
                type="button"
                onClick={handleRetry}
                className={styles.retryLink}
              >
                retry
              </button>
            )}
          </div>
        )}

        {hasNewBelow && !pinnedToBottom && (
          <button
            type="button"
            onClick={() => {
              if (logRef.current) {
                logRef.current.scrollTop = logRef.current.scrollHeight;
                setPinnedToBottom(true);
                setHasNewBelow(false);
              }
            }}
            aria-label="Jump to newest message"
            className={styles.newPill}
          >
            ↓ new
          </button>
        )}
      </div>

      {/* Input */}
      <form onSubmit={onFormSubmit} className={styles.inputArea}>
        <div className={styles.inputRow}>
          <textarea
            ref={inputRef}
            value={input}
            onChange={onInputChange}
            onKeyDown={onInputKeyDown}
            placeholder="type a question…"
            aria-label="Type a question for AskHet"
            aria-describedby="askhet-input-hint"
            maxLength={MAX_INPUT_CHARS}
            rows={1}
            className={styles.textarea}
          />
          {charCount > 400 && (
            <span
              className={clsx(
                styles.charCounter,
                charCount >= MAX_INPUT_CHARS && styles.charCounterMax
              )}
              aria-live={charCount >= MAX_INPUT_CHARS - 20 ? "polite" : "off"}
              role={charCount >= MAX_INPUT_CHARS - 20 ? "status" : undefined}
            >
              {charCount} / {MAX_INPUT_CHARS}
            </span>
          )}
          <span id="askhet-input-hint" className={styles.srOnly}>
            Press Enter to send, Shift plus Enter for a new line. Maximum{" "}
            {MAX_INPUT_CHARS} characters.
          </span>
          <button
            type="submit"
            aria-label={isStreaming ? "Stop response" : "Send message"}
            disabled={!isStreaming && !input.trim()}
            className={styles.sendBtn}
          >
            {isStreaming ? "■" : "❯"}
          </button>
        </div>
        <p className={styles.footer}>
          built from scratch by het · powered by groq
        </p>
      </form>
    </div>
  );
}
