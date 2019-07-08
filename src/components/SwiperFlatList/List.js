import React from 'react';

import SwiperFlatList from './SwiperFlatList';

// TODO rename to index.
export default class List extends React.PureComponent {
  constructor(props) {
    super(props);

    this.viewabilityConfig = {
      // waitForInteraction: true,
      viewAreaCoveragePercentThreshold: 95,
      minimumViewTime: 100,
    };
  }

  render() {
    return (
      <SwiperFlatList
        {...this.props}
        viewabilityConfig={this.viewabilityConfig}
        onViewableItemsChanged={({ viewableItems, changed }) => {
          console.log('viewableItems', viewableItems);
          console.log('changed', changed);
        }}
      />
    );
  }
}
