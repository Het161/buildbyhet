import { useEffect, useState } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import Header from "@/components/Header/Header";
import Menu from "@/components/Header/Menu/Menu";
import Cursor from "@/components/Cursor/Cursor";
import JourneyEssay from "@/components/Journey/JourneyEssay";
import { JOURNEY, METADATA } from "../constants";

const JourneyExperience = dynamic(
  () => import("@/components/Journey/JourneyExperience"),
  { ssr: false }
);

const SCROLL_ID = "journey-scroll";

function webglSupported() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

const TITLE = "My Journey — Het Patel";
const DESCRIPTION =
  "Het Patel's path from the last bench in Class 9 to shipping production software and national hackathon finals — told plainly, chapter by chapter.";
const PAGE_URL = `${METADATA.siteUrl}/journey`;

export default function JourneyPage() {
  const [isDesktop, setIsDesktop] = useState(true);
  // null = deciding (SSR renders the essay for crawlers); false = WebGL.
  const [tier3, setTier3] = useState(null);

  useEffect(() => {
    setIsDesktop(
      typeof window.orientation === "undefined" &&
        navigator.userAgent.indexOf("IEMobile") === -1 &&
        window.innerWidth > 767
    );
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches;
    setTier3(Boolean(reduce) || !webglSupported());
  }, []);

  const scrollVh = (JOURNEY.length + 1) * 115;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: TITLE,
    url: PAGE_URL,
    mainEntity: {
      "@type": "Person",
      name: "Het Patel",
      url: METADATA.siteUrl,
      description: DESCRIPTION,
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Gandhinagar University",
      },
      worksFor: { "@type": "Organization", name: "OM Marketing Solutions" },
    },
  };

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={PAGE_URL} />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="profile" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:image" content={`${METADATA.siteUrl}/og-image.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <Header>
        <Menu />
      </Header>
      <Cursor isDesktop={isDesktop} />

      <main>
        {tier3 === false ? (
          <div
            id={SCROLL_ID}
            style={{ height: `${scrollVh}vh`, position: "relative" }}
          >
            <JourneyExperience
              chapters={JOURNEY}
              scrollId={SCROLL_ID}
              onContextLost={() => setTier3(true)}
            />
          </div>
        ) : (
          // SSR + Tier 3: the typeset essay (crawlable, full text).
          <JourneyEssay chapters={JOURNEY} />
        )}
      </main>
    </>
  );
}
