import React from "react";
import { css } from "astroturf";

import Link from "~/components/LocalizedLink";
import { useSiteData } from "~/lib/site-data";

import siteInfo from "~/lib/site-info.server";

import email from "~/images/email.svg";
import twitter from "~/images/twitter.svg";
import facebook from "~/images/facebook.svg";

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

const pointer = css`
  cursor: pointer;
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

const protocol = "mailto:";
const address = "gwumontreal";
const domain = "gmail.com";

const decodeEmail = (e: React.SyntheticEvent<HTMLAnchorElement>) => {
  e.currentTarget.href = `${protocol}${address}@${domain}`;
};

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
            <a
              className="flex"
              onMouseEnter={decodeEmail}
              onTouchStart={decodeEmail}
              onFocus={decodeEmail}
            >
              <img width={20} src={email} />
            </a>
          </div>
          <div>
            <a href={siteInfo.twitter}>
              <img width={20} src={twitter} />
            </a>
          </div>
          <div>
            <a href="">
              <img width={20} src={facebook} />
            </a>
          </div>
        </div>
        <div>
          <a
            className={pointer}
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
