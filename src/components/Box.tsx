import React from "react";
import { css } from "astroturf";

const box = css`
  background-color: #f4f4f4;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 2rem;

  padding: 2rem 1rem;

  @media (--sm) {
    padding: 2rem 0;
  }
`;

const Box = ({
  children,
  ...props
}: { children: React.ReactChild } & React.ComponentProps<"div">) => (
  <div {...props} className={`${box} ${props.className || ""}`}>
    {children}
  </div>
);

export default Box;
