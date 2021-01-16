// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
const { SwiperFlatList: SwiperFlatListBase } = require('./SwiperFlatList.tsx');

try {
  require('./global.css');
} catch (error) {}

export const SwiperFlatList = SwiperFlatListBase;
