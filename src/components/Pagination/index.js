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

const Pagination = ({
  size,
  paginationIndex,
  scrollToIndex,
  paginationDefaultColor,
  paginationActiveColor,
  paginationStyle,
  paginationStyleItem,
}) => {
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
          onPress={() => scrollToIndex({ index })}
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
};

Pagination.defaultProps = {
  paginationIndex: 0,
  paginationActiveColor: colors.white,
  paginationDefaultColor: colors.gray,
  paginationStyle: {},
  paginationStyleItem: {},
};

export default Pagination;
