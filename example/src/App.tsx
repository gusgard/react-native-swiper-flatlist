import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';

import SwiperWithRenderItems from './SwiperWithRenderItems';
import SwiperWithChildren from './SwiperWithChildren';

// TODO: we should add RTL tests
// I18nManager.forceRTL(true);
// I18nManager.allowRTL(true);

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
