import { useEffect, useState } from "react";
import Head from "next/head";
import HackathonsExperience from "@/components/Hackathons/HackathonsExperience";
import SemanticTimeline from "@/components/Hackathons/SemanticTimeline";
import { HACKATHONS, METADATA } from "../constants";

const SCROLL_ID = "hk-scroll";

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

export default function HackathonsPage() {
  // null = deciding (SSR), false = WebGL, true = Tier 3 semantic timeline.
  const [tier3, setTier3] = useState(null);

  useEffect(() => {
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches;
    setTier3(Boolean(reduce) || !webglSupported());
  }, []);

  const scrollVh = (HACKATHONS.length + 2) * 120;

  const pageUrl = `${METADATA.siteUrl}/hackathons`;
  const title = "Hackathon Journey — Het Patel";
  const description =
    "A scroll-driven journey through Het Patel's hackathon projects — SimGuard, CiteMind, AEGIS, TransitOps, SheCareX and more.";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Hackathon Journey — Het Patel",
    url: pageUrl,
    numberOfItems: HACKATHONS.length,
    itemListElement: HACKATHONS.map((h, i) => {
      const item = { "@type": "CreativeWork", name: h.project };
      if (h.event) item.about = h.event;
      if (h.liveUrl) item.url = h.liveUrl;
      if (h.result?.status === "highlight") item.award = h.result.label;
      return { "@type": "ListItem", position: i + 1, item };
    }),
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={pageUrl} />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={pageUrl} />
        <meta
          property="og:image"
          content={`${METADATA.siteUrl}/og-image.png`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      {tier3 ? (
        <SemanticTimeline items={HACKATHONS} visible />
      ) : (
        <>
          <div
            id={SCROLL_ID}
            style={{ height: `${scrollVh}vh`, position: "relative" }}
          >
            <HackathonsExperience
              items={HACKATHONS}
              scrollId={SCROLL_ID}
              tier3={tier3 === true}
              onContextLost={() => setTier3(true)}
            />
          </div>
          {/* Always-rendered crawlable content (visually hidden here). */}
          <SemanticTimeline items={HACKATHONS} />
        </>
      )}
    </>
  );
}
