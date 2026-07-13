import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Header from "@/components/Header/Header";
import Menu from "@/components/Header/Menu/Menu";
import ProgressIndicator from "@/components/ProgressIndicator/ProgressIndicator";
import Cursor from "@/components/Cursor/Cursor";
import Certifications from "@/components/Certifications/Certifications";
import Footer from "@/components/Footer/Footer";
import { CERTIFICATIONS, METADATA } from "../constants";

gsap.registerPlugin(ScrollTrigger);
gsap.config({ nullTargetWarn: false });

const TITLE = "Certifications — Het Patel | Hackathons, AI & Bootcamps";
const DESCRIPTION =
  "Certifications and achievements of Het Patel — HackBaroda 2026 finalist, NASA Space Apps Galactic Problem Solver, Adobe India Hackathon, IIT Madras, Techstars Startup Weekend and Murf AI.";
const PAGE_URL = `${METADATA.siteUrl}/certifications`;

export default function CertificationsPage() {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const { innerWidth, orientation } = window;

    setIsDesktop(
      typeof orientation === "undefined" &&
        navigator.userAgent.indexOf("IEMobile") === -1 &&
        innerWidth > 767
    );
  }, []);

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Certifications — Het Patel",
    url: PAGE_URL,
    itemListElement: CERTIFICATIONS.map((cert, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "EducationalOccupationalCredential",
        name: cert.name,
        description: cert.description,
        image: `${METADATA.siteUrl}${cert.image}`,
        credentialCategory: cert.category,
        recognizedBy: { "@type": "Organization", name: cert.issuer },
        about: cert.category,
      },
    })),
  };

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={PAGE_URL} />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={PAGE_URL} />
        <meta
          property="og:image"
          content={`${METADATA.siteUrl}${METADATA.ogImage}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      </Head>

      <Header>
        <Menu />
      </Header>
      <ProgressIndicator />
      <Cursor isDesktop={isDesktop} />

      <main className="flex flex-col pt-32 pb-16">
        <div
          role="img"
          aria-label=""
          className="text-gray-light-1 opacity-10 sm:text-9xl xs:text-8xl inline-block -z-10 absolute rotate-90 right-0 md:top-52 xs:top-96"
        >
          DEV
        </div>

        {/* w-full: section-container's mx-auto would otherwise disable the
            flex column's cross-axis stretch and shrink-wrap this row */}
        <div className="section-container w-full">
          <Link
            href="/"
            className="link font-mono text-sm text-gray-light-3 hover:text-white transition-colors duration-300"
          >
            ❮ back to portfolio
          </Link>
        </div>

        <Certifications />
      </main>

      <Footer />
    </>
  );
}
