import React, { useEffect } from "react";

import type { GetStaticProps } from "next";
import type { CmsConfig, CmsCollection, CmsField } from "netlify-cms-core";

interface PageProps {
  repository: string;
  homepage: string;
}

const init = async (props: PageProps) => {
  const { default: CMS } = await import("netlify-cms-app");
  const { fr } = await import("netlify-cms-locales");
  CMS.registerLocale("fr", fr);

  const { languageList } = await import("~/lib/site-data");
  const { default: strings } = await import(
    "../../content/strings/strings.en.json"
  );

  interface CmsI18nConfig {
    structure: "multiple_folders" | "multiple_files" | "single_file";
    locales: string[];
    default_locale?: string;
  }

  CMS.init({
    config: {
      backend: {
        name: "github",
        repo: props.repository,
        branch: "new-version", // FIXME: temp!!
        // squash_merges: true,
      },
      publish_mode: "editorial_workflow",
      media_folder: "public/images",
      public_folder: "/images",
      site_url: props.homepage,
      logo_url: props.homepage + "/images/gwu-mag-logo.svg",
      i18n: {
        structure: "multiple_files",
        locales: languageList,
      },
      collections: [
        // File collections not yet supported for i18n:
        // see https://github.com/netlify/netlify-cms/pull/4634
        {
          label: "Pages",
          name: "pages",
          i18n: true,
          folder: "content/pages",
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
        {
          label: "Strings",
          name: "strings",
          description:
            "Miscellaneous small localization strings used around the site.",
          i18n: true,
          folder: "content/strings",
          create: false,
          format: "json",
          identifier_field: "siteName",
          fields: Object.keys(strings).map((k) => ({
            name: k,
            widget: "string",
            required: true,
            i18n: true,
          })),
        },
      ],
    } as CmsConfig & {
      backend: {
        squash_merges?: boolean;
      };
      i18n?: CmsI18nConfig;
      collections: (CmsCollection & {
        i18n?: boolean | CmsI18nConfig;
        fields: (CmsField & { i18n?: boolean | "translate" | "duplicate" })[];
      })[];
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
