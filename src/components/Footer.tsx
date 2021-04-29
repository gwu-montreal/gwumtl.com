import React from "react";
import Link from "~/components/LocalizedLink";

import { useSiteData } from "~/lib/site-data";

import logoEn from "~/images/gwu-logo-en.svg";
import logoFr from "~/images/gwu-logo-fr.svg";

const Footer = () => {
  const { lang, t } = useSiteData();

  return (
    <div className="bg-gray-900 p-16 lg:px-24 flex flex-col items-center">
      <div className="max-w-full mx-auto mb-4">
        <img className="max-h-24" src={lang === "fr" ? logoFr : logoEn} />
      </div>
      <div className="text-gray-50">
        <Link href="/#top">{t("footer:backtotop")}</Link>
        </div>
    </div>
  );
};

export default Footer;
