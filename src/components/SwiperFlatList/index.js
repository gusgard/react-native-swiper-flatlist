import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, FlatList, Image } from 'react-native';

import styles from './styles';

export default class SwiperFlatList extends PureComponent {
  static propTypes = {
    items: PropTypes.array.isRequired,
  };

  state = {
    index: 0,
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

  keyExtractor = item => item.id;

  renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image style={styles.image} source={item.thumbnail} />
    </View>
  );

  render() {
    const { items } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          ref={component => {
            this.flatListRef = component;
          }}
          data={items}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onMomentumScrollEnd={this.onScrollEnd}
        />
        <View style={styles.dotsContainer}>
          {items.map((item, index) => (
            <TouchableOpacity
              style={[
                styles.dot,
                this.state.index === index && styles.dotActive,
              ]}
              key={item.id}
              onPress={() => this.goTo(index)}
            />
          ))}
        </View>
      </View>
    );
  }
}
