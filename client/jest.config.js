// tells jest to ignore all files it doesnt know
module.exports = {
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(css|less)$': '<rootDir>/fileMock.js',
    }
  };