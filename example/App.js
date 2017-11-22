import React, { PureComponent } from 'react';
import { Text, Dimensions, Image, StyleSheet, View } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';

export const { width, height } = Dimensions.get('window');

const newImage = {
  0: 'business',
  1: 'cats',
  2: 'city',
  3: 'food',
  4: 'nightlife',
  5: 'fashion',
  6: 'people',
  7: 'nature',
  8: 'animals',
  9: 'imageUrl',
};

const image = index => ({
  thumbnail: {
    uri: `https://lorempixel.com/200/200/${
      newImage[index % (Object.keys(newImage).length - 1)]
    }`,
  },
});

const items = Array.from(Array(4)).map((_, index) => image(index));

export default class App extends PureComponent {
  renderItemComponent = ({ item }) => (
    <Image style={styles.image} source={item.thumbnail} />
  );

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <SwiperFlatList
            autoplay
            autoplayDelay={1}
            autoplayLoop
            // horizontal={false}
            showPagination
            data={items}
            renderItem={this.renderItemComponent}
          />
        </View>
        <View style={styles.container}>
          <SwiperFlatList
            autoplay
            autoplayDelay={1}
            showPagination
            autoplayLoop
          >
            <Image style={styles.image} source={items[0].thumbnail} />
            <Image style={styles.image} source={items[1].thumbnail} />
            <Image style={styles.image} source={items[2].thumbnail} />
            <Image style={styles.image} source={items[3].thumbnail} />
          </SwiperFlatList>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    height,
    width,
  },
});
