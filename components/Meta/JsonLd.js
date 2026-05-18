import Script from "next/script";
import { METADATA, SOCIAL_LINKS, SKILLS } from "../../constants";

const JsonLd = () => {
  const siteUrl = METADATA.siteUrl;

  const socialUrls = (SOCIAL_LINKS || [])
    .map((s) => s?.link || s?.url || s?.href)
    .filter((u) => typeof u === "string" && u.startsWith("http"));

  const knowsAbout = Object.values(SKILLS || {})
    .flat()
    .map((s) => (typeof s === "string" ? s : s?.name))
    .filter(Boolean);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: "Het Patel",
    alternateName: ["Het", "buildbyhet"],
    url: siteUrl,
    image: `${siteUrl}${METADATA.ogImage}`,
    jobTitle: "Full-Stack Web Developer & AI Automation Builder",
    description: METADATA.description,
    email: "mailto:hetpatelsk@gmail.com",
    telephone: "+91-98252-47312",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ahmedabad",
      addressRegion: "Gujarat",
      addressCountry: "IN",
    },
    nationality: { "@type": "Country", name: "India" },
    worksFor: [
      {
        "@type": "Organization",
        name: "OM Marketing Solutions",
        url: "https://ommarketingsolutions.in",
      },
      { "@type": "Organization", name: "FirstBookit (SportsWalla)" },
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Gandhinagar University",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Gandhinagar",
        addressRegion: "Gujarat",
        addressCountry: "IN",
      },
    },
    knowsAbout: knowsAbout.length
      ? knowsAbout
      : [
          "Next.js",
          "React",
          "MERN Stack",
          "Node.js",
          "Express",
          "MongoDB",
          "PostgreSQL",
          "Prisma",
          "TypeScript",
          "Tailwind CSS",
          "AI Automation",
          "Razorpay Integration",
          "SaaS Development",
          "Web Development",
        ],
    knowsLanguage: ["English", "Hindi", "Gujarati"],
    sameAs: socialUrls,
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#service`,
    name: "Het Patel — Web Developer & AI Automation",
    image: `${siteUrl}${METADATA.ogImage}`,
    url: siteUrl,
    telephone: "+91-98252-47312",
    email: "hetpatelsk@gmail.com",
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ahmedabad",
      addressRegion: "Gujarat",
      postalCode: "380001",
      addressCountry: "IN",
    },
    geo: { "@type": "GeoCoordinates", latitude: 23.0225, longitude: 72.5714 },
    areaServed: [
      { "@type": "City", name: "Ahmedabad" },
      { "@type": "State", name: "Gujarat" },
      { "@type": "Country", name: "India" },
      { "@type": "Place", name: "Worldwide (remote)" },
    ],
    founder: { "@id": `${siteUrl}/#person` },
    serviceType: [
      "Full-stack web development",
      "Next.js development",
      "MERN stack development",
      "SaaS development",
      "AI automation",
      "Razorpay integration",
      "API development",
      "Freelance web developer",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web Development Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Next.js & React Web Development",
            description:
              "Production-grade websites and web apps built with Next.js, React, and TypeScript.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SaaS & Full-Stack Development",
            description:
              "End-to-end SaaS builds with MERN/Next.js + PostgreSQL/Prisma, including auth, payments, and dashboards.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Automation & Integration",
            description:
              "AI-powered features and workflow automation using OpenAI, Groq, and custom LLM integrations.",
          },
        },
      ],
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: METADATA.title,
    description: METADATA.description,
    publisher: { "@id": `${siteUrl}/#person` },
    inLanguage: "en-IN",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    ],
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [personSchema, serviceSchema, websiteSchema, breadcrumbSchema],
  };

  return (
    <Script
      id="json-ld-graph"
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
};

export default JsonLd;
