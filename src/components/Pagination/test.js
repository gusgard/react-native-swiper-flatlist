import React from 'react';
import { render } from 'react-native-testing-library';

import { Pagination } from './Pagination';

describe('pagination', () => {
  it('renders correctly', () => {
    const { toJSON } = render(<Pagination scrollToIndex={() => undefined} size={5} />);
    expect(toJSON()).toMatchSnapshot();
  });
  it('renders all props', () => {
    const { toJSON } = render(
      <Pagination
        scrollToIndex={() => undefined}
        paginationIndex={1}
        paginationActiveColor="black"
        paginationDefaultColor="white"
        size={5}
      />,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
