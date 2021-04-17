import React from "react";
import cx from "classnames";

import SEO from "~/components/SEO";
import Hero from "~/components/Hero";
import Box from "~/components/Box";

import { mdx } from "~/styles/mdx";

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
      <div className="lg:w-container px-2 sm:px-6 mx-auto">
        {sections.map(({ type, content, image, imagePlacement }, i) => {
          switch (type) {
            case undefined:
              return (
                <div key={i} className="mb-12">
                  <div className="md:flex">
                    <div
                      className={cx(
                        "flex-shrink-0 mx-auto mb-8 md:mb-0 md:w-2/5 lg:w-1/3",
                        imagePlacement === "left"
                          ? "md:ml-0 md:mr-8"
                          : "md:ml-8 md:mr-0 order-1"
                      )}
                    >
                      {image && <Pic className="mx-auto" imgName={image} />}
                    </div>
                    <div
                      className={cx("prose", mdx, "mx-auto md:mx-0")}
                      dangerouslySetInnerHTML={{ __html: content }}
                    />
                  </div>
                </div>
              );
            case "box":
              return (
                <div key={i}>
                  <div className="lg:-mx-2">
                    <Box className="px-10 sm:px-12">
                      <div className="md:flex">
                        <div
                          className={cx("prose", mdx)}
                          dangerouslySetInnerHTML={{ __html: content }}
                        />
                        <div
                          className={cx(
                            "flex-shrink-0 mx-auto mb-8 md:mb-0 md:w-2/5 lg:w-1/3",
                            imagePlacement === "left"
                              ? "md:ml-0 md:mr-8"
                              : "md:ml-8 md:mr-0 order-1"
                          )}
                        >
                          {image && <Pic className="mx-auto" imgName={image} />}
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
