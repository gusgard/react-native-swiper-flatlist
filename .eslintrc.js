module.exports = {
  extends: [
    'airbnb',
    'plugin:flowtype/recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/flowtype',
    'prettier/react',
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings'
  ],
  plugins: ['flowtype', 'react', 'prettier', 'react-native'],
  parserOptions: {
    ecmaVersion: 2016,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    es6: true,
    node: true
  },
  rules: {
    'comma-dangle': 0,
    'consistent-return': 1,
    'global-require': 0,
    'import/extensions': [2, 'never'],
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': [2, { ignore: ['@'] }],
    'import/prefer-default-export': 'off',
    'import/no-named-as-default-member': 'off',
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: [['builtin', 'external', 'internal'], ['parent', 'sibling', 'index']]
      }
    ],
    'no-case-declarations': 1,
    'no-confusing-arrow': 0,
    'no-console': 0,
    'no-param-reassign': 0,
    'no-return-assign': 1,
    'no-shadow': 1,
    'no-underscore-dangle': 0,
    'no-use-before-define': 0,
    'padded-blocks': 0,
    'quote-props': 1,
    quotes: ['error', 'single'],
    'react-native/no-unused-styles': 1,
    'react-native/split-platform-components': 1,
    'react/jsx-filename-extension': 0,
    'react/no-array-index-key': 0,
    'react/require-default-props': 0,
    'react/forbid-prop-types': [0, { forbid: ['any', 'array'] }],
    'react/jsx-no-bind': 1,
    'react/no-multi-comp': 1,
    'react/prefer-stateless-function': 1,
    'react/display-name': 0,
    'react/prefer-stateless-function': 'off'
  },
  globals: {
    it: false,
    describe: false,
    expect: false
  }
};
