import React from "react";
import { css } from "astroturf";
import Head from "next/head";

import Link from "~/components/LocalizedLink";
import SEO from "~/components/SEO";
import { useSiteData } from "~/lib/site-data";

import type { GetStaticProps, GetStaticPaths } from "next";

interface PageProps {
  lang: string;
  content: string;
  summary: string;
}

const { container, image, readzine } = css`
  .container h2 {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 90%;
    margin-bottom: 1.6rem;
  }

  .image {
    margin-left: 15px;
    float: right;
    max-width: 40%;
  }

  .readzine {
    text-align: center;
  }
`;

const Index = ({ content }: PageProps) => {
  const { t } = useSiteData();

  const title = t("site_title");

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <SEO title={title} />
      <div className={container}>
        <img
          alt="Isabelle: Unionize!"
          className={image}
          src="/images/isabelle-clearbg-inlined.svg"
        />
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <Link href="/intro">
          <h1 className={readzine}>{t("read_the_zine")}</h1>
        </Link>
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
      lang,
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
