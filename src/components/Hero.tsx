import React from "react";
import cx from "classnames";
import { css } from "astroturf";

import Navbar from "~/components/Navbar";

import logo from "~/images/gwu-logo-TEMP.svg";

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
  return (
    <div className={cx(background, "mb-16 bg-cover bg-center py-16")}>
      <Navbar />
      <div className="FIXMErow FIXMEcenter-sm-only">
        <div className="FIXMEcol-md-6 FIXMEcol-lg-4">
          <img
            height={400}
            width={400}
            src={logo}
            className="max-w-full"
            // temp
            style={{ mixBlendMode: "screen" }}
          />
        </div>
        <div className="FIXMEcol-md-6 FIXMEcol-lg-8 self-center">
          <h1 className="font-display text-6xl text-gray-50 text-center sm:text-left">
            GAME WORKERS UNITE MONTRÉAL
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;
