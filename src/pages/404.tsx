import Script from "next/script";

import SEO from "~/components/SEO";

import type { GetStaticProps } from "next";

// with a service like netlify, we were able to use their language detection and
// redirect before rendering the page. we were also able to leverage
// Accept-Language headers, which are the preferred way to redirect based on
// language. unfortunately, with the move to github pages, we have to do this
// client-side in a custom 404 page, either by using a <meta refresh> or via
// javascript. the latter allows us to check `navigator.language`, so we do that
// -- but we also need a fallback in the (very rare) case that a user has
// javascript disabled.

// one thing we could add is attempting to preserve the route with this method,
// for example redirecting `/posts/hello-world` to `/en/posts/hello-world`.
// unfortunately, unlike with server-side redirects, this wouldn't show twitter
// cards and opengraph tags. in practice we tend to post the language-prefixed
// urls on social media anyway (and of course those twitter cards and opengraph
// tags would always be in english even with the generic url, potentially giving
// the false impression that the content was english-only).

export default function Custom404({ description }: PageProps) {
  return (
    <>
      <Script strategy="beforeInteractive">
        {`if(navigator.language.split('-')[0] === 'fr') location.href = 'fr'; else location.href = 'en'`}
      </Script>
      <SEO title="GWU Montréal" omitSiteNameInTitle description={description} />
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
        <a href="/en">Click here if you are not redirected</a>
        <a href="/fr">Cliquer ici si vous n&apos;êtes pas redirigé·e</a>
      </div>
    </>
  );
}

interface PageProps {
  description: string;
}

// adapted from `[lang]/index.tsx`, could be simplified!
export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const { loadYaml } = await import("~/lib/load-mdx");
  const path = `content/pages/home/home.en.yml`;
  const contents = await loadYaml(path, ["description"]);
  return { props: { description: contents["description"] } };
};
