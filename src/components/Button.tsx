import React from "react";
import { css } from "astroturf";

const { button } = css`
  .button {
    background-color: var(--color-main);
    border-radius: 9px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Button = ({
  icon,
  children,
}: {
  icon?: string;
  children: React.ReactChild;
}) => <div className={button}>{children}</div>;

export default Button;
