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

const items = Array.from(Array(6)).map((_, index) => image(index));

export default class App extends PureComponent {
  renderItemComponent = ({ item }) => (
    <Image style={styles.image} source={item.thumbnail} />
  );

  // state = {
  //   autoplayDelay: 1,
  // };

  render() {
    // setTimeout(
    //   () => this.setState({ autoplayDelay: this.state.autoplayDelay + 0.1 }),
    //   5000,
    // );
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          {/* <SwiperFlatList
            // horizontal={false}
            autoplay
            autoplayDelay={1}
            index={5}
            autoplayLoop
            data={items}
            renderItem={this.renderItemComponent}
            showPagination
          /> */}
        </View>
        <View style={styles.container}>
          <SwiperFlatList
            // horizontal={false}
            autoplay
            autoplayDelay={1}
            // autoplayDelay={this.state.autoplayDelay}
            autoplayLoop
            // index={4}
            // index={2}
            showPagination
          >
            <View style={{ height, width, backgroundColor: 'tomato' }} />
            <View style={{ height, width, backgroundColor: 'blue' }} />
            <View style={{ height, width, backgroundColor: 'red' }} />
            <Image style={styles.image} source={items[1].thumbnail} />
            <Image style={styles.image} source={items[2].thumbnail} />
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
