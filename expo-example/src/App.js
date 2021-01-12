import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';

import SwiperWithRenderItems from './SwiperWithRenderItems';
import SwiperWithChildren from './SwiperWithChildren';

export default () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <SwiperWithRenderItems />
      </View>
      <View style={styles.container}>
        <SwiperWithChildren />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
