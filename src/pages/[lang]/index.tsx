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

const sec = css`
  margin-bottom: 2rem;
`;

const padXs = css`
  @media (--xs-only) {
    padding-left: 2.5em;
    padding-right: 2.5em;
  }
`;

const Pic = ({
  imgName,
  className,
}: {
  imgName: string;
  className?: string;
}) => {
  return (
    <picture>
      <source
        type="image/webp"
        srcSet={`/images/${imgName}.webp 1x, /images/${imgName}@2x.webp 2x`}
      />
      <source
        srcSet={`/images/${imgName}.png 1x, /images/${imgName}@2x.png 2x`}
        type="image/png"
      />
      <img className={className} src={`/images/${imgName}.png`} />
    </picture>
  );
};

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
                      {image && <Pic className="mw" imgName={image} />}
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
                <div key={i} className="row">
                  <div className="col-sm-10 col-sm-offset-1">
                    <Box className={padXs}>
                      <div className="row">
                        <div
                          className="col-sm-5 col-sm-offset-1"
                          dangerouslySetInnerHTML={{ __html: content }}
                        />
                        <div
                          className={`text-center mx-auto col-md-5 ${
                            imagePlacement === "left"
                              ? "col-md-offset-1"
                              : "last-md"
                          }`}
                        >
                          {image && <Pic className="mw" imgName={image} />}
                        </div>
                      </div>
                    </Box>
                  </div>
                </div>
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
