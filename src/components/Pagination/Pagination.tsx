import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';

import { colors, vertical, horizontal } from '../../themes';

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

export type PaginationProps = {
  scrollToIndex: (item: { index: number }) => void;
  size: number;
  paginationIndex?: number;
  paginationActiveColor?: string;
  paginationDefaultColor?: string;
  paginationStyle?: ViewStyle;
  paginationStyleItem?: ViewStyle;
  paginationStyleItemActive?: ViewStyle;
  paginationStyleItemInactive?: ViewStyle;
  onPaginationSelectedIndex?: () => void;
  disablePaginationPress?: boolean;
  e2eID?: string;
};

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
  disablePaginationPress = false,
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
          disabled={disablePaginationPress}
        />
      ))}
    </View>
  );
};
