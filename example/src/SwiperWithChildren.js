import React from 'react';
import { Alert, TouchableOpacity, Text, Dimensions, StyleSheet } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

const { width, height } = Dimensions.get('window');

export default () => {
  const scrollRef = React.useRef(null);
  const goToLastIndex = () => {
    scrollRef.current.goToLastIndex();
  };
  const goToFirstIndex = () => {
    scrollRef.current.goToFirstIndex();
  };
  const goToSecondIndex = () => {
    scrollRef.current.scrollToIndex({ index: 1 });
  };
  const getCurrentIndex = () => {
    const currentIndex = scrollRef.current.getCurrentIndex();
    Alert.alert(`the current index is ${currentIndex}`);
  };
  const getPrevIndex = () => {
    const prevIndex = scrollRef.current.getPrevIndex();
    Alert.alert(`the previous index is ${prevIndex}`);
  };
  const onChangeIndex = ({ index, prevIndex }) => {
    console.log({ index, prevIndex });
  };
  return (
    <SwiperFlatList
      showPagination
      ref={scrollRef}
      onChangeIndex={onChangeIndex}
      e2eID="container_swiper"
    >
      <TouchableOpacity
        style={[styles.child, { backgroundColor: 'salmon' }]}
        onPress={goToLastIndex}
        testID="container_swiper_screen_0"
      >
        <Text style={styles.smallText}>0 - Go to last index</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.child, { backgroundColor: 'skyblue' }]}
        onPress={getPrevIndex}
        testID="container_swiper_screen_1"
      >
        <Text style={styles.smallText}>1 - Press to get the previous index</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.child, { backgroundColor: 'tomato' }]}
        onPress={getCurrentIndex}
        testID="container_swiper_screen_2"
      >
        <Text style={styles.smallText}>2 - Press to get the current index</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.child, { backgroundColor: 'skyblue' }]}
        onPress={goToSecondIndex}
        testID="container_swiper_screen_3"
      >
        <Text style={styles.smallText}>3 - Go to the second index</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.child, { backgroundColor: 'teal' }]}
        onPress={goToFirstIndex}
        testID="container_swiper_screen_4"
      >
        <Text style={styles.smallText}>4 - Go to first index</Text>
      </TouchableOpacity>
    </SwiperFlatList>
  );
};

const styles = StyleSheet.create({
  child: {
    height: height * 0.5,
    width,
    justifyContent: 'center',
  },
  smallText: {
    fontSize: width * 0.1,
    textAlign: 'center',
  },
});
