import { promises as fs } from "fs";
import renderToString from "next-mdx-remote/render-to-string";
import remark from "remark";
import strip from "strip-markdown";

import { components } from "~/components/mdx";

const yaml = require("js-yaml");

const mdx = (content: string) => renderToString(content, { components });

export async function loadMdx(filename: string, expectedFields?: string[]) {
  const contents = yaml.safeLoad(await fs.readFile(filename, "utf-8"));

  if (expectedFields) {
    for (const field of expectedFields) {
      if (!(field in contents)) {
        throw new Error(
          `Expected a field "${field}" in frontmatter for file "${filename}"!`
        );
      }
    }
  }

  const { contents: plaintext } = await remark()
    .use(strip)
    .process(contents.sections.map((s) => s.body).join("\n\n"));

  const renderedSections: any[] = await Promise.all(
    contents.sections.map(async ({ body, ...rest }) => ({
      ...rest,
      content: (await mdx(body)).renderedOutput,
    }))
  );

  return {
    // rendered: renderedOutput,
    plaintext: String(plaintext),
    matter: contents,
    renderedSections,
  };
}
