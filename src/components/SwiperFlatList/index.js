import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, FlatList } from 'react-native';

import { colors } from '../../themes';
import styles from './styles';

export default class SwiperFlatList extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    onMomentumScrollEnd: PropTypes.func,
    vertical: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,

    showPagination: PropTypes.bool.isRequired,
    paginationActiveColor: PropTypes.string,
    paginationDefaultColor: PropTypes.string,

    autoplayDelay: PropTypes.number.isRequired,
    autoplay: PropTypes.bool.isRequired,
    autoplayDirection: PropTypes.bool.isRequired,
    autoplayLoop: PropTypes.bool.isRequired,

    renderAll: PropTypes.bool,
    renderItem: PropTypes.func,

    // Only is allowed children or data not both
    children(props, propName) {
      const { data } = props;
      if (!props[propName] && data && data.length === 0) {
        return new Error('Invalid props, `data` or `children` is required');
      }
      if (data && data.length !== 0 && !props.renderItem) {
        return new Error('Invalid props, `renderItem` is required');
      }
      return undefined;
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
    vertical: false,
    renderAll: false,
  };

  componentWillMount() {
    this.setup(this.props);
    this.setState({ paginationIndex: this.props.index });
  }
  componentDidMount() {
    const { autoplay, index } = this.props;
    // const { paginationIndex } = this.state;
    if (autoplay) {
      this._autoplay(index);
    }

    if (index !== 0) {
      this._scrollToIndex(index, false);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // TODO improve shouldComponentUpdate
    const { paginationIndex } = this.state;
    const { paginationIndex: nextPaginationIndex } = nextState;
    const {
      children,
      data,
      renderItem,
      renderAll,
      autoplayDelay,
      autoplayDirection,
      autoplayLoop,
      autoplay,
      showPagination,
      vertical,
    } = this.props;
    const {
      children: newChildren,
      data: newData,
      renderItem: newRenderItem,
      renderAll: newRenderAll,
      autoplayDelay: newAutoplayDelay,
      autoplayDirection: newAutoplayDirection,
      autoplayLoop: newAutoplayLoop,
      autoplay: newAutoplay,
      showPagination: newShowPagination,
      vertical: newVertical,
    } = nextProps;
    let shouldUpdate =
      nextPaginationIndex !== paginationIndex ||
      newRenderItem !== renderItem ||
      renderAll !== newRenderAll ||
      autoplayDelay !== newAutoplayDelay ||
      autoplayDirection !== newAutoplayDirection ||
      autoplayLoop !== newAutoplayLoop ||
      autoplay !== newAutoplay ||
      showPagination !== newShowPagination ||
      vertical !== newVertical;
    if (children) {
      shouldUpdate = shouldUpdate || children.length !== newChildren.length;
    }
    if (data) {
      shouldUpdate = shouldUpdate || data.length !== newData.length;
    }
    return shouldUpdate;
  }

  componentWillUnmount() {
    if (this.autoplayTimer) {
      clearTimeout(this.autoplayTimer);
    }
  }

  setup = props => {
    const {
      children,
      data,
      renderItem,
      renderAll,
      paginationActiveColor,
      paginationDefaultColor,
    } = props;
    if (children) {
      this._data = children;
      this._renderItem = this.renderChildren;
    } else if (data) {
      this._data = data;
      this._renderItem = renderItem;
    }
    // Items to render in the initial batch.
    this._initialNumToRender = renderAll ? this._data.length : 1;

    this.pagination = {
      default: {
        backgroundColor: paginationDefaultColor || colors.gray,
      },
      active: {
        backgroundColor: paginationActiveColor || colors.white,
      },
    };
  };

  _autoplay = index => {
    const { autoplayDelay, autoplayLoop } = this.props;
    if (this.autoplayTimer) {
      clearTimeout(this.autoplayTimer);
    }
    const isEnd = index === this._data.length - 1;

    if (autoplayLoop || !isEnd) {
      this.autoplayTimer = setTimeout(() => {
        const nextIndex = (index + 1) % this._data.length;
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
      this.flatListRef.scrollToIndex(params);
      return { paginationIndex: index };
    });
  };

  _onMomentumScrollEnd = e => {
    const { autoplay, vertical, onMomentumScrollEnd } = this.props;
    const { contentOffset, layoutMeasurement } = e.nativeEvent;
    let index;
    if (vertical) {
      index = Math.floor(contentOffset.y / layoutMeasurement.height);
    } else {
      // Divide the horizontal offset by the width of the view to see which page is visible
      index = Math.floor(contentOffset.x / layoutMeasurement.width);
    }

    if (autoplay) {
      this._autoplay(index);
    }
    this.setState({ paginationIndex: index });

    if (onMomentumScrollEnd) {
      onMomentumScrollEnd();
    }
  };

  _onScrollToIndexFailed = info => {
    setTimeout(() => this._scrollToIndex(info.index, false));
  };

  _keyExtractor = (item, index) => index;

  renderChildren = ({ item }) => item;

  renderPagination = () => (
    <View style={styles.paginationContainer}>
      {this._data.map((_, index) => (
        <TouchableOpacity
          style={[
            styles.pagination,
            this.state.paginationIndex === index
              ? this.pagination.active
              : this.pagination.default,
          ]}
          key={index}
          onPress={() => this._scrollToIndex(index, true)}
        />
      ))}
    </View>
  );

  render() {
    const { vertical, showPagination, children, ...props } = this.props;
    return (
      <View>
        <FlatList
          ref={component => {
            this.flatListRef = component;
          }}
          keyExtractor={this._keyExtractor}
          horizontal={!vertical}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          pagingEnabled
          onMomentumScrollEnd={this._onMomentumScrollEnd}
          onScrollToIndexFailed={this._onScrollToIndexFailed}
          {...props}
          data={this._data}
          renderItem={this._renderItem}
          // inverted
          initialNumToRender={this._initialNumToRender}
          // onViewableItemsChanged={(data, index, x) => {
          // getItemLayout={(data, index, x) => {
          // initialScrollIndex={this.state.index}
          // ListFooterComponent=
          // ListEmptyComponent loading...
        />
        {showPagination && this.renderPagination()}
      </View>
    );
  }
}
