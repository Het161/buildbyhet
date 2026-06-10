import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { calibre, jetbrains_mono } from "public/fonts";
import { GoogleAnalytics } from "@next/third-parties/google";
import Meta from "@/components/Meta/Meta";
import JsonLd from "@/components/Meta/JsonLd";
import "../styles/globals.scss";
import { GTAG } from "constants";

// ChatWidget is pure client UI (sessionStorage / localStorage / portal-like
// fixed positioning) — dynamic import with ssr:false keeps it out of the
// server bundle and off the critical first-paint path.
const ChatWidget = dynamic(() => import("@/components/askhet/ChatWidget"), {
  ssr: false,
});

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  // Don't mount the floating widget on the dedicated /ai page (it already
  // renders the full ChatWindow); avoids two chats on the same screen.
  const showWidget = router.pathname !== "/ai";

  return (
    <>
      <Meta />
      <JsonLd />
      <main
        className={`${calibre.variable} font-sans ${jetbrains_mono.variable} font-mono`}
      >
        <Component {...pageProps} />
        {showWidget && <ChatWidget />}
        <GoogleAnalytics gaId={GTAG} />
      </main>
    </>
  );
};

export default App;
