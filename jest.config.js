module.exports = {
  verbose: true,
  preset: '@shelf/jest-dynamodb',
  transform: {"\\.ts$": ["ts-jest"]},
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  coverageDirectory: "<rootDir>/.coverage/",
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 75,
      lines: 75,
      statements: 75
    }
  }
};