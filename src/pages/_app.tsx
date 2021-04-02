import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

// import StickyHeader from "~/components/StickyHeader";

import "~/styles/index.css";

import type { AppProps } from "next/app";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { query } = useRouter();

  // if there's no lang, we're on the admin page; render it directly
  return query["lang"] ? (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        {/* <script async src="/fathom.js" /> */}
      </Head>
      {/* <TestWebP /> */}
      {/* <Header /> */}
      <Component {...pageProps} />
    </>
  ) : (
    <Component {...pageProps} />
  );
};

// const TestWebP = () => {
//   useEffect(() => {
//     const img = new Image();
//     img.onload = function () {
//       const result = img.width > 0 && img.height > 0;
//       if (result) {
//         document.body.classList.add("webp");
//       } else {
//         document.body.classList.remove("webp");
//       }
//     };
//     img.onerror = function () {
//       document.body.classList.remove("webp");
//     };
//     img.src =
//       "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA";
//   }, []);

//   return null;
// };

export default MyApp;
