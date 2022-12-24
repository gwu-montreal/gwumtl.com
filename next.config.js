/* eslint no-undef: error */
const withPlugins = require("next-compose-plugins");
const fonts = require("next-fonts");
const optimizedImages = require("next-optimized-images");

module.exports = withPlugins([fonts, optimizedImages], {
  reactStrictMode: true,
  images: { unoptimized: true },
});
