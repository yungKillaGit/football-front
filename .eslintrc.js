module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:import/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'import/extensions': 'off',
    'react/jsx-filename-extension': 'off',
    'no-trailing-spaces': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': 'off',
    'arrow-body-style': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'semi',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: true,
        },
      },
    ],
    'no-unused-vars': 'warn',
    'react/jsx-props-no-spreading': 'off',
    'max-len': 'off',
    'react/require-default-props': 'off',
    'no-unreachable': 'off',
    'react/no-array-index-key': 'off',
    'no-undef': 'off',
    'no-redeclare': 'off',
    'no-nested-ternary': 'off',
    'prefer-object-spread': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/destructuring-assignment': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
