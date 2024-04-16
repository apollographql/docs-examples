import type { Config } from "jest";

const config: Config = {
  globals: {
    "globalThis.__DEV__": JSON.stringify(true),
  },
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  transform: {
    "\\.(gql|graphql)$": "@graphql-tools/jest-transform",
    ".*": "babel-jest",
  },
};

export default config;
