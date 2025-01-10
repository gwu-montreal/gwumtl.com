import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

import { domain } from "./src/site-info.json";

export default defineConfig({
  site: domain,
  devToolbar: { enabled: false },
  scopedStyleStrategy: "class",
  integrations: [
    mdx(),
    sitemap(),
    tailwind({
      // use our own base css so that we can customize the default font.
      applyBaseStyles: false,
    }),
  ],
});