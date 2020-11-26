declare module "netlify-cms-locales";

declare module "next-mdx-remote/render-to-string" {
  export interface RenderedMDX {
    compiledSource: string;
    renderedOutput: string;
    scope: Record<string, unknown>;
  }

  export default function renderToString(
    source: string,
    options?: {
      components?: Record<string, React.ReactChild>;
      mdxOptions?: {
        remarkPlugins: any[];
        rehypePlugins: any[];
        hastPlugins: any[];
        compilers: any[];
        filepath: string;
      };
      scope?: any;
    }
  ): Promise<RenderedMDX>;
}

declare module "*.jpeg" {
  const value: string;
  export default value;
}

declare module "*.jpg" {
  const value: string;
  export default value;
}

declare module "*.png" {
  const value: string;
  export default value;
}

declare module "*.svg" {
  const value: string;
  export default value;
}

declare module "*.gif" {
  const value: string;
  export default value;
}

declare module "*.ico" {
  const value: string;
  export default value;
}

declare module "*.webp" {
  const value: string;
  export default value;
}
