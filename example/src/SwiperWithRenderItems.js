import React from 'react';
import { Dimensions, ImageBackground, StyleSheet, Text } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

import { fox, cat, background, element, lion } from './images';
import { CustomPagination } from './CustomPagination';

const { width } = Dimensions.get('window');

const newImage = [lion, fox, cat, background, element];
const image = (index) => ({ image: newImage[index % newImage.length] });
const items = Array.from(Array(5)).map((_, index) => image(index));

export default () => {
  return (
    <SwiperFlatList
      autoplay
      autoplayDelay={2}
      // index={3}
      // autoplayLoop
      // autoplayInvertDirection
      data={items}
      renderItem={({ item, index }) => (
        <ImageBackground
          style={styles.image}
          source={item.image}
          testID={`container_swiper_renderItem_screen_${index}`}
        >
          <Text style={styles.text}>Item at index {index}</Text>
        </ImageBackground>
      )}
      showPagination
      PaginationComponent={CustomPagination}
      e2eID="container_swiper_renderItem"
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  text: {
    fontSize: width * 0.1,
    color: 'whitesmoke',
    textAlign: 'center',
  },
});
