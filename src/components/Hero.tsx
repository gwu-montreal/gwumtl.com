import React from "react";
import cx from "classnames";
import { css } from "astroturf";

import Navbar, { NavbarItem } from "~/components/Navbar";

import { useSiteData } from "~/lib/site-data";

import logoEn from "~/images/gwu-logo-en.svg";
import logoFr from "~/images/gwu-logo-fr.svg";

const background = css`
  background-image: url("../images/hero-bg.jpg");

  /* stylelint-disable-next-line csstools/media-use-custom-media */
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    background-image: url("../images/hero-bg@2x.jpg");
  }

  /* positioning and pseudo just for the gradient */
  position: relative;
  z-index: 0;
  &::before {
    z-index: -1;
    position: absolute;
    content: "";
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(
      0deg,hsl(320deg 65% 50% / 75%),
      hsl(338deg 65% 50% / 50%) 36%,
      hsl(353deg 65% 50% / 20%) 54%,
      hsl(5deg 65% 50% / 0%) 72%);
    mix-blend-mode: color;
  }
`;

const Hero = ({ items }: { items: NavbarItem[] }) => {
  const { lang } = useSiteData();

  return (
    <div id="top" className={cx(background, "bg-cover bg-center py-8")}>
      <div className="max-w-container mx-auto flex flex-col">
        <Navbar items={items} />
        <div className="max-w-full mx-auto p-8 lg:px-16 md:flex md:items-center md:justify-center">
          <div className="flex-shrink-0 w-max max-w-full mx-auto mb-6 md:mx-0 md:mb-0">
            <img src={lang === "fr" ? logoFr : logoEn} />
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
