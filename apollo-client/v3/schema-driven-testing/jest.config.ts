import type { Config } from "jest";

const config: Config = {
  globals: {
    "globalThis.__DEV__": JSON.stringify(true),
  },
  testEnvironment: require.resolve("./FixJSDOMEnvironment.cjs"),
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  transform: {
    "\\.(gql|graphql)$": "@graphql-tools/jest-transform",
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        diagnostics: {
          warnOnly: process.env.TEST_ENV !== "ci",
        },
      },
    ],
  },
  resolver: "ts-jest-resolver",
};

export default config;
