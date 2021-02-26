import React from "react";
import { css } from "astroturf";

import Link from "~/components/LocalizedLink";
import { useSiteData } from "~/lib/site-data";

const navbar = css`
  margin-bottom: 2em;

  font-size: 1.3em;
  color: #fcfcfc;
  font-family: var(--font-headings);

  display: flex;

  > div {
    margin-right: 2em;
  }

  a {
    text-decoration: none;
  }
`;

const icons = css`
  display: flex;

  > div {
    margin-right: 1.5em;
  }

  margin-right: 2em;
`;

const right = css`
  margin-left: auto;
  display: flex;
`;

const Navbar = () => {
  const { lang, langs, t, setLang } = useSiteData();

  const otherLang = lang === "en" ? "fr" : "en";
  const otherLangLabel = langs[otherLang];

  return (
    <div className={navbar}>
      <div>
        <Link href="/#info">{t("header:whoweare")}</Link>
      </div>
      <div>
        <Link href="/#news">{t("header:newsandinfo")}</Link>
      </div>
      <div>
        <Link href="/#getinvolved">{t("header:getinvolved")}</Link>
      </div>
      <div className={right}>
        <div className={icons}>
          <div>
            <a href="">📯</a>
          </div>
          <div>
            <a href="">💾</a>
          </div>
          <div>
            <a href="">💡</a>
          </div>
        </div>
        <div>
          <a
            onClick={() => {
              setLang(otherLang);
            }}
          >
            {otherLangLabel}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
