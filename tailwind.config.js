module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{ts,tsx,css}"],
  theme: {
    fontFamily: {
      display: ["Poppins", "sans-serif"],
      body: ["Plex", "sans-serif"],
    },
    extend: {
      spacing: {
        container: "1000px",
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#101316",
            "h1,h2,h3,h4": {
              color: "var(--color-header)",
              fontFamily: "Poppins, sans-serif",
              fontWeight: "normal",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
