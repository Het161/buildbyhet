import Head from "next/head";
import { useRouter } from "next/router";
import { METADATA } from "../../constants";

const Meta = ({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
  noindex = false,
}) => {
  const router = useRouter();
  const siteName = METADATA.title;
  const siteUrl = METADATA.siteUrl;
  const finalTitle = title ? `${title} | ${siteName}` : siteName;
  const finalDescription = description || METADATA.description;
  const finalKeywords = keywords || METADATA.keywords;
  const finalImage = image || `${siteUrl}${METADATA.ogImage}`;
  const finalUrl =
    url || `${siteUrl}${router.asPath === "/" ? "" : router.asPath}`;

  return (
    <Head>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content="Het Patel" />
      <link rel="canonical" href={finalUrl} />

      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
      )}
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />

      <meta name="geo.region" content="IN-GJ" />
      <meta name="geo.placename" content="Ahmedabad" />
      <meta name="geo.position" content="23.0225;72.5714" />
      <meta name="ICBM" content="23.0225, 72.5714" />
      <meta name="language" content="English" />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${siteName} preview`} />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
      <meta name="twitter:image:alt" content={`${siteName} preview`} />

      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="theme-color" content="#0a0a0a" />

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* <meta name="google-site-verification" content="PASTE_GSC_TOKEN" /> */}
      {/* <meta name="msvalidate.01" content="PASTE_BING_TOKEN" /> */}
    </Head>
  );
};

export default Meta;
