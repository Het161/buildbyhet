import { useRouter } from "next/router";
import Link from "next/link";
import Script from "next/script";
import Meta from "../../components/Meta/Meta";
import { CITIES, getCityBySlug, getPublishedCities } from "../../data/cities";
import { METADATA } from "../../constants";

export default function CityPage({ city }) {
  const router = useRouter();
  if (router.isFallback || !city) return null;

  const siteUrl = METADATA.siteUrl;
  const pageUrl = `${siteUrl}/web-developer-in/${city.slug}`;
  const pageTitle = `Web Developer in ${city.name} — Het Patel`;
  const pageDescription = `Hire Het Patel, a freelance full-stack web developer serving ${city.name}, ${city.state}. Next.js, MERN, and SaaS development for ${city.name} startups and businesses.`;

  // Per-page JSON-LD: a Service entity with areaServed pointing at this city.
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}/#service`,
    name: `Web Development Services in ${city.name}`,
    description: pageDescription,
    provider: { "@id": `${siteUrl}/#person` },
    areaServed: {
      "@type": "City",
      name: city.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: city.name,
        addressRegion: city.state,
        addressCountry: city.country,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: city.lat,
        longitude: city.lng,
      },
    },
    serviceType: [
      "Next.js development",
      "React development",
      "MERN stack development",
      "SaaS development",
      "AI automation",
    ],
    url: pageUrl,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Locations",
        item: `${siteUrl}/web-developer-in`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: city.name,
        item: pageUrl,
      },
    ],
  };

  const faqSchema = city.faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: city.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  return (
    <>
      <Meta
        title={`Web Developer in ${city.name}`}
        description={pageDescription}
        url={pageUrl}
        keywords={`web developer ${city.name}, freelance web developer ${city.name}, Next.js developer ${city.name}, React developer ${city.name}, MERN developer ${city.name}, full stack developer ${city.name}, ${city.name} web development`}
      />
      <Script
        id={`json-ld-service-${city.slug}`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id={`json-ld-breadcrumb-${city.slug}`}
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <Script
          id={`json-ld-faq-${city.slug}`}
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <main className="min-h-screen bg-[#0a0a0a] text-white px-4 sm:px-8 lg:px-16 py-16 max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-white">Home</Link>
          <span className="mx-2">/</span>
          <span>Locations</span>
          <span className="mx-2">/</span>
          <span className="text-white">{city.name}</span>
        </nav>

        {/* H1 — only one per page */}
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Web Developer in {city.name}
        </h1>
        <p className="text-xl text-gray-300 mb-12">
          Freelance full-stack developer serving {city.name}, {city.state}
        </p>

        {/* Local hook */}
        {city.localHook && (
          <section className="mb-12 text-lg leading-relaxed text-gray-200">
            {city.localHook}
          </section>
        )}

        {/* Main body */}
        <section className="prose prose-invert max-w-none mb-12">
          {city.body.split("\n\n").map((para, i) => (
            <p key={i} className="text-gray-200 leading-relaxed mb-4">
              {para}
            </p>
          ))}
        </section>

        {/* Featured projects */}
        {city.featuredProjects.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">
              Projects relevant to {city.name}
            </h2>
            <ul className="space-y-3">
              {city.featuredProjects.map((p, i) => (
                <li key={i} className="text-gray-200">
                  <strong>{p.name}</strong>
                  {p.note && <span className="text-gray-400"> — {p.note}</span>}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* FAQs */}
        {city.faqs.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">
              Frequently asked questions
            </h2>
            <div className="space-y-6">
              {city.faqs.map((f, i) => (
                <div key={i}>
                  <h3 className="font-semibold text-lg mb-2">{f.q}</h3>
                  <p className="text-gray-300">{f.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="border-t border-gray-800 pt-8 mt-12">
          <h2 className="text-2xl font-semibold mb-4">
            Start a project in {city.name}
          </h2>
          <p className="text-gray-300 mb-6">
            I work remotely with clients across {city.state} and India. Get in touch to discuss your project.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link href="/#contact" className="px-6 py-3 bg-white text-black font-medium rounded hover:bg-gray-200">
              Contact me
            </Link>
            <a href="mailto:hetpatelsk@gmail.com" className="px-6 py-3 border border-gray-600 rounded hover:bg-gray-900">
              hetpatelsk@gmail.com
            </a>
          </div>
        </section>

        {/* Other cities — internal linking */}
        <section className="border-t border-gray-800 pt-8 mt-12">
          <h2 className="text-lg font-semibold mb-4 text-gray-400">
            Also serving
          </h2>
          <div className="flex flex-wrap gap-3 text-sm">
            {getPublishedCities()
              .filter((c) => c.slug !== city.slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/web-developer-in/${c.slug}`}
                  className="text-gray-400 hover:text-white underline-offset-4 hover:underline"
                >
                  {c.name}
                </Link>
              ))}
          </div>
        </section>
      </main>
    </>
  );
}

// getStaticPaths — only generate pages for cities with content filled in.
// Empty cities return 404 until I write their content. This is the
// anti-thin-content safeguard.
export async function getStaticPaths() {
  const paths = getPublishedCities().map((c) => ({
    params: { city: c.slug },
  }));
  return {
    paths,
    fallback: false, // unknown slug or empty city = 404
  };
}

export async function getStaticProps({ params }) {
  const city = getCityBySlug(params.city);
  if (!city) return { notFound: true };
  return { props: { city } };
}
