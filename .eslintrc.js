module.exports = {
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:prettier/recommended', // Optional: integrates Prettier with ESLint
    ],
    parser: '@babel/eslint-parser',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 12,
      sourceType: 'module',
    },
    plugins: ['react', 'react-hooks', 'prettier'],
    rules: {
      'react/react-in-jsx-scope': 'off', // React 17+ no longer requires React in scope
      'react/prop-types': 'off', // Optional: disable prop-types if you are using TypeScript
      'prettier/prettier': 'warn', // Use Prettier rules
      'no-unused-vars': 'warn',
      'no-console': 'warn',
    },
  };