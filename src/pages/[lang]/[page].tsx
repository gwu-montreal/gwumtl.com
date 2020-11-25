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
  return <div>fart</div>;
};

export const getStaticProps: GetStaticProps<
  PageProps,
  { lang: string; page: string }
> = async ({ params }) => {
  // const { getDirectoryForSlug } = await import("~/lib/server");
  const { summarize } = await import("~/lib/util");

  const { lang, page } = params!;

  // const {
  //   default: content,
  //   attributes: { title, type, summary },
  //   plaintext,
  // } = await import(`content/${getDirectoryForSlug(page)}/${page}/${lang}.md`);

  return {
    props: {
      lang,
      title: "farts",
      currentPage: page,
      content: "fart, indeed very fart",
      summary: summarize("fart...", 160),
      // summary: summarize(summary ?? plaintext.split(/\s+/).join(" "), 160),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { languageList } = await import("~/lib/site-data");

  const paths = languageList.flatMap((lang) =>
    ["fart", "doublefart"].map((page) => ({ params: { lang, page } }))
  );

  return {
    paths,
    fallback: false,
  };
};

export default Page;
