import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  paginationContainer: {
    position: 'absolute',
    flexDirection: 'row',
    marginVertical: height * 0.0125,
    justifyContent: 'center',
    top: 0,
    left: width * 0.25,
    right: width * 0.25,
  },
  pagination: {
    width: width * 0.0375,
    height: width * 0.0375,
    borderRadius: 2,
    marginHorizontal: width * 0.025,
  },
});

const Pagination = ({
  size,
  paginationIndex,
  scrollToIndex,
  paginationDefaultColor,
  paginationActiveColor,
}) => {
  return (
    <View style={styles.paginationContainer}>
      {Array.from({ length: size }).map((_, index) => (
        <TouchableOpacity
          style={[
            styles.pagination,
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
};

Pagination.defaultProps = {
  data: [],
  paginationIndex: 0,
  paginationActiveColor: 'black',
  paginationDefaultColor: 'white',
};

export default Pagination;
