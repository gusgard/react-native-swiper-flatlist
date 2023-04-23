const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  extends: ['@react-native-community'],
  plugins: ['detox'],
  globals: {
    it: false,
    describe: false,
    expect: false,
  },
  rules: {
    'react-native/no-inline-styles': OFF,
  },
};
