import { shallow } from 'enzyme';
import React from 'react';

import Pagination from './index';

const items = [1, 2, 3, 4, 5];

describe('pagination', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Pagination scrollToIndex={() => undefined} data={items} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders all props', () => {
    const wrapper = shallow(
      <Pagination
        scrollToIndex={() => undefined}
        paginationIndex={1}
        paginationActiveColor="black"
        paginationDefaultColor="white"
        data={items}
      />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
