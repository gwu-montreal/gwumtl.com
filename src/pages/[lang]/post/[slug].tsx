import SEO from "~/components/SEO";
import Hero from "~/components/Hero";
import Footer from "~/components/Footer";

import { useSiteData } from "~/lib/site-data";

import type { GetStaticProps, GetStaticPaths } from "next";

interface PageProps {
  title: string;
  content: string;
  description: string;
}

const Page = ({ title, content, description }: PageProps) => {
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
  { lang: string; slug: string }
> = async ({ params }) => {
  const { summarize } = await import("~/lib/util");
  const { loadMdx } = await import("~/lib/load-mdx");
  const { lang, slug } = params!;

  const path = `content/posts/${slug}.${lang}.md`;

  const {
    data: { title, matter },
    content,
    plaintext,
  } = await loadMdx(path, ["title"]);

  return {
    props: {
      title,
      content,
      description: summarize(
        matter?.summary || plaintext.split(/\s+/).join(" "),
        160
      ),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const {
    promises: { readdir },
  } = await import("fs");
  const { join } = await import("path");

  const files = await readdir(join(process.cwd(), "content", "posts"));

  const re = /(?<slug>[a-z0-9-_]+)\.(?<lang>[a-z]{2})\.mdx?/i;

  const paths = files
    .filter((fn) => re.test(fn))
    .map((fn) => {
      const match = fn.match(re)!;
      const { lang, slug } = match.groups!;
      return { params: { lang, slug } };
    });

  return {
    paths,
    fallback: false,
  };
};

export default Page;
