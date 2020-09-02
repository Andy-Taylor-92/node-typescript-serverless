module.exports = {
  verbose: true,
  preset: '@shelf/jest-dynamodb',
  transform: {"\\.ts$": ["ts-jest"]},
  transformIgnorePatterns: ["<rootDir>/node_modules/"]
};