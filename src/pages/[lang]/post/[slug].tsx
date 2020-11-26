import React from "react";
// import dynamic from "next/dynamic";

import type { GetStaticProps, GetStaticPaths } from "next";

// const Map = dynamic(() => import("~/components/Map"));

// even though we don't use all these static props in the component, our app
// wrapper (_app.tsx) also receives them and consumes them.
type PageProps = {
  lang: string;
  title: string;
  content: string;
  currentPage: string;
  summary: string;
};

const Page = ({ title, content, summary }: PageProps) => {
  return (
    <div>
      <h1>{title}</h1>
      <h2>{summary}</h2>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
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

  const { rendered, plaintext, matter } = await loadMdx(path, ["title"]);

  return {
    props: {
      lang,
      currentPage: slug,
      title: matter.title,
      content: rendered,
      summary: summarize(
        matter.summary || plaintext.split(/\s+/).join(" "),
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
