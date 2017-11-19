import { StyleSheet } from 'react-native';

import { vertical, colors, horizontal, width } from '../../themes';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  dotsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    marginVertical: vertical.xxSmall,
    justifyContent: 'center',
    bottom: 0,
    left: width * 0.25,
    right: width * 0.25,
  },
  dot: {
    width: horizontal.small,
    height: horizontal.small,
    backgroundColor: colors.gray,
    borderRadius: 25,
    marginHorizontal: horizontal.xSmall,
  },
  dotActive: {
    backgroundColor: colors.primaryDark,
  },
});
