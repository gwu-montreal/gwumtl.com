import React from "react";
import cx from "classnames";

const Button = ({
  icon,
  href,
  children,
}: {
  icon?: string;
  href: string;
  children: React.ReactChild;
}) => (
  <a
    className={cx(
      // ! needed to override tailwind-typography directives when rendering via mdx
      // TODO: can probably use an alternate strategy for applying tailwind-typography
      "!no-underline !font-display !font-normal !text-white",
      "flex justify-center items-center text-center w-max",
      "bg-primary hover:bg-red-500 focus:bg-red-600 shadow focus:shadow-inner",
      "mx-auto mb-4 p-4 rounded-lg"
    )}
    href={href}
  >
    {children}
  </a>
);

export default Button;
