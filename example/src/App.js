import React, { PureComponent } from 'react';
import { Text, Dimensions, Image, StyleSheet, View } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';

import { fox, cat, background, element, lion } from './images';

export const { width, height } = Dimensions.get('window');

const newImage = [lion, fox, cat, background, element];
const image = index => ({ image: newImage[index % newImage.length] });

const items = Array.from(Array(6)).map((_, index) => image(index));

export default class App extends PureComponent {
  renderItemComponent = ({ item }) => (
    <View>
      <Image
        style={styles.image}
        source={item.image}
        // resizeMode={Image.resizeMode.stretch}
        // resizeMode={Image.resizeMode.contain}
        // resizeMode={Image.resizeMode.center}
        resizeMode={Image.resizeMode.cover}
        // resizeMode={Image.resizeMode.repeat}
      />
    </View>
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
          <SwiperFlatList
            // horizontal={false}
            autoplay
            autoplayDelay={3}
            // index={5}
            autoplayLoop
            data={items}
            renderItem={this.renderItemComponent}
            showPagination
          />
        </View>
        <View style={styles.container}>
          <SwiperFlatList
            // horizontal={false}
            autoplay
            autoplayDelay={1}
            // autoplayDelay={this.state.autoplayDelay}
            autoplayLoop
            // index={4}
            index={3}
            showPagination
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
