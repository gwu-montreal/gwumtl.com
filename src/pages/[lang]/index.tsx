import React from "react";
import { css } from "astroturf";
import Head from "next/head";

import Link from "~/components/LocalizedLink";
import SEO from "~/components/SEO";
import { useSiteData } from "~/lib/site-data";

import type { GetStaticProps, GetStaticPaths } from "next";

interface PageProps {
  sections: { content: string; key: string }[];
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
      <div className="container">
        {sections.map(({ key, content }, i) => (
          <React.Fragment key={i}>
            <div className="row">
              <div
                className="col-sm-6"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          </React.Fragment>
        ))}
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
      sections: renderedSections.map(({ content, key }) => ({ content, key })),
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
