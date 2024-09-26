const NextI18Next = require("next-i18next").default;
// const { localeSubpaths } = require("next/config").default().publicRuntimeConfig;
const path = require("path");

module.exports = new NextI18Next({
  defaultLanguage: "en",
  otherLanguages: ["es"],
  ignoreRoutes: ["/_next/", "/static/", "/public/", "/api/"],
  // serverLanguageDetection: false,
  defaultNS: "common",
  strictMode: false,
  localePath: path.resolve("./public/static/locales"),
  react: {
    bindI18n: "languageChanged",
    useSuspense: false,
  },
});
