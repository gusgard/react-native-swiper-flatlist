import React from 'react';
import { Alert, TouchableOpacity, Text, Dimensions, Image, StyleSheet, View } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';

import Pagination from './Pagination';
import { fox, cat, background, element, lion } from './images';

export const { width, height } = Dimensions.get('window');

const newImage = [lion, fox, cat, background, element];
const image = index => ({ image: newImage[index % newImage.length] });

const items = Array.from(Array(5)).map((_, index) => image(index));

export default () => {
  const scrollRef = React.useRef(null);
  const goToLastIndex = () => {
    scrollRef.current.goToLastIndex();
  };
  const goToFirstIndex = () => {
    scrollRef.current.goToFirstIndex();
  };
  const getCurrentIndex = () => {
    const currentIndex = scrollRef.current.getCurrentIndex();
    Alert.alert(`the current index is ${currentIndex}`);
  };
  const onChangeIndex = ({ index, prevIndex }) => {
    console.log({ index, prevIndex });
  };
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        {/* <SwiperFlatList
            autoplay
            autoplayDelay={1}
            // index={3} // FIX THIS
            autoplayLoop
            data={items}
            renderItem={({ item }) => <Image style={styles.image} source={item.image} />}
            showPagination
            // vertical={true}
          /> */}
      </View>
      <View style={styles.container}>
        <SwiperFlatList
          autoplay // BREAK EVERYTHING..
          // autoplayDelay={1.5}
          // autoplayLoop
          // index={3}
          // vertical={true}
          showPagination
          autoplayInvertDirection
          PaginationComponent={Pagination}
          ref={scrollRef}
          onChangeIndex={onChangeIndex}
        >
          <TouchableOpacity
            style={[styles.child, { backgroundColor: 'salmon' }]}
            onPress={goToLastIndex}
          >
            <Text style={styles.smallText}>0 - Go to last index</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.child, { backgroundColor: 'tomato' }]}
            onPress={getCurrentIndex}
          >
            <Text style={styles.smallText}>1 - Press to get the current index</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.child, { backgroundColor: 'skyblue' }]}
            onPress={getCurrentIndex}
          >
            <Text style={styles.smallText}>2 - Press to get the current index</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.child, { backgroundColor: 'teal' }]}
            onPress={goToFirstIndex}
          >
            <Text style={styles.smallText}>3 - Go to last index</Text>
          </TouchableOpacity>
        </SwiperFlatList>
      </View>
    </View>
  );
};

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
  smallText: {
    fontSize: width * 0.1,
    textAlign: 'center',
  },
});
