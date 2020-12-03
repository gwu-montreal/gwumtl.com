import React from "react";
import { css } from "astroturf";

const { box } = css`
  .box {
    background-color: #f4f4f4;
    box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
  }
`;

const Box = ({ children }: { children: React.ReactChild }) => (
  <div className={box}>{children}</div>
);

export default Box;
