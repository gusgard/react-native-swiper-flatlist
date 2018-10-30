import { shallow } from 'enzyme';
import React from 'react';
import { Image } from 'react-native';

import SwiperFlatList from './index';

const logo = { uri: 'https://...' };
const items = [{ id: 1, thumbnail: logo }, { id: 2, thumbnail: logo }];

describe('swiper flatlist', () => {
  it('renders correctly', () => {
    const wrapper = shallow(
      <SwiperFlatList renderItem={({ item }) => <Image source={item.thumbnail} />} data={items} />,
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('renders children', () => {
    const wrapper = shallow(
      <SwiperFlatList>
        <Image source={items[0].thumbnail} />
        <Image source={items[1].thumbnail} />
      </SwiperFlatList>,
    );
    expect(wrapper).toMatchSnapshot();
  });
  describe('call onIndexChanged callback', () => {
    const fn = jest.fn();
    const wrapper = shallow(
      <SwiperFlatList onIndexChanged={fn}>
        <Image source={items[0].thumbnail} />
        <Image source={items[1].thumbnail} />
      </SwiperFlatList>,
    );
    it('.. on mount', () => {
      expect(fn).toHaveBeenCalledWith(0);
    });
    it('.. while scrolling to index', () => {
      wrapper.instance()._scrollToIndex(1);
      expect(fn).toHaveBeenCalledWith(1);
    });
  });
});
