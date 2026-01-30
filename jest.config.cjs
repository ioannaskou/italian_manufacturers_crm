/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/src/tests/**/*.test.ts'],
  setupFilesAfterEnv: ['<rootDir>/src/tests/testSetup.ts'],
  forceExit: true,
  detectOpenHandles: true,
  testTimeout: 30000
};