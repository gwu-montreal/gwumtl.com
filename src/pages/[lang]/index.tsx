import React from "react";
import { css } from "astroturf";

import SEO from "~/components/SEO";
import Hero from "~/components/Hero";
import Box from "~/components/Box";

import type { GetStaticProps } from "next";

interface PageProps {
  sections: {
    type?: "box";
    content: string;
    image?: string;
    imagePlacement?: "left" | "right";
  }[];
  description: string;
}

const { sec } = css`
  .sec {
    margin-bottom: 2rem;
  }
`;

const Index = ({ sections, description }: PageProps) => {
  return (
    <>
      <SEO title="GWU Montréal" description={description} />
      <Hero />
      <div className="container mdx">
        {sections.map(({ type, content, image, imagePlacement }, i) => {
          switch (type) {
            case undefined:
              return (
                <div key={i} className={sec}>
                  <div className="row center-sm-only">
                    <div
                      className={
                        imagePlacement === "left"
                          ? "col-md-4 col-md-offset-1"
                          : "col-md-4 last-md"
                      }
                    >
                      <img className="mw" src={image} />
                    </div>
                    <div
                      className={
                        imagePlacement === "left"
                          ? "col-md-6"
                          : "col-md-6 col-md-offset-1"
                      }
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                  </div>
                </div>
              );
            case "box":
              return (
                <Box key={i}>
                  <div className="row">
                    <div
                      className="col-sm-5 col-sm-offset-1"
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                  </div>
                </Box>
              );
            default:
              throw new Error(`Unknown section type: "${type}" (in index)`);
          }
        })}
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<
  PageProps,
  { lang: string }
> = async ({ params }) => {
  const { summarize } = await import("~/lib/util");
  const { loadMdx, processSections } = await import("~/lib/load-mdx");
  const { lang } = params!;

  const path = `content/pages/home/home.${lang}.yml`;

  const contents = await loadMdx(path, ["description", "sections"]);
  const { sections } = await processSections(contents as any);

  return {
    props: {
      sections,
      description: summarize(contents["description"], 160),
    },
  };
};

export { getStaticPaths } from "~/lib/default-localized-static-paths";

export default Index;
