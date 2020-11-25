export async function loadMdx(filename: string) {
  const { readFile } = await import("fs/promises");
  const { default: matter } = await import("gray-matter");
  const { default: renderToString } = await import(
    "next-mdx-remote/render-to-string"
  );

  const raw = await readFile(filename, "utf-8");
  const { content, data } = matter(raw);

  const { renderedOutput } = await renderToString(content);

  return { rendered: renderedOutput, matter: data };
}
