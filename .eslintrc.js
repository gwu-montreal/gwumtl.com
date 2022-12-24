require("eslint-config-lostfictions/patch");
module.exports = {
  root: true,
  extends: ["lostfictions/react"],
  parserOptions: { tsconfigRootDir: __dirname },
};
