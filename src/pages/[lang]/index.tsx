import React from "react";
import cx from "classnames";

import SEO from "~/components/SEO";
import Hero from "~/components/Hero";

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
      <div className="mx-auto px-8 mt-12 lg:px-16 lg:mt-20 xl:w-container">
        {sections.map(({ type, content, image, imagePlacement }, i) => {
          return (
            <div key={i} className={cx(
              "mb-12 lg:mb-20",
              {"shadow-lg bg-gray-50 lg:-mx-2 p-10 sm:p-12": type === "box"}
            )}>
              <div className="lg:flex">
                <div
                  className={cx(
                    "flex-shrink-0 max-h-64 mx-auto mb-6 sm:mb-4 sm:w-2/5 md:w-80 lg:float-none lg:mb-0",
                    imagePlacement === "left"
                      ? "sm:float-left sm:ml-0 sm:mr-8"
                      : "sm:float-right sm:ml-8 sm:mr-0 order-1"
                  )}
                >
                  {image && <Pic className="max-h-64 mx-auto" imgName={image} />}
                </div>
                <div
                  className="prose mx-auto md:mx-0"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>
            </div>
          );
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
