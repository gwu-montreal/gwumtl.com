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

const { sec } = css`
  .sec {
    margin-bottom: 2rem;
  }
`;

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
                <div key={i} className={sec}>
                  <div className="row center-sm-only">
                    <div
                      className={
                        data.imagePlacement === "left"
                          ? "col-md-4 col-md-offset-1"
                          : "col-md-4 last-md"
                      }
                    >
                      <img className="mw" src={data.image} />
                    </div>
                    <div
                      className={
                        data.imagePlacement === "left"
                          ? "col-md-6"
                          : "col-md-6 col-md-offset-1"
                      }
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                  </div>
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
