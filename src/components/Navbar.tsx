import React, { useState } from "react";

import Link from "~/components/LocalizedLink";
import Drawer from "~/components/Drawer";
import { useSiteData } from "~/lib/site-data";

import siteInfo from "~/lib/site-info.server";

import email from "~/images/email.svg";
import twitter from "~/images/twitter.svg";
import facebook from "~/images/facebook.svg";

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
    <nav className="px-6 mb-6 text-xl text-gray-50 font-display flex items-center">
      <div className="md:hidden">
        <NavbarDrawer />
      </div>
      <div className="hidden md:block">
        <Link href="/#info">{t("header:whoweare")}</Link>
      </div>
      <div className="hidden md:block ml-6">
        <Link href="/#news">{t("header:newsandinfo")}</Link>
      </div>
      <div className="hidden md:block ml-6">
        <Link href="/#getinvolved">{t("header:getinvolved")}</Link>
      </div>
      <div className="ml-auto flex items-center">
        <div className="flex flex-shrink-0 items-center space-x-4 lg:space-x-8">
          <div>
            <a
              onMouseEnter={decodeEmail}
              onTouchStart={decodeEmail}
              onFocus={decodeEmail}
            >
              <img className="h-5 w-auto" src={email} />
            </a>
          </div>
          <div>
            <a href={siteInfo.twitter}>
              <img className="h-5 w-auto" src={twitter} />
            </a>
          </div>
          <div>
            <a href={siteInfo.facebook}>
              <img className="h-5 w-auto" src={facebook} />
            </a>
          </div>
        </div>
        <div
          className="cursor-pointer ml-8 lg:ml-16"
          onClick={() => {
            setLang(otherLang);
          }}
        >
          {otherLangLabel}
        </div>
      </div>
    </nav>
  );
};

const NavbarDrawer = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
      <div
        className="cursor-pointer"
        onClick={() => setDrawerOpen(!drawerOpen)}
      >
        (open)
      </div>
      <Drawer open={drawerOpen} onRequestClose={() => setDrawerOpen(false)}>
        cool beans
      </Drawer>
    </>
  );
};

export default Navbar;
