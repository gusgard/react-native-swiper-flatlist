import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, FlatList } from 'react-native';

import styles from './styles';

export default class SwiperFlatList extends PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired,
    onMomentumScrollEnd: PropTypes.func,
    showPagination: PropTypes.bool.isRequired,
    // paginationActiveColor: PropTypes.string,
    // paginationColor: PropTypes.string,
    // loop: PropTypes.bool,
    horizontal: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
    autoplayDelay: PropTypes.number.isRequired,
    autoplay: PropTypes.bool.isRequired,
    autoplayDirection: PropTypes.bool.isRequired,
    autoplayLoop: PropTypes.bool.isRequired,

    renderItem: PropTypes.func,
    // scrollToIndex: PropTypes.func,

    // Only is allowed children or data not both
    children(props, propName) {
      const { data } = props;
      if (!props[propName] && data && data.length === 0) {
        return new Error('Invalid props, `data` or `children` is required');
      }
      if (data && data.length !== 0 && !props.renderItem) {
        return new Error('Invalid props, `renderItem` is required');
      }
    },
  };

  static defaultProps = {
    index: 0,
    data: [],
    autoplayDelay: 3,
    autoplayDirection: true,
    autoplayLoop: false,
    autoplay: false,
    showPagination: false,
    horizontal: true,
  };

  state = {
    index: this.props.index,
  };

  componentWillMount() {
    this.setup(this.props);
  }
  componentDidMount() {
    const { autoplay } = this.props;
    if (autoplay) {
      this.autoplay();
    }
  }
  componentWillUpdate(nextProps) {
    this.setup(nextProps);
  }

  componentWillUnmount() {
    if (this.autoplayTimer) {
      clearTimeout(this.autoplayTimer);
    }
  }

  setup = ({ children, data, renderItem }) => {
    if (children) {
      this.data = children;
      this.renderItem = this.renderChildren;
    } else if (data) {
      this.data = data;
      this.renderItem = renderItem;
    }
  };

  autoplay = (index = 0) => {
    const { autoplayDelay, autoplayLoop } = this.props;
    if (this.autoplayTimer) {
      clearTimeout(this.autoplayTimer);
    }
    const isEnd = index !== this.data.length - 1;

    if (autoplayLoop || isEnd) {
      this.autoplayTimer = setTimeout(() => {
        const nextIndex = (index + 1) % this.data.length;
        this._scrollToIndex(nextIndex);
      }, autoplayDelay * 1000);
    }
  };

  _onMomentumScrollEnd = e => {
    const { autoplay, horizontal, onMomentumScrollEnd } = this.props;
    const { contentOffset, layoutMeasurement } = e.nativeEvent;
    let index;
    if (horizontal) {
      // Divide the horizontal offset by the width of the view to see which page is visible
      index = Math.floor(contentOffset.x / layoutMeasurement.width);
    } else {
      index = Math.floor(contentOffset.y / layoutMeasurement.height);
    }
    this.setState({ index });
    if (onMomentumScrollEnd) {
      onMomentumScrollEnd();
    }

    if (autoplay) {
      this.autoplay(index);
    }
  };

  _scrollToIndex = index => {
    const params = { animated: true, index };
    this.flatListRef.scrollToIndex(params);
  };

  _keyExtractor = (item, index) => index;

  renderChildren = ({ item }) => item;

  render() {
    const { horizontal, showPagination, children, ...props } = this.props;
    return (
      <View>
        <FlatList
          ref={component => {
            this.flatListRef = component;
          }}
          keyExtractor={this._keyExtractor}
          horizontal={horizontal}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          pagingEnabled
          onMomentumScrollEnd={this._onMomentumScrollEnd}
          {...props}
          data={this.data}
          renderItem={this.renderItem}
        />
        {showPagination && (
          <View style={styles.dotsContainer}>
            {this.data.map((_, index) => (
              <TouchableOpacity
                style={[
                  styles.dot,
                  this.state.index === index && styles.dotActive,
                ]}
                key={index}
                onPress={() => this._scrollToIndex(index)}
              />
            ))}
          </View>
        )}
      </View>
    );
  }
}
