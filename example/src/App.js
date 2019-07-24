import React from 'react';
import { StyleSheet, View } from 'react-native';

import SwiperWithRenderItems from './SwiperWithRenderItems';
import SwiperWithChildren from './SwiperWithChildren';

export default () => {
  return (
    <View style={styles.container}>
      <View style={styles.container}>{/* <SwiperWithRenderItems /> */}</View>
      <View style={styles.container}>
        <SwiperWithChildren />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
