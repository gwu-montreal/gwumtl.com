import React from "react";
import cx from "classnames";

import SEO from "~/components/SEO";
import Pic from "~/components/Pic";
import Hero from "~/components/Hero";
import Footer from "~/components/Footer";

import { useSiteData } from "~/lib/site-data";

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

const Index = ({ sections, description }: PageProps) => {
  const { t } = useSiteData();

  return (
    <>
      <SEO title="GWU Montréal" omitSiteNameInTitle description={description} />
      <Hero
        items={[
          { label: t("header:whoweare"), scrollTo: "info" },
          { label: t("header:newsandinfo"), scrollTo: "zines" },
          { label: t("header:getinvolved"), scrollTo: "join" },
        ]}
      />
      <div className="max-w-container mx-auto px-8 mt-16 lg:px-16 lg:mt-24">
        {sections.map(({ type, content, image, imagePlacement }, i) => {
          return (
            <div
              key={i}
              className={cx("mb-16 lg:mb-24", {
                "shadow-lg bg-gray-50 p-8 -mx-8 lg:px-16 lg:py-12 lg:-mx-16":
                  type === "box",
              })}
            >
              <div
                className={cx(
                  "flex flex-wrap",
                  type === "box"
                    ? "md:flex-nowrap"
                    : "sm:block lg:flex lg:flex-nowrap"
                )}
              >
                <div
                  className={cx(
                    "sm:shrink-0 mx-auto order-3",
                    { "sm:order-1": imagePlacement === "left" },
                    type === "box"
                      ? "mt-6 md:mt-0 md:pl-6 md:w-2/5"
                      : [
                          "mt-6 sm:mt-0 sm:mb-4 sm:w-2/5 md:w-80 lg:float-none lg:mb-0",
                          {
                            "sm:float-left sm:ml-0 sm:mr-8":
                              imagePlacement === "left",
                          },
                          {
                            "sm:float-right sm:ml-8 sm:mr-0":
                              imagePlacement === "right",
                          },
                        ]
                  )}
                >
                  {image && (
                    <Pic
                      className={cx(
                        "mx-auto",
                        type === "box" ? "max-h-64" : "max-h-56"
                      )}
                      imgName={image}
                    />
                  )}
                </div>
                <div
                  className={cx(
                    "prose break-words max-w-full mx-auto md:mx-0 order-2",
                    { "text-xl": type === "box" }
                  )}
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps<
  PageProps,
  { lang: string }
> = async ({ params }) => {
  const { summarize } = await import("~/lib/util");
  const { loadYaml, processSections } = await import("~/lib/load-mdx");
  const { lang } = params!;

  const path = `content/pages/home/home.${lang}.yml`;

  const contents = await loadYaml(path, ["description", "sections"]);
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
