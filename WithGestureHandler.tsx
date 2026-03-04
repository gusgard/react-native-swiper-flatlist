import { FlatList as RNFlatList } from 'react-native';

import { createSwiperFlatList } from './src/components/SwiperFlatList/SwiperFlatList';

let GestureHandlerFlatList = RNFlatList;
try {
  GestureHandlerFlatList = require('react-native-gesture-handler').FlatList;
} catch (error) {
  console.warn(
    "react-native-gesture-handler isn't installed, please install it or remove the WithGestureHandler import",
  );
}

export const SwiperFlatListWithGestureHandler = createSwiperFlatList(GestureHandlerFlatList);

// https://gist.github.com/Venryx/7cff24b17867da305fff12c6f8ef6f96
type Handle<T> = T extends React.ForwardRefExoticComponent<React.RefAttributes<infer T2>>
  ? T2
  : never;
export type SwiperFlatListWithGestureHandler = Handle<typeof SwiperFlatListWithGestureHandler>;
