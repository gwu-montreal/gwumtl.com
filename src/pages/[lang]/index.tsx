import React from "react";
import { css } from "astroturf";
import Head from "next/head";

import Link from "~/components/LocalizedLink";
import SEO from "~/components/SEO";
import { useSiteData } from "~/lib/site-data";

import grid from "~/styles/grid.module.css";

import type { GetStaticProps, GetStaticPaths } from "next";

interface PageProps {
  content: string;
  summary: string;
}

// const { container, image, readzine } = css`

// `;

const Index = ({ content }: PageProps) => {
  // const { t } = useSiteData();
  // const title = t("site_title");

  return (
    <>
      <SEO title="GWU Montréal" />
      <div className={grid.container}>
        <div dangerouslySetInnerHTML={{ __html: content }} />
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

  const path = `content/pages/intro.${lang}.md`;

  const { rendered, plaintext, matter } = await loadMdx(path);

  return {
    props: {
      content: rendered,
      summary: summarize(
        matter.summary || plaintext.split(/\s+/).join(" "),
        160
      ),
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
