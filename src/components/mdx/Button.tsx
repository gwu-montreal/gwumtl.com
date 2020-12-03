import React from "react";

const Button = ({
  icon,
  href,
  children,
}: {
  icon?: string;
  href: string;
  children: React.ReactChild;
}) => (
  <a className="link" href={href}>
    <div className="button">{children}</div>
  </a>
);

export default Button;
