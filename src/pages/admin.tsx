import React, { useEffect } from "react";

import { langs } from "~/lib/site-data";

import type { GetStaticProps } from "next";

// yeah, ignore all the complex stuff going on in here now -- netlify-cms plans
// to add localization support soon (hopefully) so we won't have to hack it in
// like this.

// there are some limitations to the current approach. for example, page names
// are build-time static, if you rename a page, it won't be reflected until a
// build is published and you reload the page.

interface PageProps {
  repository: string;
  homepage: string;
}

const init = async (props: PageProps) => {
  const { default: CMS } = await import("netlify-cms-app");

  // const articles = toc["en"].flatMap(({ route, title }) =>
  //   Object.entries(langs).map(([lang, langLabel]) => ({
  //     label: `${title} (${langLabel}${
  //       lang === "en"
  //         ? ""
  //         : `: "${toc[lang].find((e) => e.route === route)!.title}"`
  //     })`,
  //     name: `${route}-${lang}`,
  //     file: `content/articles/${route}/${lang}.md`,
  //     preview_path: `${props.homepage}/${lang}/${route}`,
  //     fields: [
  //       {
  //         label: "Title",
  //         name: "title",
  //         widget: "string",
  //         required: true,
  //       },
  //       {
  //         label: "Type",
  //         name: "type",
  //         widget: "select",
  //         options: ["default", "unionfaqs", "bare", "map"],
  //         required: false,
  //       },
  //       {
  //         label: "Body",
  //         name: "body",
  //         widget: "markdown",
  //         required: true,
  //       },
  //     ],
  //   }))
  // );

  // netlify-cms can't handle bare schemaless json objects at the moment (eg.
  // for this to work the localization files would need to be something like
  // { strings: { "hello": "bonjour" } }, so we'll just have to edit them by
  // hand for now.
  // const localizationStrings = Object.entries(langs).map(
  //   ([lang, langLabel]) => ({
  //     label: langLabel,
  //     name: lang,
  //     file: `content/${lang}.json`,
  //     fields: [
  //       {
  //         label: "Title",
  //         name: "title",
  //         widget: "string",
  //         required: true,
  //       },
  //       {
  //         label: "Type",
  //         name: "type",
  //         widget: "select",
  //         options: ["default", "unionfaqs", "bare", "map"],
  //         required: false,
  //       },
  //       {
  //         label: "Body",
  //         name: "body",
  //         widget: "markdown",
  //         required: true,
  //       },
  //     ],
  //   })
  // );

  CMS.init({
    config: {
      backend: {
        name: "github",
        repo: props.repository,
      },
      // publish_mode: "editorial_workflow",
      media_folder: "public/images",
      public_folder: "/images",
      site_url: props.homepage,
      logo_url: props.homepage + "/images/gwu-mag-logo.svg",
      collections: [
        // {
        //   label: "Articles",
        //   name: "articles",
        //   files: articles,
        // },
      ],
    },
  });
};

const Admin = (props: PageProps) => {
  useEffect(() => {
    init(props).catch((e) => {
      throw e;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div />;
};

export default Admin;

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  // we have the toc (including page names per-language) for articles, but no
  // equivalent for extra pages. for netlify-cms if we want to show the page
  // titles we'll need to get them ourselves. (note that this should also become
  // unnecessary when netlify-cms ships localization support)
  const { readFileSync } = await import("fs");
  const { join } = await import("path");

  const {
    default: { repository, homepage },
  } = await import("../../package.json");

  return {
    props: {
      repository,
      homepage,
    },
  };
};
