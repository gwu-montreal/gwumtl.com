import { promises as fs } from "fs";
import matter from "gray-matter";
import renderToString from "next-mdx-remote/render-to-string";
import remark from "remark";
import strip from "strip-markdown";

import { components } from "~/components/mdx";

const yaml = require("js-yaml");

const mdx = (content: string) => renderToString(content, { components });

export async function loadMdx(filename: string, expectedFmFields?: string[]) {
  const raw = await fs.readFile(filename, "utf-8");

  // FIXME: bad typings, see https://github.com/jonschlinkert/gray-matter/pull/80
  // custom section parse is also required...
  const mat = matter(raw, {
    section(section: { content: string; data: any }) {
      if (typeof section.data === "string" && section.data.trim() !== "") {
        section.data = yaml.safeLoad(section.data);
      }
      section.content = section.content.trim() + "\n";
    },
  } as any);
  const { content, data, sections = [] } = mat as ReturnType<typeof matter> & {
    sections?: { key: string; data: Record<string, any>; content: string }[];
  };

  if (expectedFmFields) {
    for (const field of expectedFmFields) {
      if (!(field in data)) {
        throw new Error(
          `Expected a field "${field}" in frontmatter for file "${filename}"!`
        );
      }
    }
  }

  const { contents: plaintext } = await remark().use(strip).process(content);

  const { renderedOutput } = await mdx(content);

  const renderedSections = await Promise.all(
    sections.map(async ({ content: c, ...rest }) => ({
      ...rest,
      content: (await mdx(c)).renderedOutput,
    }))
  );

  return {
    rendered: renderedOutput,
    plaintext: String(plaintext),
    matter: data,
    renderedSections,
  };
}
