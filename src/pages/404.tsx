import Script from "next/script";

export default function Custom404() {
  return (
    <Script strategy="beforeInteractive">
      {`if(navigator.language.split('-')[0] === 'fr') location.href = 'fr'; else location.href = 'en'`}
    </Script>
  );
}
