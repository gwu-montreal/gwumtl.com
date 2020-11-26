/*
export async function loadMdx<TOpt extends string | undefined = undefined, TReq extends string>(
  filename: string,
  expectedFmFields?: TReq[],
  _optionalFmFields?: TOpt[]
): Promise<{
  rendered: string;
  plaintext: string;
  matter: { [k in TReq]: any } & { [k in TOpt]?: any };
}>
*/

export async function loadMdx(filename: string, expectedFmFields?: string[]) {
  const {
    promises: { readFile },
  } = await import("fs");
  const { default: matter } = await import("gray-matter");
  const { default: renderToString } = await import(
    "next-mdx-remote/render-to-string"
  );
  const { default: remark } = await import("remark");
  const { default: strip } = await import("strip-markdown");

  const raw = await readFile(filename, "utf-8");
  const { content, data } = matter(raw);

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

  const { renderedOutput } = await renderToString(content);

  return {
    rendered: renderedOutput,
    plaintext: String(plaintext),
    matter: data,
  };
}
