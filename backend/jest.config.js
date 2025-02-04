module.exports = {
  // Test environment (Node.js for backend testing)
  testEnvironment: 'node',

  // Directories to look for test files
  roots: ['<rootDir>/src/__tests__/'],

  // File extensions to consider for tests
  moduleFileExtensions: ['js', 'json'],

  // Transform files using Babel
  transform: {
    '^.+\\.js$': 'babel-jest',
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
  collectCoverageFrom: [
    'src/**/*.js', // Include all JS files in the src directory
    '!src/**/*.test.js', // Exclude test files
  ],

  // Setup files to run before tests
  setupFiles: ['<rootDir>/src/__tests__/setup.js'],

  // Clear mocks before each test
  clearMocks: true,

  // Verbose output for better debugging
  verbose: true,
};
