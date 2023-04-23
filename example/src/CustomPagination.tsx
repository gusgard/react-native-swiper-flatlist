import React from 'react';
import { StyleSheet } from 'react-native';
import { Pagination, PaginationProps } from 'react-native-swiper-flatlist';

const styles = StyleSheet.create({
  paginationContainer: {
    top: 0,
  },
  pagination: {
    borderRadius: 2,
  },
});

export const CustomPagination = (props: JSX.IntrinsicAttributes & PaginationProps) => {
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
