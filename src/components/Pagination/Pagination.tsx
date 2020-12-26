import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

import {colors, vertical, horizontal } from '../../themes';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    marginVertical: vertical.xxSmall,
    justifyContent: 'center',
    bottom: 0,
    width: '100%',
  },
  pagination: {
    width: horizontal.small,
    height: horizontal.small,
    borderRadius: 25,
    marginHorizontal: horizontal.xSmall,
  },
});

type Props = {
  scrollToIndex: (item: {index: number}) => void;
  size: number;
  paginationIndex: number;
  paginationActiveColor: string;
  paginationDefaultColor: string;
  paginationStyle: ViewStyle;
  paginationStyleItem: ViewStyle;
  paginationStyleItemActive: ViewStyle;
  paginationStyleItemInactive: ViewStyle;
  onPaginationSelectedIndex: () => void;
  e2eId: string;
};

export const Pagination: React.FC<Props> = ({
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
  e2eId = '',
}) => {
  return (
    <View style={[styles.container, paginationStyle]}>
      {Array.from({ length: size }).map((_, index) => (
        <TouchableOpacity
          testID={`${e2eId}_pagination_${index}`}
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
