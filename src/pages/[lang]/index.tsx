import React from "react";
import { css } from "astroturf";
import Head from "next/head";

import Link from "~/components/LocalizedLink";
import SEO from "~/components/SEO";
import { useSiteData } from "~/lib/site-data";

import Box from "~/components/Box";

import type { GetStaticProps, GetStaticPaths } from "next";

interface PageProps {
  sections: { content: string; key: string; data: Record<string, any> }[];
  description: string;
}

// const { container, image, readzine } = css`

// `;

const Index = ({ sections, description }: PageProps) => {
  // const { t } = useSiteData();
  // const title = t("site_title");

  return (
    <>
      <SEO title="GWU Montréal" description={description} />
      <div className="container mdx">
        {sections.map(({ key, content, data }, i) => {
          switch (key) {
            case "sec":
              return (
                <div key={i} className="row">
                  <div
                    className="col-sm-6 col-sm-offset-1"
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                </div>
              );
            case "box":
              return (
                <Box key={i}>
                  <div className="row">
                    <div
                      className="col-sm-5 col-sm-offset-1"
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                  </div>
                </Box>
              );
            default:
              throw new Error(`Unknown section type: "${key}" (in index)`);
          }
        })}
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<
  PageProps,
  { lang: string }
> = async ({ params }) => {
  const { summarize } = await import("~/lib/util");
  const { loadMdx } = await import("~/lib/load-mdx");
  const { lang } = params!;

  const path = `content/pages/index.${lang}.md`;

  const { renderedSections, matter } = await loadMdx(path, ["description"]);

  return {
    props: {
      sections: renderedSections,
      description: summarize(matter.description, 160),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { languageList } = await import("~/lib/site-data");

  return {
    paths: languageList.map((lang) => ({ params: { lang } })),
    fallback: false,
  };
};

export default Index;
