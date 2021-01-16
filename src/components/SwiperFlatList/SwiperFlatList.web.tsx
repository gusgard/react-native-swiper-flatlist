// import React from 'react';
// import { Platform } from 'react-native';

// import { Pagination } from '../Pagination/Pagination';
import { SwiperFlatList as SwiperFlatListBase } from './SwiperFlatList';

// TODO: figure out how to use forwardRef with generics

// if (Platform.OS === 'web') {
//   try {
// FIX https://github.com/necolas/react-native-web/issues/1299#issuecomment-717428165
require('./react-native-web.css');
//   } catch (error) {}
// }

// const SwiperFlatList = React.forwardRef<RefProps, SwiperFlatListProps<SwiperType>>(
export const SwiperFlatList = SwiperFlatListBase;
