import { useSiteData } from "~/lib/site-data";

import logoEn from "~/images/gwu-logo-en.svg";
import logoFr from "~/images/gwu-logo-fr.svg";

const Footer = () => {
  const { lang, t } = useSiteData();

  return (
    <div className="flex flex-col items-center bg-gray-900 p-16 lg:px-24">
      <div className="mx-auto mb-4 max-w-full">
        <img
          className="max-h-24"
          src={lang === "fr" ? logoFr.src : logoEn.src}
        />
      </div>
      <div className="text-gray-50">
        <div
          className="cursor-pointer"
          onClick={() =>
            document
              .getElementById("top")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          {t("footer:backtotop")}
        </div>
      </div>
    </div>
  );
};

export default Footer;
