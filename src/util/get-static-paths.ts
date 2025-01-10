import { languageList } from "./i18n";

import type {
  InferGetStaticParamsType,
  InferGetStaticPropsType,
  GetStaticPaths,
} from "astro";

/**
 * a component for default static paths for localized pages. re-export it, like
 * this:
 *
 * `export { getStaticPaths } from "~/util/get-static-paths"`
 */
export const getStaticPaths = (() => {
  return languageList.map((l) => ({ params: { lang: l } }));
}) satisfies GetStaticPaths;

export type Params = InferGetStaticParamsType<typeof getStaticPaths>;
export type Props = InferGetStaticPropsType<typeof getStaticPaths>;
