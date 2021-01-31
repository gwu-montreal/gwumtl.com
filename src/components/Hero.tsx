import React from "react";
import { css } from "astroturf";

import Navbar from "~/components/Navbar";

import logo from "../images/gwu-logo-TEMP.svg";

const { background, titlecontainer, title } = css`
  .background {
    margin-bottom: 4em;

    width: 100vw;
    background-size: cover;
    background-position: center;
    padding: 64px 0;
    background-image: url("../images/hero-temp.jpg");

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
        90deg,
        rgba(0, 0, 0, 0.8) 1.32%,
        rgba(50, 5, 5, 0.8) 27.91%,
        rgba(52, 7, 7, 0.8) 76.59%,
        rgba(32, 4, 4, 0.8) 98.31%
      );
      mix-blend-mode: multiply;
      opacity: 0.9;
    }
  }

  .titlecontainer {
    align-self: center;
  }

  .title {
    font-size: 4em;
    line-height: 1.2;
    color: #fcfcfc;

    @media (--sm-only) {
      text-align: center;
    }
  }
`;

const Hero = () => {
  return (
    <div className={background}>
      <div className="container">
        <Navbar />
        <div className="row center-sm-only">
          <div className="col-md-6 col-lg-4">
            <img
              height={400}
              width={400}
              src={logo}
              className="mw"
              // temp
              style={{ mixBlendMode: "screen" }}
            />
          </div>
          <div className={`col-md-6 col-lg-8 ${titlecontainer}`}>
            <h1 className={title}>GAME WORKERS UNITE MONTRÉAL</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;