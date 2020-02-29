// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // Stop running tests after `n` failures
  bail: 1,

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: ['**/src/**/*.{js,ts,vue}', '**/public/**/*.{js,json}', '!**/node_modules/**'],

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: [
    'text-summary',
    'html',
    'clover'
    //'json',
    //'text',
    //'lcov',
  ],

  // An array of file extensions your modules use
  moduleFileExtensions: [
    'js',
    'vue',
    'json',
    'ts',
    //'jsx',
    //'tsx',
    //'node'
  ],

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: [
    'jest-extended',
    'jest-chain',
  ],

  // The glob patterns Jest uses to detect test files
  testMatch: [
    '**/?(*.)+(spec|test).ts',
  ],

  // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
  testURL: 'http://localhost',

  // Setting this value to 'fake' allows the use of fake timers for functions such as 'setTimeout'
  // timers: 'real',

  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.ts?$': 'ts-jest',
  },

  // Indicates whether each individual test should be reported during the run
  verbose: false,

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
