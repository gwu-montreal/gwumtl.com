import React from "react";
import cx from "classnames";
import { css } from "astroturf";

import Navbar from "~/components/Navbar";

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
  /* position: relative;
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
      90deg,
      rgba(0, 0, 0, 0.8) 1.32%,
      rgba(50, 5, 5, 0.8) 27.91%,
      rgba(52, 7, 7, 0.8) 76.59%,
      rgba(32, 4, 4, 0.8) 98.31%
    );
    mix-blend-mode: multiply;
    opacity: 0.9;
  } */
`;

const Hero = () => {
  const { lang } = useSiteData();

  return (
    <div
      className={cx(
        background,
        "mb-12 bg-cover bg-center pt-6 pb-8 flex flex-col"
      )}
    >
      <Navbar />
      <div className="mx-auto px-6 md:flex md:items-center md:justify-center">
        <div className="mx-auto md:mx-0 mb-6 md:mb-0 flex-shrink-0 w-max">
          <img src={lang === "fr" ? logoFr : logoEn} />
        </div>
        <h1
          className={cx(
            "max-w-xl font-display text-6xl text-gray-50",
            "text-center md:text-left md:ml-12 md:basis-0 lg:basis-auto"
          )}
        >
          GAME WORKERS UNITE MONTRÉAL
        </h1>
      </div>
    </div>
  );
};

export default Hero;
