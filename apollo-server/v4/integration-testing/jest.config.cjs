/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    // when we are testing we want to use a slightly different config
    // to allow for jest types
    'ts-jest': {
      tsconfig: '<rootDir>/src/__tests__/tsconfig.json',
    },
  },
};
