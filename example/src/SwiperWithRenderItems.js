import React from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';

import { fox, cat, background, element, lion } from './images';

const { width, height } = Dimensions.get('window');

const newImage = [lion, fox, cat, background, element];
const image = index => ({ image: newImage[index % newImage.length] });

const items = [
  { image: { uri: 'https://app.tutiixx.com/wp-content/uploads/2018/12/tshirt-banner.jpg' } },
  {
    image: {
      uri:
        'https://s3.envato.com/files/216320406/BEE-1797-Fashion%20Sale%20Banners_01_Preview3.jpg',
    },
  },
  {
    image: {
      uri: 'https://s3.envato.com/files/168119903/BEE-1096-Fashion%20Banners_01_preview4.jpg',
    },
  },
];

export default () => {
  return (
    <SwiperFlatList
      autoplay
      autoplayLoop
      autoplayDelay={5}
      showPagination
      data={items}
      renderItem={({ item }) => <Image style={styles.image} source={item.image} />}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    height: height * 0.5,
    width,
  },
});
