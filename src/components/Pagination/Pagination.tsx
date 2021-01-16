import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { colors, vertical, horizontal } from '../../themes';
import { PaginationProps } from './PaginationProps';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
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
  e2eID = '',
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
        />
      ))}
    </View>
  );
};
