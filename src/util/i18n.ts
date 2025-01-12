import { defaultLang, langs, ui } from "./ui";

export const languageList = Object.keys(langs);

export function getSiteData(url: URL) {
  const [, langSeg, ...rest] = url.pathname.split("/");

  let lang: keyof typeof ui;
  if (Object.hasOwn(ui, langSeg)) {
    lang = langSeg as keyof typeof ui;
  } else {
    console.warn(`Unknown lang in url: "${langSeg}"`);
    lang = defaultLang;
  }

  const otherLang = lang === "en" ? "fr" : "en";
  const otherLangName = langs[otherLang];
  const otherLangUrl = `/${otherLang}${rest.map((p) => `/${p}`).join("")}`;

  return {
    lang,
    langs,
    otherLang,
    otherLangName,
    otherLangUrl,
    t: (id: keyof (typeof ui)[typeof defaultLang]) => {
      if (ui[lang][id]) return ui[lang][id];
      console.warn(`Locale string not found for id "${id}" in lang "${lang}"`);
      return ui[defaultLang][id] || id;
    },
  };
}
