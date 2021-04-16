module.exports = {
  mode: "jit",
  purge: ["./src/**/*.tsx"],
  theme: {
    fontFamily: {
      display: ["Poppins", "sans-serif"],
      body: ["Plex", "sans-serif"],
    },
    extend: {
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
