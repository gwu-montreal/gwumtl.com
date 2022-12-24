import React from "react";
import cx from "classnames";

const Button = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    className={cx(
      // ! needed to override tailwind-typography directives when rendering via mdx
      // TODO: can probably use an alternate strategy for applying tailwind-typography
      "!font-display !font-normal !text-white !no-underline",
      "flex max-w-max flex-wrap items-center justify-center text-center",
      "bg-main shadow hover:bg-primary focus:bg-primary focus:shadow-inner",
      "mx-auto my-4 rounded-lg px-6 py-4"
    )}
    href={href}
  >
    {children}
  </a>
);

export default Button;
