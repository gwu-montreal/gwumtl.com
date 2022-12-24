import React from "react";
import Head from "next/head";

import { languageList, useSiteData } from "~/lib/site-data";
import siteInfo from "~/site-info.json";

import openGraphImage from "~/images/opengraph.png";

const { domain, twitter } = siteInfo;

const SEO = ({
  title,
  omitSiteNameInTitle,
  description,
  openGraphImageOverride,
}: {
  title: string;
  omitSiteNameInTitle?: boolean;
  description?: string;
  openGraphImageOverride?: string;
}) => {
  const { t, slug } = useSiteData();
  const resolvedDescription = description || t("site_description");

  return (
    <Head>
      <title>
        {omitSiteNameInTitle ? "" : `${t("siteName")} — `}
        {title}
      </title>
      {languageList.map((l) => (
        <link
          key={l}
          rel="alternate"
          hrefLang={l}
          href={`${domain}/${l}${slug ? "/" + slug : ""}`}
        />
      ))}
      <meta
        name="description"
        key="description"
        content={resolvedDescription}
      />
      <meta property="og:title" key="og:title" content={title} />
      <meta
        property="og:description"
        key="og:description"
        content={resolvedDescription}
      />
      <meta
        property="og:image"
        content={`${domain}${openGraphImageOverride ?? openGraphImage}`}
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitter} />
    </Head>
  );
};

export default SEO;
