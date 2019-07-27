import React from 'react';
import { Alert, TouchableOpacity, Text, Dimensions, StyleSheet } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';

import Pagination from './Pagination';

const { width, height } = Dimensions.get('window');

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
        style={[styles.child, { backgroundColor: 'skyblue' }]}
        onPress={getPrevIndex}
      >
        <Text style={styles.smallText}>1 - Press to get the previous index</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.child, { backgroundColor: 'tomato' }]}
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
