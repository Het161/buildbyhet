import {
  useCallback,
  useEffect,
  useRef,
  useState,
  KeyboardEvent,
  ChangeEvent,
  FormEvent,
} from "react";
import Message, { ChatMessage } from "./Message";
import SuggestedChips from "./SuggestedChips";
import TypingIndicator from "./TypingIndicator";

const HISTORY_KEY = "askhet-history";
const MAX_INPUT_CHARS = 500;
const HISTORY_TO_SEND = 8;

interface Props {
  /** If provided, renders a close button in the header. */
  onClose?: () => void;
  /** Render style for full-page vs popup; only affects the outer layout class. */
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

  // Mirror state into refs so callbacks don't need them in deps.
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);
  useEffect(() => {
    isStreamingRef.current = isStreaming;
  }, [isStreaming]);

  // Load history once on mount.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.sessionStorage.getItem(HISTORY_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const filtered = parsed
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
            }));
          setMessages(filtered);
        }
      }
    } catch {
      /* ignore */
    }
  }, []);

  // Persist only when idle (avoid 700 setItem calls during a stream).
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
      /* quota or disabled — non-fatal */
    }
  }, [messages, isStreaming]);

  // Abort any in-flight fetch on unmount.
  useEffect(() => {
    return () => {
      mountedRef.current = false;
      abortRef.current?.abort();
    };
  }, []);

  // Auto-scroll behavior.
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
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 60;
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

        // If the model returned an empty string, drop the placeholder.
        if (!acc.trim() && mountedRef.current) {
          setMessages((prev) => prev.slice(0, -1));
          setError("the model returned an empty response — try again");
        }
      } catch (err: any) {
        if (err?.name === "AbortError") {
          // Drop a never-started placeholder so we don't persist an empty bubble.
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
        if (mountedRef.current) {
          setIsStreaming(false);
        }
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
    const max = 96; // ~4 lines × 24px
    el.style.height = `${Math.min(el.scrollHeight, max)}px`;
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

  // Identify last assistant index for the streaming cursor.
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

  return (
    <div
      className={`flex flex-col h-full w-full bg-gray-dark-5 text-gray-light-1 ${
        variant === "widget" ? "rounded-xl overflow-hidden" : ""
      } border border-purple/30`}
    >
      {/* Header — terminal title bar */}
      <header
        className="flex items-center gap-2 border-b border-purple/30 px-3 py-2 shrink-0"
        style={{ paddingTop: "calc(0.5rem + env(safe-area-inset-top, 0px))" }}
      >
        <span
          id="askhet-dialog-title"
          className="font-mono text-xs text-purple-light"
        >
          ❯ askhet --interactive
        </span>
        <span
          aria-hidden="true"
          className="w-2 h-2 rounded-full bg-green motion-safe:animate-pulse"
        />
        <span className="sr-only">AskHet status: online</span>
        <span className="font-mono text-[10px] text-gray-light-3 hidden xs:inline">
          groq · llama-3.3
        </span>
        <div className="flex-1" />
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear chat history"
          title="Clear chat history"
          className="text-gray-light-3 hover:text-white p-2.5 -m-1 min-w-[40px] min-h-[40px] inline-flex items-center justify-center rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-purple"
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
            className="text-gray-light-3 hover:text-white p-2.5 -m-1 min-w-[40px] min-h-[40px] inline-flex items-center justify-center rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-purple"
          >
            <svg
              width="16"
              height="16"
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

      {/* Log */}
      <div
        ref={logRef}
        onScroll={handleLogScroll}
        role="log"
        aria-label="Chat conversation"
        aria-busy={isStreaming}
        className="flex-1 min-h-0 overflow-y-auto px-3 py-3 relative"
      >
        {isEmpty ? (
          <div className="text-sm">
            <p className="text-gray-light-2 leading-relaxed">
              Hi! I&apos;m{" "}
              <span className="text-purple-light font-mono">AskHet</span> 👋 —
              ask me anything about Het&apos;s projects, skills, or availability.
            </p>
            <SuggestedChips
              onSelect={handleChipSelect}
              disabled={isStreaming}
            />
          </div>
        ) : (
          <>
            {messages.map((m, i) => {
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
          <div
            role="alert"
            className="my-2 px-3 py-2 rounded-md border border-red/40 bg-red/10 text-sm font-mono"
          >
            <span className="text-red">⚠ </span>
            <span className="text-gray-light-2">{error}</span>
            {lastUserRef.current && (
              <button
                type="button"
                onClick={handleRetry}
                className="ml-2 underline text-purple-light hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-purple"
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
            className="sticky bottom-2 left-1/2 -translate-x-1/2 font-mono text-[11px] px-3 py-1 rounded-full border border-purple/40 bg-gray-dark-3 text-gray-light-2 hover:text-white hover:border-purple shadow-lg shadow-black/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple"
          >
            <span aria-hidden="true">↓</span> new message
          </button>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={onFormSubmit}
        className="border-t border-purple/30 px-3 py-2 shrink-0"
        style={{
          paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom, 0px))",
        }}
      >
        <div className="flex items-end gap-2 rounded-md focus-within:ring-1 focus-within:ring-purple/60 px-1 -mx-1 transition-shadow">
          <span
            aria-hidden="true"
            className="font-mono text-purple-light text-sm pb-2 select-none"
          >
            ❯
          </span>
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
            className="flex-1 resize-none font-mono text-base sm:text-sm bg-transparent text-gray-light-1 placeholder:text-gray-light-3 outline-none focus:outline-none py-2 leading-6"
            style={{ maxHeight: 96 }}
          />
          <span id="askhet-input-hint" className="sr-only">
            Press Enter to send, Shift plus Enter for a new line. Max{" "}
            {MAX_INPUT_CHARS} characters.
          </span>
          <button
            type="submit"
            aria-label={isStreaming ? "Stop response" : "Send message"}
            disabled={!isStreaming && !input.trim()}
            className="shrink-0 mb-1 px-4 py-2 sm:py-1.5 min-h-[44px] sm:min-h-0 rounded-md font-mono text-xs border border-purple/50 bg-purple/10 text-purple-light hover:bg-purple hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-purple"
          >
            {isStreaming ? "stop" : "send"}
          </button>
        </div>
        <div className="flex items-center justify-between pt-1 gap-2">
          <p className="font-mono text-[10px] text-gray-light-3 truncate min-w-0">
            built from scratch by het · powered by groq
          </p>
          {charCount > 400 && (
            <p
              className={`font-mono text-[10px] shrink-0 ${
                charCount >= MAX_INPUT_CHARS ? "text-red" : "text-gray-light-2"
              }`}
              role={
                charCount >= MAX_INPUT_CHARS - 20 ? "status" : undefined
              }
              aria-live={
                charCount >= MAX_INPUT_CHARS - 20 ? "polite" : "off"
              }
            >
              {charCount} / {MAX_INPUT_CHARS}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
