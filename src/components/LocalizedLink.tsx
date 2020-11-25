import React from "react";
import Link from "next/link";

const LocalizedLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  // currently doesn't seem worth it to support relative links
  if (!href.startsWith("/")) {
    console.warn(`<LocalizedLink> using relative href: "${href}"`);
    console.warn(`only absolute uris are currently supported.`);
  }

  // HACK: normally "/fr/" with a trailing slash should be the same as "/fr",
  // but next currently gets a bit confused in dev mode about this. (the final
  // static export works fine with either!)
  const resolvedHref = href === "/" ? "/[lang]" : `/[lang]${href}`;

  return (
    <Link href={resolvedHref}>
      <a>{children}</a>
    </Link>
  );
};

export default LocalizedLink;
