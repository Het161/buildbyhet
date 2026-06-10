import Head from "next/head";
import Link from "next/link";
import ChatWindow from "../components/askhet/ChatWindow";
import styles from "../components/askhet/askhet.module.css";

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

      <div className={`${styles.root} ${styles.pageRoot}`}>
        <header className={styles.pageHeader}>
          <Link
            href="/"
            className={styles.pageHeaderLink}
            aria-label="Back to portfolio home"
          >
            ❮ buildbyhet.me
          </Link>
          <span className={styles.pageHeaderTitle}>❯ /ai · askhet</span>
          <span className={styles.pageHeaderModel}>groq · llama-3.3</span>
        </header>

        <main className={styles.pageMain}>
          <div className={styles.pageColumn}>
            <h1 className={styles.pageHeading}>
              <span className={styles.brand}>askhet</span>
              <span className={styles.dim}>
                {" "}
                — talk to Het&apos;s AI
              </span>
            </h1>
            <p className={styles.pageSub}>
              Ask anything about Het&apos;s projects, skills, experience, or
              availability. The bot answers from a curated knowledge base —
              if it doesn&apos;t know, it&apos;ll route you to{" "}
              <a href="mailto:hetpatelsk@gmail.com">hetpatelsk@gmail.com</a>.
            </p>
            <div className={styles.pageWindowWrap}>
              <ChatWindow variant="page" />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
