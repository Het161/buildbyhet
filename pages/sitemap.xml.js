import { PROJECTS } from "../constants";
import { getPublishedCities } from "../data/cities";

const SITE_URL = "https://buildbyhet.me";

function generateSiteMap(projectSlugs, citySlugs) {
  const today = new Date().toISOString().split("T")[0];
  const urls = [
    { loc: `${SITE_URL}`, changefreq: "weekly", priority: "1.0" },
    { loc: `${SITE_URL}/#about`, changefreq: "monthly", priority: "0.8" },
    { loc: `${SITE_URL}/#skills`, changefreq: "monthly", priority: "0.8" },
    { loc: `${SITE_URL}/#projects`, changefreq: "weekly", priority: "0.9" },
    { loc: `${SITE_URL}/#work`, changefreq: "monthly", priority: "0.7" },
    { loc: `${SITE_URL}/#contact`, changefreq: "monthly", priority: "0.7" },
    ...projectSlugs.map((slug) => ({
      loc: `${SITE_URL}/projects/${slug}`,
      changefreq: "monthly",
      priority: "0.6",
    })),
    ...citySlugs.map((slug) => ({
      loc: `${SITE_URL}/web-developer-in/${slug}`,
      changefreq: "monthly",
      priority: "0.7",
    })),
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;
}

function SiteMap() {
  return null;
}

export async function getServerSideProps({ res }) {
  const projectSlugs =
    (PROJECTS || [])
      .filter((p) => p && p.slug && p.indexable !== false)
      .map((p) => p.slug) || [];

  const citySlugs = getPublishedCities().map((c) => c.slug);

  const sitemap = generateSiteMap(projectSlugs, citySlugs);

  res.setHeader("Content-Type", "text/xml");
  res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate");
  res.write(sitemap);
  res.end();

  return { props: {} };
}

export default SiteMap;
