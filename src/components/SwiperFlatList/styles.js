import { StyleSheet } from 'react-native';

import { vertical, colors, horizontal, width } from '../../themes';

export default StyleSheet.create({
  paginationContainer: {
    position: 'absolute',
    flexDirection: 'row',
    marginVertical: vertical.xxSmall,
    justifyContent: 'center',
    bottom: 0,
    left: width * 0.25,
    right: width * 0.25
  },
  pagination: {
    width: horizontal.small,
    height: horizontal.small,
    backgroundColor: colors.gray,
    borderRadius: 25,
    marginHorizontal: horizontal.xSmall
  },
  paginationActive: {
    backgroundColor: colors.primaryDark
  }
});
