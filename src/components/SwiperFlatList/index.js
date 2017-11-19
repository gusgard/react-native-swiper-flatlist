import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, FlatList } from 'react-native';

import styles from './styles';

export default class SwiperFlatList extends PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired,
    renderItem: PropTypes.func.isRequired,
    // showsPagination: PropTypes.bool,
    // activeDotColor: PropTypes.string,
    // dotColor: PropTypes.string,
    // loop: PropTypes.bool,
    index: PropTypes.number.isRequired,
    // autoplay: PropTypes.bool.isRequired,
    // scrollToIndex: PropTypes.func,
  };

  static defaultProps = {
    index: 0,
    // autoplay: false,
  };

  state = {
    index: this.props.index,
  };
  onScrollEnd = e => {
    const { contentOffset, layoutMeasurement } = e.nativeEvent;
    // Divide the horizontal offset by the width of the view to see which page is visible
    const index = Math.floor(contentOffset.x / layoutMeasurement.width);
    this.setState({ index });
  };

  goTo = index => {
    const params = { animated: true, index };
    this.flatListRef.scrollToIndex(params);
  };

  _keyExtractor = (item, index) => index;

  render() {
    const { data, renderItem } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          ref={component => {
            this.flatListRef = component;
          }}
          data={data}
          keyExtractor={this._keyExtractor}
          renderItem={renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onMomentumScrollEnd={this.onScrollEnd}
        />
        <View style={styles.dotsContainer}>
          {data.map((item, index) => (
            <TouchableOpacity
              style={[
                styles.dot,
                this.state.index === index && styles.dotActive,
              ]}
              key={index}
              onPress={() => this.goTo(index)}
            />
          ))}
        </View>
      </View>
    );
  }
}
