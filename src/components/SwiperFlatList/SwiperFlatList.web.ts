const { SwiperFlatList: SwiperFlatListBase } = require('./SwiperFlatList.tsx');

try {
  require('./global.css');
} catch (error) {}

export const SwiperFlatList = SwiperFlatListBase;
