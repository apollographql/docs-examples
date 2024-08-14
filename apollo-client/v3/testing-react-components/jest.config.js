/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    html: '<html lang="zh-cmn-Hant"></html>',
    url: "https://jestjs.io/",
    userAgent: "Agent/007",
  },
  transform: {
    "^.+.tsx?$": ["ts-jest", {}],
  },
  preset: "ts-jest",
};

