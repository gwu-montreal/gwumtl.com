// @ts-check

import config from "eslint-config-lostfictions";
import astro from "eslint-plugin-astro";

const tep = "typescript-eslint/parser";

export default [
  ...config,

  // gnarly fix to allow linting astro files with ts-eslint typechecked rules. see
  // https://github.com/ota-meshi/eslint-plugin-astro/issues/447#issuecomment-2576486663
  ...astro.configs.recommended.map((c) => {
    const opts = c.languageOptions;

    const baseParser = opts?.parser?.meta?.name;
    const subParser = opts?.parserOptions?.["parser"]?.meta?.name;
    if (opts && (baseParser === tep || subParser === tep)) {
      opts.parserOptions = {
        ...opts.parserOptions,
        projectService: false,
        project: true,
      };
    }

    // this isn't needed to make astro work, but since
    // eslint-config-lostfictions also lints json files, we need to exclude them
    // for new file types.
    c.ignores = ["**/*.jsonc", "**/*.json", "**/*.json5"];

    return c;
  }),

  // these rules just don't play well with astro at the moment.
  {
    rules: {
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-return": "off",
    },
  },
];
