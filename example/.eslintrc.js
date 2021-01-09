const OFF = 0;

module.exports = {
  root: true,
  extends: '@react-native-community',
    rules: {
    'react-native/no-inline-styles': OFF,
  },
  globals: {
    describe: false,
    it: false,
    beforeEach: false,
  },
};
