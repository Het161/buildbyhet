import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "./askhet.module.css";

export interface ChatMessage {
  id?: string;
  role: "user" | "assistant";
  content: string;
}

interface Props {
  message: ChatMessage;
  isStreaming?: boolean;
}

export default function Message({ message, isStreaming }: Props) {
  const isUser = message.role === "user";

  return (
    <article
      aria-label={isUser ? "Your message" : "AskHet message"}
      className={clsx(
        styles.msgWrap,
        isUser ? styles.msgWrapUser : styles.msgWrapAssistant
      )}
    >
      {!isUser && (
        <span className={styles.label}>
          askhet <span className={styles.glyph}>❯</span>
        </span>
      )}
      <div
        className={clsx(
          styles.bubble,
          isUser ? styles.bubbleUser : styles.bubbleAssistant
        )}
      >
        {isUser ? (
          message.content
        ) : (
          <div className={styles.md}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                a: (props: any) => (
                  <a
                    {...props}
                    target="_blank"
                    rel="noreferrer noopener"
                  />
                ),
              }}
            >
              {message.content || ""}
            </ReactMarkdown>
            {isStreaming && (
              <span aria-hidden="true" className={styles.cursor} />
            )}
          </div>
        )}
      </div>
    </article>
  );
}
