import React from 'react';
import { I18nManager, TouchableOpacity, View } from 'react-native';

import { colors, useLayout } from '../../themes';
import { PaginationProps } from './PaginationProps';

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
  const { horizontal, vertical } = useLayout();

  return (
    <View
      style={[
        {
          position: 'absolute',
          flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
          marginVertical: vertical.xxSmall,
          justifyContent: 'center',
          alignSelf: 'center',
          bottom: 0,
          height: horizontal.small,
        },
        paginationStyle,
      ]}
    >
      {Array.from({ length: size }).map((_, index) => (
        <TouchableOpacity
          testID={`${e2eID}_pagination_${index}`}
          style={[
            {
              width: horizontal.small,
              height: horizontal.small,
              borderRadius: 25,
              marginHorizontal: horizontal.xSmall,
            },
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
