import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, Platform } from 'react-native';

import Pagination from '../Pagination';

const SwiperFlatList = ({
  vertical,
  showPagination,
  children,
  PaginationComponent,
  paginationActiveColor,
  paginationDefaultColor,
  paginationStyle,
  paginationStyleItem,
  data,
  renderItem,
  renderAll,
  index,
  ...props
}) => {
  let _data;
  let _renderItem;
  if (children) {
    _data = children;
    _renderItem = ({ item }) => item;
  } else if (data) {
    _data = data;
    _renderItem = renderItem;
  }
  // Items to render in the initial batch.
  const _initialNumToRender = renderAll ? _data.length : 1;

  const flatListElement = React.useRef(null);
  const flatListProps = {
    ref: flatListElement,
    keyExtractor: (_item, _index) => _index.toString(),
    horizontal: !vertical,
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    pagingEnabled: true,
    ...props,
    // onMomentumScrollEnd: this._onMomentumScrollEnd,  ...
    // onScrollToIndexFailed: this._onScrollToIndexFailed, ...
    data: _data,
    renderItem: _renderItem,
    initialNumToRender: _initialNumToRender,
    // ----
    // inverted
    // onViewableItemsChanged={(data, index, x) => {
    // getItemLayout={(data, index, x) => {
    // initialScrollIndex={this.state.index}
    // ListFooterComponent=
    // ListEmptyComponent loading...
    // ----
  };
  const [paginationIndex, setPaginationIndex] = React.useState(index);

  // console.log(paginationIndex);

  const _scrollToIndex = (_index, _animated = true) => {
    //   const { autoplay } = this.props;
    //   if (autoplay && Platform.OS === 'android') {
    //     this._autoplay(index);
    //   }
    const params = { animated: _animated, index: _index };
    setPaginationIndex(() => {
      // console.log('flatListElement', flatListElement, prevState, _index);
      if (flatListElement && flatListElement.current) {
        flatListElement.current.scrollToIndex(params);
      }
      return _index;
    });
  };

  const paginationProps = {
    size: _data.length,
    paginationIndex: paginationIndex,
    scrollToIndex: _scrollToIndex,
    paginationActiveColor,
    paginationDefaultColor,
    paginationStyle,
    paginationStyleItem,
  };

  return (
    <>
      <FlatList {...flatListProps} />
      {showPagination && <PaginationComponent {...paginationProps} />}
    </>
  );
};

// componentDidMount() {
//   const { autoplay, index } = this.props;
//   if (autoplay) {
//     this._autoplay(index);
//   }

//   if (index !== 0) {
//     this._scrollToIndex(index, false);
//   }
// }

// componentWillUnmount() {
//   if (this.autoplayTimer) {
//     clearTimeout(this.autoplayTimer);
//   }
// }

// _autoplay = index => {
//   const { autoplayDelay, autoplayLoop } = this.props;
//   if (this.autoplayTimer) {
//     clearTimeout(this.autoplayTimer);
//   }
//   const isEnd = index === this._data.length - 1;

//   if (autoplayLoop || !isEnd) {
//     this.autoplayTimer = setTimeout(() => {
//       const nextIndex = (index + 1) % this._data.length;
//       this._scrollToIndex(nextIndex, !isEnd);
//     }, autoplayDelay * 1000);
//   }
//   if (isEnd) {
//     // When scroll to the end and animated is false need to restart the autoplay
//     setTimeout(() => {
//       this.autoplayTimer = setTimeout(() => this._scrollToIndex(1, true), autoplayDelay * 1000);
//     }, autoplayDelay * 1000);
//   }
// };

// _onMomentumScrollEnd = e => {
//   const { autoplay, vertical, onMomentumScrollEnd } = this.props;
//   const { contentOffset, layoutMeasurement } = e.nativeEvent;
//   let index;
//   if (vertical) {
//     index = Math.round(contentOffset.y / layoutMeasurement.height);
//   } else {
//     // Divide the horizontal offset by the width of the view to see which page is visible
//     index = Math.round(contentOffset.x / layoutMeasurement.width);
//   }

//   if (autoplay) {
//     this._autoplay(index);
//   }
//   this.setState({ paginationIndex: index });

//   if (onMomentumScrollEnd) {
//     onMomentumScrollEnd({ index }, e);
//   }
// };

// _onScrollToIndexFailed = info => {
//   setTimeout(() => this._scrollToIndex(info.index, false));
// };

// scrollToIndex = (...args) => this._scrollToIndex(...args);

SwiperFlatList.propTypes = {
  data: PropTypes.array,
  onMomentumScrollEnd: PropTypes.func,
  vertical: PropTypes.bool,
  index: PropTypes.number,
  renderAll: PropTypes.bool,
  renderItem: PropTypes.func,
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
  },

  // Pagination
  showPagination: PropTypes.bool,
  PaginationComponent: PropTypes.func,
  paginationActiveColor: Pagination.propTypes.paginationActiveColor,
  paginationDefaultColor: Pagination.propTypes.paginationDefaultColor,
  paginationStyle: Pagination.propTypes.paginationStyle,
  paginationStyleItem: Pagination.propTypes.paginationStyleItem,

  // Autoplay
  autoplayDelay: PropTypes.number,
  autoplay: PropTypes.bool,
  // autoplayDirection: PropTypes.bool,
  autoplayLoop: PropTypes.bool,
};

SwiperFlatList.defaultProps = {
  index: 0,
  data: [],
  autoplayDelay: 3,
  // autoplayDirection: true,
  autoplayLoop: false,
  autoplay: false,
  showPagination: false,
  vertical: false,
  renderAll: false,
  PaginationComponent: Pagination,
};

export default SwiperFlatList;
