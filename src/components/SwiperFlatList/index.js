import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';

import Pagination from '../Pagination';

export default class SwiperFlatList extends PureComponent {
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

    PaginationComponent: PropTypes.func,

    // Only is allowed children or data not both
    children(props, propName) {
      const { data } = props;
      if (!props[propName] && !data) {
        return new Error('Invalid props, `data` or `children` is required');
      }
      if (data && data.length !== 0 && !props.renderItem) {
        return new Error('Invalid props, `renderItem` is required');
      }
      return undefined;
    }
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
    PaginationComponent: Pagination
  };

  componentWillMount() {
    this.setup(this.props);
    this.setState({ paginationIndex: this.props.index });
  }
  componentDidMount() {
    const { autoplay, index } = this.props;
    if (autoplay) {
      this._autoplay(index);
    }

    if (index !== 0) {
      this._scrollToIndex(index, false);
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

  setup = props => {
    const { children, data, renderItem, renderAll } = props;
    if (children) {
      this._data = children;
      this._renderItem = this.renderChildren;
    } else if (data) {
      this._data = data;
      this._renderItem = renderItem;
    }
    // Items to render in the initial batch.
    this._initialNumToRender = renderAll ? this._data.length : 1;
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
          autoplayDelay * 1000
        );
      }, autoplayDelay * 1000);
    }
  };

  _scrollToIndex = (index, animated = true) => {
    const params = { animated, index };
    this.setState(() => {
      if (this.flatListRef) {
        this.flatListRef.scrollToIndex(params);
      }
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
      onMomentumScrollEnd({ index }, e);
    }
  };

  _onScrollToIndexFailed = info => {
    setTimeout(() => this._scrollToIndex(info.index, false));
  };

  _keyExtractor = (item, index) => index.toString();

  renderChildren = ({ item }) => item;

  render() {
    const {
      vertical,
      showPagination,
      children,
      PaginationComponent,
      paginationActiveColor,
      paginationDefaultColor,
      ...props
    } = this.props;

    const flatListProps = {
      ref: component => {
        this.flatListRef = component;
      },
      keyExtractor: this._keyExtractor,
      horizontal: !vertical,
      showsHorizontalScrollIndicator: false,
      showsVerticalScrollIndicator: false,
      pagingEnabled: true,
      ...props,
      onMomentumScrollEnd: this._onMomentumScrollEnd,
      onScrollToIndexFailed: this._onScrollToIndexFailed,
      data: this._data,
      renderItem: this._renderItem,
      initialNumToRender: this._initialNumToRender
      // inverted
      // onViewableItemsChanged={(data, index, x) => {
      // getItemLayout={(data, index, x) => {
      // initialScrollIndex={this.state.index}
      // ListFooterComponent=
      // ListEmptyComponent loading...
    };

    const paginationProps = {
      data: this._data,
      paginationIndex: this.state.paginationIndex,
      scrollToIndex: this._scrollToIndex,
      paginationActiveColor,
      paginationDefaultColor
    };

    return (
      <View>
        <FlatList {...flatListProps} />
        {showPagination && <PaginationComponent {...paginationProps} />}
      </View>
    );
  }
}
