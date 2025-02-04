// jest.config.js
export default {
  // Use the Vue CLI Jest preset
  preset: '@vue/cli-plugin-unit-jest',

  // Define where Jest should look for test files
  testMatch: ['**/__tests__/**/*.spec.[jt]s', '**/?(*.)+(spec|test).[jt]s'],

  // Transform files using `vue-jest` and `babel-jest`
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest', // Transform Vue files
    '^.+\\.js$': 'babel-jest', // Transform JavaScript files
  },

  // Mock static assets (e.g., CSS, images)
  moduleNameMapper: {
    '^.+\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^.+\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },

  // Collect code coverage
  collectCoverage: true,
  coverageDirectory: 'coverage', // Output directory for coverage reports
  coverageReporters: ['text', 'lcov'], // Report formats
};
