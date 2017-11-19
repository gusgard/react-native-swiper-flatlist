import { StyleSheet } from 'react-native';

import { vertical, colors, horizontal, width } from '../../themes';

const size = width * 0.9;

export default StyleSheet.create({
  container: {
    marginVertical: vertical.xxSmall,
  },
  imageContainer: {
    height: size,
    width,
    justifyContent: 'center',
  },
  image: {
    alignSelf: 'center',
    height: size,
    width: size,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginVertical: vertical.xxSmall,
    justifyContent: 'center',
  },
  dot: {
    width: horizontal.small,
    height: horizontal.small,
    backgroundColor: colors.primaryLight,
    borderRadius: 25,
    marginHorizontal: horizontal.xSmall,
  },
  dotActive: {
    backgroundColor: colors.primaryDark,
  },
});
