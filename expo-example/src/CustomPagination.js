import React from 'react';
import { StyleSheet } from 'react-native';
import { Pagination } from 'react-native-swiper-flatlist';

const styles = StyleSheet.create({
  paginationContainer: {
    top: 0,
  },
  pagination: {
    borderRadius: 2,
  },
});

export const CustomPagination = (props) => {
  return (
    <Pagination
      {...props}
      paginationStyle={styles.paginationContainer}
      paginationStyleItem={styles.pagination}
      paginationDefaultColor="tomato"
      paginationActiveColor="white"
    />
  );
};
