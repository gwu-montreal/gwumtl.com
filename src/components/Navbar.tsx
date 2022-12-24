import React from "react";
import cx from "classnames";

// import Drawer from "~/components/Drawer";
import Link from "~/components/LocalizedLink";
import { useSiteData } from "~/lib/site-data";

import siteInfo from "~/site-info.json";

import email from "~/images/email.svg";
import twitter from "~/images/twitter.svg";
import facebook from "~/images/facebook.svg";
// import menu from "~/images/menu.svg";

const twitterUrl = `https://twitter.com/${siteInfo.twitter.slice(1)}`;

const protocol = "mailto:";
const address = "gwumontreal";
const domain = "gmail.com";

const decodeEmail = (e: React.SyntheticEvent<HTMLAnchorElement>) => {
  e.currentTarget.href = `${protocol}${address}@${domain}`;
};

export type NavbarItem = {
  label: string;
  emphasized?: boolean;
} & (
  | {
      link: string;
    }
  | {
      scrollTo: string;
    }
);

const Navbar = ({ items }: { items: NavbarItem[] }) => {
  const { t, lang, langs, setLang } = useSiteData();

  const otherLang = lang === "en" ? "fr" : "en";
  const otherLangLabel = langs[otherLang];

  return (
    <nav className="px-8 lg:px-16 mb-8 xl:text-lg text-gray-50 font-display flex items-center">
      {/* <div className="lg:hidden mr-8">
        <NavbarDrawer />
      </div> */}
      {items.map((item) => (
        <div
          key={item.label}
          className={cx(
            "hidden lg:block mr-8 xl:mr-12",
            item.emphasized && "bg-black/60 rounded-full px-5 py-2"
          )}
        >
          {"scrollTo" in item ? (
            <div
              className="cursor-pointer"
              onClick={() =>
                document
                  .getElementById(item.scrollTo)
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              {item.label}
            </div>
          ) : (
            <Link href={item.link}>{item.label}</Link>
          )}
        </div>
      ))}
      <div className="ml-auto flex items-center">
        <div className="flex shrink-0 items-center space-x-4 lg:space-x-8">
          <div>
            <a
              onMouseEnter={decodeEmail}
              onTouchStart={decodeEmail}
              onFocus={decodeEmail}
            >
              <img className="h-5 w-auto" alt={t("header:email")} src={email} />
            </a>
          </div>
          <div>
            <a href={twitterUrl}>
              <img className="h-5 w-auto" alt="Twitter" src={twitter} />
            </a>
          </div>
          <div>
            <a href={siteInfo.facebook}>
              <img className="h-5 w-auto" alt="Facebook" src={facebook} />
            </a>
          </div>
        </div>
        <div
          className="cursor-pointer ml-8 xl:ml-12"
          onClick={() => {
            setLang(otherLang);
          }}
        >
          <span className="capitalize sm:hidden">{otherLang}</span>
          <span className="hidden sm:inline">{otherLangLabel}</span>
        </div>
      </div>
    </nav>
  );
};

// const NavbarDrawer = () => {
//   const [drawerOpen, setDrawerOpen] = useState(false);
//   return (
//     <>
//       <div
//         className="cursor-pointer"
//         onClick={() => setDrawerOpen(!drawerOpen)}
//       >
//         <img className="h-5 w-auto" src={menu} />
//       </div>
//       <Drawer open={drawerOpen} onRequestClose={() => setDrawerOpen(false)}>
//         cool beans
//       </Drawer>
//     </>
//   );
// };

export default Navbar;
