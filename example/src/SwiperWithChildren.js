import React from 'react';
import { Alert, View, Image, Dimensions, StyleSheet } from 'react-native';
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
    console.log(new Date(), { index, prevIndex });
  };
  return (
    <SwiperFlatList
      autoplay
      autoplayLoop
      autoplayDelay={5}
      showPagination
      ref={scrollRef}
      onChangeIndex={onChangeIndex}
    >
      <View style={styles.child}>
        <Image
          source={{
            uri: 'https://app.tutiixx.com/wp-content/uploads/2018/12/tshirt-banner.jpg',
          }}
          style={{ width: null, height: null, flex: 1 }}
        />
      </View>
      <View style={styles.child}>
        <Image
          source={{
            uri:
              'https://s3.envato.com/files/216320406/BEE-1797-Fashion%20Sale%20Banners_01_Preview3.jpg',
          }}
          style={{ width: null, height: null, flex: 1 }}
        />
      </View>
      <View style={styles.child}>
        <Image
          source={{
            uri: 'https://s3.envato.com/files/168119903/BEE-1096-Fashion%20Banners_01_preview4.jpg',
          }}
          style={{ width: null, height: null, flex: 1 }}
        />
      </View>
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
