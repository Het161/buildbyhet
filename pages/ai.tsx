import Head from "next/head";
import Link from "next/link";
import ChatWindow from "../components/askhet/ChatWindow";

export default function AIPage() {
  return (
    <>
      <Head>
        <title>AskHet — talk to Het&apos;s AI</title>
        <meta
          name="description"
          content="Ask Het Patel's AI assistant about his projects, skills, and availability."
        />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="min-h-screen w-full bg-black text-gray-light-1 flex flex-col">
        {/* Minimal terminal-style header */}
        <header className="w-full border-b border-purple/20 px-4 sm:px-6 py-3 flex items-center justify-between shrink-0">
          <Link
            href="/"
            className="font-mono text-xs text-gray-light-4 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-purple rounded px-1"
            aria-label="Back to portfolio home"
          >
            ❮ buildbyhet.me
          </Link>
          <span className="font-mono text-xs text-purple">
            ❯ /ai · askhet
          </span>
          <span className="font-mono text-xs text-gray-light-4 hidden sm:inline">
            groq · llama-3.3
          </span>
        </header>

        {/* Centered column */}
        <main className="flex-1 flex justify-center px-3 sm:px-6 py-6">
          <div className="w-full max-w-[760px] flex flex-col">
            <div className="mb-4 px-1">
              <h1 className="font-mono text-2xl sm:text-3xl text-white">
                <span className="text-purple">askhet</span>
                <span className="text-gray-light-4"> — talk to Het&apos;s AI</span>
              </h1>
              <p className="text-sm text-gray-light-3 mt-1 max-w-prose">
                Ask anything about Het&apos;s projects, skills, experience, or
                availability. The bot answers from a curated knowledge base —
                if it doesn&apos;t know, it&apos;ll route you to{" "}
                <a
                  href="mailto:hetpatelsk@gmail.com"
                  className="text-indigo-light underline underline-offset-2 hover:text-white"
                >
                  hetpatelsk@gmail.com
                </a>
                .
              </p>
            </div>
            <div className="flex-1 min-h-[60vh] sm:min-h-[70vh] flex">
              <ChatWindow variant="page" />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
