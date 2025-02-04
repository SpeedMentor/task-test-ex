module.exports = {
  root: true,
  env: {
    node: true, // Node.js environment
    browser: true, // Vue.js (frontend) environment
    es2021: true, // ES2021 support
  },
  extends: [
    "eslint:recommended", // Basic ESLint rules
    "plugin:vue/recommended", // Vue.js rules
    "plugin:node/recommended", // Node.js rules
    "plugin:import/recommended", // ES modules support
    "prettier", // Prettier compatibility (if using Prettier)
  ],
  parserOptions: {
    ecmaVersion: 2021, // ES2021
    sourceType: "module", // ES modules
  },
  plugins: ["vue", "node", "import"],
  rules: {
    // Custom rules for your project
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off", // Allow console in development
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off", // Allow debugger in development
    "vue/multi-word-component-names": "off", // Allow single-word component names in Vue
    "node/no-unpublished-require": "off", // Allow unpublished modules (useful for local development)
    "import/no-unresolved": "off", // Disable unresolved import errors (if needed)
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".vue"], // Add .vue extension for Vue files
      },
    },
  },
  overrides: [
    {
      // Configuration for Node.js files
      files: ["**/*.js"],
      env: {
        node: true,
      },
      rules: {
        "node/no-unsupported-features/es-syntax": "off", // Allow modern ES features in Node.js
      },
    },
    {
      // Configuration for Vue.js files
      files: ["**/*.vue"],
      parser: "vue-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser", // Use TypeScript parser if applicable
      },
    },
  ],
};
