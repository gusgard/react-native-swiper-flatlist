import React from 'react';

import SwiperFlatList from './SwiperFlatList';

// TODO rename to index.
export default class List extends React.PureComponent {
  constructor(props) {
    super(props);

    this.viewabilityConfig = {
      // waitForInteraction: true,
      // viewAreaCoveragePercentThreshold: 95,
      minimumViewTime: 1000,
      itemVisiblePercentThreshold: 100,
    };
  }

  render() {
    // return <SwiperFlatList {...this.props} test={this.viewabilityConfig}></SwiperFlatList>;
    // console.log(this.flatListRef);

    return (
      <SwiperFlatList
        {...this.props}
        // ref={component => {
        //   this.flatListRef = component;
        // }}
        viewabilityConfig={this.viewabilityConfig}
        onViewableItemsChanged={({ viewableItems, changed }) => {
          console.log('viewableItems', viewableItems?.[0]?.index);
          console.log('changed', changed?.[0]?.index);
        }}
      />
    );
  }
}
