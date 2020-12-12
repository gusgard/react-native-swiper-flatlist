import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, View, ViewPropTypes } from 'react-native';

import { colors, vertical, horizontal } from '../../themes';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'row',
    marginVertical: vertical.xxSmall,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    width: '100%',
  },
  pagination: {
    bottom: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
  },
});

const Pagination = ({
  size,
  paginationIndex,
  scrollToIndex,
  paginationDefaultColor,
  paginationActiveColor,
  paginationStyle,
  paginationStyleItem,
  renderRightButton,
  renderLeftButton,
  hasButton,
  onPaginationSelectedIndex,
}) => {
  if (hasButton) {
    return (
      <View style={[styles.container, paginationStyle]}>
        {renderLeftButton()}
        {Array.from({ length: size }).map((_, index) => (
              <View
                  style={[
                    styles.pagination,
                    paginationStyleItem,
                    paginationIndex === index
                      ? { backgroundColor: paginationActiveColor }
                      : { backgroundColor: paginationDefaultColor },
                  ]}
                  key={index}
                  onPress={() => scrollToIndex({ index })}
                />
        ))}
        {renderRightButton()}
      </View>
    )
  }
  return (
    <View style={[styles.container, paginationStyle]}>
      {Array.from({ length: size }).map((_, index) => (
        <TouchableOpacity
          style={[
            styles.pagination,
            paginationStyleItem,
            paginationIndex === index
              ? { backgroundColor: paginationActiveColor }
              : { backgroundColor: paginationDefaultColor },
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
Pagination.propTypes = {
  scrollToIndex: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
  paginationIndex: PropTypes.number,
  paginationActiveColor: PropTypes.string,
  paginationDefaultColor: PropTypes.string,
  paginationStyle: ViewPropTypes.style,
  paginationStyleItem: ViewPropTypes.style,
  renderRightButton: PropTypes.func,
  renderLeftButton: PropTypes.func,
  onPaginationSelectedIndex: PropTypes.func
};

Pagination.defaultProps = {
  paginationIndex: 0,
  paginationActiveColor: colors.white,
  paginationDefaultColor: colors.gray,
  paginationStyle: {},
  paginationStyleItem: {},
  onPaginationSelectedIndex: undefined,
};

export default Pagination;
