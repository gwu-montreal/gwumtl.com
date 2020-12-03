import { promises as fs } from "fs";
import matter from "gray-matter";
import renderToString from "next-mdx-remote/render-to-string";
import remark from "remark";
import strip from "strip-markdown";

import Button from "~/components/Button";

const mdx = (content: string) =>
  renderToString(content, { components: { Button } as any });

export async function loadMdx(filename: string, expectedFmFields?: string[]) {
  const raw = await fs.readFile(filename, "utf-8");

  // FIXME: bad typings, see https://github.com/jonschlinkert/gray-matter/pull/80
  const mat = matter(raw, { sections: true } as any);
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
