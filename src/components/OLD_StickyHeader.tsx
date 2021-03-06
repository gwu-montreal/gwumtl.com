import React from "react";
import { css } from "astroturf";
import Headroom from "react-headroom";

import Link from "~/components/LocalizedLink";
import { useSiteData } from "~/lib/site-data";

/*
!!!!!!!!
CURRENTLY UNUSED, copied over from zine site
!!!!!!!!
*/

const logoimage = css`
  max-height: 3.5rem;
  margin-top: 10px;
  margin-right: 20px;
  margin-bottom: 20px;
`;

const afterlogo = css`
  display: none;

  @media (--sm-only) {
    display: unset;
    white-space: nowrap;
  }
`;

const head = css`
  min-height: 4rem;
  display: flex;
  align-items: center;

  a {
    font-size: 1.5rem;
    text-decoration: none;
  }
`;

const right = css`
  margin-left: auto;
  margin-right: 10px;
`;

const wrap = css`
  /* global selectors need at least one local selector to be pure */
  :global(.headroom-wrapper) {
    margin-top: 30px;
    margin-bottom: 50px;
  }

  :global(.headroom) {
    transition: box-shadow 0.5s ease-out;
    background-color: #eee;
  }

  :global(.headroom--pinned) {
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.15);
  }
`;

const Header = () => {
  const { lang, langs, t, setLang } = useSiteData();

  return (
    <Headroom className={wrap}>
      <div className="container">
        <nav className={`${head} head`}>
          <div>
            <Link href="/">
              <img
                alt="Game Workers Unite"
                className={logoimage}
                src="/images/gwu-mag-logo.svg"
              />
              <span className={afterlogo}>{t("header_title")}</span>
            </Link>
          </div>
          <div className={right}>
            <select
              value={lang}
              onChange={(e) => {
                const code = e.target.value;
                setLang(code);
              }}
              name="language"
            >
              {Object.entries(langs).map(([code, name]) => (
                <option value={code} key={code}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </nav>
      </div>
    </Headroom>
  );
};

export default Header;
