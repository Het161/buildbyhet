import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}
    >
      <div
        className={`max-w-[88%] rounded-lg px-3 py-2 ${
          isUser
            ? "bg-purple/15 border border-purple/40"
            : "bg-gray-dark-3 border border-gray-dark-1"
        }`}
      >
        <div className="font-mono text-[10px] uppercase tracking-wider text-gray-light-3 mb-1 select-none">
          {isUser ? (
            <span>
              you <span className="text-purple-light">❯</span>
            </span>
          ) : (
            <span>
              askhet <span className="text-purple-light">❯</span>
            </span>
          )}
        </div>

        {isUser ? (
          <div className="text-sm text-gray-light-1 whitespace-pre-wrap break-words">
            {message.content}
          </div>
        ) : (
          <div className="text-sm text-gray-light-1 break-words">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                a: (props: any) => (
                  <a
                    {...props}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-purple-light underline underline-offset-2 hover:text-white break-all"
                  />
                ),
                p: (props: any) => (
                  <p {...props} className="mb-2 last:mb-0 leading-relaxed" />
                ),
                ul: (props: any) => (
                  <ul {...props} className="list-disc pl-5 mb-2 space-y-1" />
                ),
                ol: (props: any) => (
                  <ol {...props} className="list-decimal pl-5 mb-2 space-y-1" />
                ),
                li: (props: any) => (
                  <li {...props} className="leading-relaxed" />
                ),
                strong: (props: any) => (
                  <strong {...props} className="text-white font-semibold" />
                ),
                em: (props: any) => (
                  <em {...props} className="italic text-gray-light-2" />
                ),
                code: (props: any) => (
                  <code
                    {...props}
                    className="font-mono bg-gray-dark-1 px-1 py-0.5 rounded text-xs text-purple-light break-all"
                  />
                ),
                pre: (props: any) => (
                  <pre
                    {...props}
                    className="font-mono bg-gray-dark-1 p-2 rounded text-xs overflow-x-auto my-2"
                  />
                ),
                hr: (props: any) => (
                  <hr {...props} className="border-gray-dark-1 my-3" />
                ),
              }}
            >
              {message.content || ""}
            </ReactMarkdown>
            {isStreaming && (
              <span
                aria-hidden="true"
                className="inline-block w-[8px] h-[14px] bg-purple ml-0.5 align-middle motion-safe:animate-pulse"
              />
            )}
          </div>
        )}
      </div>
    </article>
  );
}
