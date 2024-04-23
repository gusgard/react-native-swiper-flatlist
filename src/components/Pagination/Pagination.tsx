import React from 'react';
import { I18nManager, StyleSheet, TouchableOpacity, View } from 'react-native';

import { colors, vertical, horizontal } from '../../themes';
import { PaginationProps } from './PaginationProps';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    marginVertical: vertical.xxSmall,
    justifyContent: 'center',
    alignSelf: 'center',
    bottom: 0,
    height: horizontal.small,
  },
  pagination: {
    width: horizontal.small,
    height: horizontal.small,
    borderRadius: 25,
    marginHorizontal: horizontal.xSmall,
  },
});

export const Pagination: React.FC<PaginationProps> = ({
  size,
  paginationIndex = 0,
  scrollToIndex,
  paginationDefaultColor = colors.gray,
  paginationActiveColor = colors.white,
  paginationStyle = {},
  paginationStyleItem = {},
  paginationStyleItemActive = {},
  paginationStyleItemInactive = {},
  onPaginationSelectedIndex,
  paginationTapDisabled = false,
  e2eID = '',
  paginationAccessibilityLabels = [],
}) => {
  return (
    <View style={[styles.container, paginationStyle]}>
      {Array.from({ length: size }).map((_, index) => (
        <TouchableOpacity
          testID={`${e2eID}_pagination_${index}`}
          style={[
            styles.pagination,
            paginationStyleItem,
            paginationIndex === index
              ? { backgroundColor: paginationActiveColor }
              : { backgroundColor: paginationDefaultColor },
            paginationIndex === index ? paginationStyleItemActive : paginationStyleItemInactive,
          ]}
          key={index}
          onPress={() => {
            scrollToIndex({ index });
            onPaginationSelectedIndex?.();
          }}
          disabled={paginationTapDisabled}
          accessibilityLabel={paginationAccessibilityLabels[index]}
          accessible={!!paginationAccessibilityLabels[index]}
        />
      ))}
    </View>
  );
};
