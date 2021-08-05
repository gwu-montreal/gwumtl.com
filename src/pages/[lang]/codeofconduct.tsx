import React from "react";

import SEO from "~/components/SEO";
import Hero from "~/components/Hero";
import Footer from "~/components/Footer";

import { useSiteData } from "~/lib/site-data";

import type { GetStaticProps } from "next";

interface PageProps {
  title: string;
  content: string;
  description: string;
}

const CodeOfConduct = ({ title, content, description }: PageProps) => {
  const { t } = useSiteData();

  return (
    <>
      <SEO title={title} description={description} />
      <Hero items={[{ label: `< ${t("header:backtohome")}`, link: "/" }]} />
      <div className="max-w-container mx-auto px-8 mt-8 mb-16 lg:px-16">
        <h1 className="max-w-[700px] mx-auto text-5xl uppercase font-display mb-8">
          {title}
        </h1>

        <div
          className="prose max-w-[700px] mx-auto"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
      <Footer />
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

  const path = `content/pages/codeofconduct.${lang}.md`;

  const { content, data } = await loadMdx(path, ["title", "description"]);

  return {
    props: {
      content,
      title: data["title"],
      description: summarize(data["description"], 160),
    },
  };
};

export { getStaticPaths } from "~/lib/default-localized-static-paths";

export default CodeOfConduct;
