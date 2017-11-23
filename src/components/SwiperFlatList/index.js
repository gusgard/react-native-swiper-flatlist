import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, FlatList } from 'react-native';

import styles from './styles';

// import { vertical, colors, height, width } from '../../themes';

export default class SwiperFlatList extends PureComponent {
  static propTypes = {
    data: PropTypes.array.isRequired,
    onMomentumScrollEnd: PropTypes.func,
    showPagination: PropTypes.bool.isRequired,
    // paginationActiveColor: PropTypes.string,
    // paginationColor: PropTypes.string,
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

  componentWillMount() {
    this.setup(this.props);
    // console.log(this.state, this.data.length);
    // const nextIndex =
    //   this.data.length - 1 === this.props.index ? 0 : this.props.index;
    this.setState({ index: this.props.index });
  }
  componentDidMount() {
    const { autoplay } = this.props;
    const { index } = this.state;
    // console.log(index);
    if (autoplay) {
      this.autoplay(index);
    }

    if (index !== 0) {
      this._scrollToIndex(index, false);
      // setTimeout(() => {
      //   console.log('ok');
      // }, 0);
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log('-------');
    // const nextIndex =
    //   nextProps.data.length - 1 === nextProps.index ? 0 : nextProps.index;
    // this.setState({ index: nextIndex });
    // console.log(nextProps.index, nextIndex);
    // this.setup(nextProps);
  }
  // componentWillUpdate(nextProps) {
  // this.setup(nextProps);
  // }
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
    // const nextIndex = this.data.length - 1 === index ? 0 : index;
    // console.log(index, nextIndex);
    // this.setState({ index: nextIndex });
  };

  autoplay = index => {
    const { autoplayDelay, autoplayLoop } = this.props;
    if (this.autoplayTimer) {
      clearTimeout(this.autoplayTimer);
    }
    const isEnd = index === this.data.length - 1;

    if (autoplayLoop || !isEnd) {
      this.autoplayTimer = setTimeout(() => {
        const nextIndex = (index + 1) % this.data.length;

        this._scrollToIndex(nextIndex, !isEnd);
      }, autoplayDelay * 1000);
    }
    if (isEnd) {
      // When scroll to the end and animated is false need to restart the autoplay
      setTimeout(() => {
        this.autoplayTimer = setTimeout(
          () => this._scrollToIndex(1, true),
          autoplayDelay * 1000,
        );
      }, autoplayDelay * 1000);
    }
  };

  _scrollToIndex = (index, animated) => {
    const params = { animated, index };
    this.setState(() => {
      // this.setState({ index });
      this.flatListRef.scrollToIndex(params);
      return { index };
    });
  };

  _onMomentumScrollEnd = e => {
    // console.log('_onMomentumScrollEnd');
    const { autoplay, horizontal, onMomentumScrollEnd } = this.props;
    const { contentOffset, layoutMeasurement } = e.nativeEvent;
    let index;
    if (horizontal) {
      // Divide the horizontal offset by the width of the view to see which page is visible
      index = Math.floor(contentOffset.x / layoutMeasurement.width);
    } else {
      index = Math.floor(contentOffset.y / layoutMeasurement.height);
    }

    // this.setState(() => {
    // console.log(autoplay);
    if (autoplay) {
      this.autoplay(index);
    } else {
      this.setState({ index });
    }
    // return { index };
    // });

    if (onMomentumScrollEnd) {
      onMomentumScrollEnd();
    }
  };

  _onScrollToIndexFailed = info => {
    console.log('fail');
    setTimeout(() => this._scrollToIndex(info.index, false));
  };

  _keyExtractor = (item, index) => index;

  renderChildren = ({ item }) => item;

  renderPagination = () => (
    <View style={styles.dotsContainer}>
      {this.data.map((_, index) => (
        <TouchableOpacity
          style={[styles.dot, this.state.index === index && styles.dotActive]}
          key={index}
          onPress={() => this._scrollToIndex(index, true)}
        />
      ))}
    </View>
  );

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
          onScrollToIndexFailed={this._onScrollToIndexFailed}
          {...props}
          data={this.data}
          // inverted
          initialNumToRender={0}
          renderItem={this.renderItem}
          // onViewableItemsChanged={(data, index, x) => {
          //   console.log(data, index, x);
          // }}
          // getItemLayout={(data, index, x) => {
          //   console.log(data, index, x);
          //   return {
          //     length: width,
          //     offset: width * index,
          //     index,
          //   };
          // }}
          // initialScrollIndex={this.state.index}
          // ListFooterComponent=
          // ListEmptyComponent loading...
        />
        {showPagination && this.renderPagination()}
      </View>
    );
  }
}
