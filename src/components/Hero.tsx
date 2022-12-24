import cx from "classnames";

import Navbar, { NavbarItem } from "~/components/Navbar";

import { useSiteData } from "~/lib/site-data";

import logoEn from "~/images/gwu-logo-en.svg";
import logoFr from "~/images/gwu-logo-fr.svg";

import styles from "./Hero.module.css";

const Hero = ({ items }: { items: NavbarItem[] }) => {
  const { lang } = useSiteData();

  return (
    <div
      id="top"
      className={cx(styles["background"], "bg-cover bg-center py-8")}
    >
      <div className="mx-auto flex max-w-container flex-col">
        <Navbar items={items} />
        <div className="mx-auto max-w-full p-8 md:flex md:items-center md:justify-center lg:px-16">
          <div className="mx-auto mb-6 w-max max-w-full shrink-0 md:mx-0 md:mb-0">
            <img alt="Logo" src={lang === "fr" ? logoFr.src : logoEn.src} />
          </div>
          <h1
            className={cx(
              "max-w-[33rem] font-display text-5xl text-gray-50 sm:text-6xl",
              "break-words text-center md:ml-12 md:basis-0 md:text-left lg:basis-auto"
            )}
          >
            GAME WORKERS UNITE MONTRÉAL
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;
