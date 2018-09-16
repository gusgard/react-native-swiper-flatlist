import React, { PureComponent } from 'react';
import { Text, Dimensions, Image, StyleSheet, View } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';

import Pagination from './Pagination';
import { fox, cat, background, element, lion } from './images';

export const { width, height } = Dimensions.get('window');

const newImage = [lion, fox, cat, background, element];
const image = index => ({ image: newImage[index % newImage.length] });

const items = Array.from(Array(5)).map((_, index) => image(index));

export default class App extends PureComponent {
  renderItemComponent = ({ item }) => <Image style={styles.image} source={item.image} />;

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <SwiperFlatList
            autoplay
            autoplayDelay={3}
            index={3}
            autoplayLoop
            data={items}
            renderItem={this.renderItemComponent}
            showPagination
          />
        </View>
        <View style={styles.container}>
          <SwiperFlatList
            autoplay
            autoplayDelay={1.5}
            autoplayLoop
            index={3}
            showPagination
            PaginationComponent={Pagination}
          >
            <View style={[styles.child, { backgroundColor: 'tomato' }]}>
              <Text style={styles.text}>1</Text>
            </View>
            <View style={[styles.child, { backgroundColor: 'thistle' }]}>
              <Text style={styles.text}>2</Text>
            </View>
            <View style={[styles.child, { backgroundColor: 'skyblue' }]}>
              <Text style={styles.text}>3</Text>
            </View>
            <View style={[styles.child, { backgroundColor: 'teal' }]}>
              <Text style={styles.text}>4</Text>
            </View>
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
    height: height * 0.5,
    width,
  },
  child: {
    height: height * 0.5,
    width,
    justifyContent: 'center',
  },
  text: {
    fontSize: width * 0.5,
    textAlign: 'center',
  },
});
