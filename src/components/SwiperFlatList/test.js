import { shallow } from 'enzyme';
import React from 'react';
import { Image } from 'react-native';

import SwiperFlatList from './index';

const logo = { uri: 'https://...' };
const items = [{ id: 1, thumbnail: logo }, { id: 2, thumbnail: logo }];

describe('swiper flatlist', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <SwiperFlatList
        renderItem={({ item }) => <Image source={item.thumbnail} />}
        data={items}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
