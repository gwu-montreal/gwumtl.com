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
      "!no-underline !font-display !font-normal !text-white",
      "flex flex-wrap justify-center items-center text-center max-w-max",
      "bg-main hover:bg-primary focus:bg-primary shadow focus:shadow-inner",
      "mx-auto my-4 px-6 py-4 rounded-lg"
    )}
    href={href}
  >
    {children}
  </a>
);

export default Button;
