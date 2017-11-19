import { shallow } from 'enzyme';
import React from 'react';

import SwiperFlatList from './index';

const logo = { uri: 'https://...' };
const items = [{ id: 1, picture: logo }, { id: 2, picture: logo }];

it('renders correctly', () => {
  const wrapper = shallow(<SwiperFlatList data={items} />);
  expect(wrapper).toMatchSnapshot();
});
