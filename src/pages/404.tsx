import Script from "next/script";

import SEO from "~/components/SEO";

import type { GetStaticProps } from "next";

interface PageProps {
  description: string;
}

export default function Custom404({ description }: PageProps) {
  return (
    <>
      <Script strategy="beforeInteractive">
        {`if(navigator.language.split('-')[0] === 'fr') location.href = 'fr'; else location.href = 'en'`}
      </Script>
      <SEO title="GWU Montréal" omitSiteNameInTitle description={description} />
    </>
  );
}

// adapted from `[lang]/index.tsx`, could be simplified!
export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const { loadYaml } = await import("~/lib/load-mdx");
  const path = `content/pages/home/home.en.yml`;
  const contents = await loadYaml(path, ["description"]);
  return { props: { description: contents["description"] } };
};
