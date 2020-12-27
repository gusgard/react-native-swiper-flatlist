const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  extends: [
    '@react-native-community',
    // 'prettier',
    // 'prettier/flowtype',
    // 'prettier/react',
    // 'eslint:recommended',
    // 'plugin:import/errors',
    // 'plugin:import/warnings',
  ],
  plugins: ['detox'],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    es6: true,
    node: true,
  },
  rules: {
    'consistent-return': WARNING,
  },
  settings: {
    'import/resolver': {
      reactnative: {},
    },
    react: {
      pragma: 'React', // Pragma to use, default to "React"
      version: '99', // React version, default to the latest React stable release
    },
  },
  globals: {
    it: false,
    describe: false,
    expect: false,
  },
};
