import { Dimensions, StyleSheet } from 'react-native';

export const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  paginationContainer: {
    position: 'absolute',
    flexDirection: 'row',
    marginVertical: height * 0.0125,
    justifyContent: 'center',
    top: 0,
    left: width * 0.25,
    right: width * 0.25
  },
  pagination: {
    width: width * 0.0375,
    height: width * 0.0375,
    borderRadius: 2,
    marginHorizontal: width * 0.025
  }
});
