import React from 'react';
import { Image } from 'react-native';
import { render } from 'react-native-testing-library';

import { SwiperFlatList } from './SwiperFlatList';

type Item = {
  id: number;
  thumbnail: { uri: string };
};
const logo = { uri: 'https://...' };
const items: Item[] = [
  { id: 1, thumbnail: logo },
  { id: 2, thumbnail: logo },
];

describe('swiper flatlist', () => {
  it('renders correctly', () => {
    const { toJSON } = render(
      <SwiperFlatList
        // <SwiperFlatList<typeof items>
        renderItem={({ item }) => <Image source={item.thumbnail} />}
        data={items}
      />,
    );
    expect(toJSON()).toMatchSnapshot();
  });
  it('renders empty data correctly', () => {
    const { toJSON } = render(
      <SwiperFlatList
        // <SwiperFlatList<Item[]>
        renderItem={({ item }) => <Image source={item.thumbnail} />}
        data={[]}
      />,
    );
    expect(toJSON()).toMatchSnapshot();
  });
  it('renders children', () => {
    const { toJSON } = render(
      <SwiperFlatList>
        <Image source={items[0].thumbnail} />
        <Image source={items[1].thumbnail} />
      </SwiperFlatList>,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
