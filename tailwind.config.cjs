// @ts-check
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx,css,astro,md,mdx}"],
  theme: {
    screens: {
      sm: "500px",
      md: "800px",
      lg: "1000px",
      xl: "1200px",
      "2xl": "1500px",
    },
    fontFamily: {
      display: ["Poppins", ...defaultTheme.fontFamily.sans],
      body: ["Plex", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        main: "var(--color-main)",
        primary: "var(--color-primary)",
      },
      maxWidth: {
        container: "1180px",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "none",
            color: "#101316",
            "h1,h2,h3,h4": {
              color: "var(--color-header)",
              fontFamily: "Poppins, sans-serif",
              fontWeight: "normal",
            },
            h1: {
              fontSize: "2.5rem",
              marginBottom: "1.3rem",
            },
            h2: {
              fontSize: "1.4rem",
              marginBottom: "1rem",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
