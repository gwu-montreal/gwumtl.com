import React from "react";
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
      <div className="max-w-container mx-auto flex flex-col">
        <Navbar items={items} />
        <div className="max-w-full mx-auto p-8 lg:px-16 md:flex md:items-center md:justify-center">
          <div className="shrink-0 w-max max-w-full mx-auto mb-6 md:mx-0 md:mb-0">
            <img alt="Logo" src={lang === "fr" ? logoFr.src : logoEn.src} />
          </div>
          <h1
            className={cx(
              "max-w-[33rem] font-display text-5xl sm:text-6xl text-gray-50",
              "text-center break-words md:text-left md:ml-12 md:basis-0 lg:basis-auto"
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
