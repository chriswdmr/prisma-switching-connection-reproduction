module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '**/tests/**/*.test.[jt]s?(x)',
  ],
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
};
