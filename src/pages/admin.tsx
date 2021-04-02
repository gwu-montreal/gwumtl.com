import React, { useEffect } from "react";

import type { GetStaticProps } from "next";

interface PageProps {
  repository: string;
  homepage: string;
}

const init = async (props: PageProps) => {
  const { default: CMS } = await import("netlify-cms-app");
  const { fr } = await import("netlify-cms-locales");
  CMS.registerLocale("fr", fr);

  const { languageList: locales } = await import("~/lib/site-data");

  // const { default: strings } = await import(
  //   "../../content/strings/strings.en.json"
  // );

  CMS.init({
    config: {
      backend: {
        name: "github",
        repo: props.repository,
        branch: "new-version", // FIXME: temp!!
        // squash_merges: true,
      },
      local_backend: process.env.NODE_ENV === "development", // FIXME: verify works
      publish_mode: "editorial_workflow",
      media_folder: "public/images",
      public_folder: "/images",
      site_url: props.homepage,
      logo_url: props.homepage + "/images/gwu-mag-logo.svg",
      i18n: {
        structure: "multiple_files",
        locales,
      },
      collections: [
        // File collections across multiple files not supported for i18n, so use
        // folder collections with create: false instead
        {
          label: "Home",
          name: "home",
          folder: "content/pages/home",
          i18n: true,
          extension: "yml",
          format: "yml",
          create: false,
          fields: [
            {
              label: "Title",
              name: "title",
              widget: "string",
              required: true,
              i18n: true,
            },
            {
              label: "Description",
              name: "description",
              widget: "string",
              required: false,
              i18n: true,
            },
            {
              label: "Sections",
              name: "sections",
              widget: "list",
              fields: [
                {
                  label: "Type",
                  name: "type",
                  widget: "select",
                  options: [
                    { label: "Section", value: "section" },
                    { label: "Box", value: "box" },
                  ],
                },
                { label: "Image", name: "image", widget: "text" },
                {
                  label: "Image Placement",
                  name: "imagePlacement",
                  widget: "select",
                  options: [
                    { label: "Left", value: "left" },
                    { label: "Right", value: "right" },
                  ],
                },
                {
                  label: "Body",
                  name: "body",
                  widget: "markdown",
                  // only allow "raw" to prevent stomping the mdx
                  modes: ["raw"],
                  // buttons don't currently work in raw mode, so just hide them
                  // i guess. not ideal.
                  buttons: [],
                },
              ],
              required: true,
              i18n: true,
            },
          ],
        },
        {
          label: "Posts",
          name: "posts",
          i18n: true,
          folder: "content/posts",
          create: true,
          fields: [
            {
              label: "Title",
              name: "title",
              widget: "string",
              required: true,
              i18n: true,
            },
            {
              label: "Date",
              name: "date",
              widget: "datetime",
              required: false,
              i18n: "duplicate",
            },
            {
              label: "Summary",
              name: "summary",
              widget: "string",
              required: false,
              i18n: true,
            },
            {
              label: "Body",
              name: "body",
              widget: "markdown",
              required: true,
              i18n: true,
            },
          ],
        },
        // {
        //   label: "Strings",
        //   name: "strings",
        //   file: "content/strings.json",
        //   description:
        //     "Miscellaneous small localization strings used around the site.",
        //   // format: "json",
        //   // identifier_field: "siteName",
        //   fields: Object.keys(strings).map((k) => ({
        //     name: k,
        //     widget: "string",
        //     required: true,
        //     i18n: true,
        //   })),
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
  // const { readFileSync } = await import("fs");
  // const { join } = await import("path");

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
