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
      <div className="mx-auto mt-8 mb-16 max-w-container px-8 lg:px-16">
        <h1 className="mx-auto mb-8 max-w-[700px] font-display text-5xl uppercase">
          {title}
        </h1>

        <div
          className="prose mx-auto max-w-[700px]"
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
