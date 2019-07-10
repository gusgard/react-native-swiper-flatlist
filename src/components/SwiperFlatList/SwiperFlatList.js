import React from 'react';
import PropTypes from 'prop-types';
// import { FlatList, Platform } from 'react-native';
import { FlatList } from 'react-native';

import Pagination from '../Pagination';

const MILLISECONDS = 1000;
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
  autoplayDelay,
  autoplay,
  autoplayLoop,
  onMomentumScrollEnd,
  autoplayInvertDirection,
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
  const [paginationIndex, setPaginationIndex] = React.useState(index);
  const flatListElement = React.useRef(null);

  const _scrollToIndex = (_index, _animated = true) => {
    //   const { autoplay } = this.props;
    //   if (autoplay && Platform.OS === 'android') {
    //     this._autoplay(index);
    //   }
    const params = { animated: _animated, index: _index };
    setPaginationIndex(() => {
      // console.log('flatListElement', flatListElement, _index);
      if (flatListElement && flatListElement.current) {
        flatListElement.current.scrollToIndex(params);
      }
      return _index;
    });
  };

  React.useEffect(() => {
    console.log('change index', index);
    if (index !== 0) {
      // Update the index that comes from "<SwiperFlatList index={2} />"
      setTimeout(() => {
        _scrollToIndex(index, false);
      }, 300);
    }
  }, [index]);

  React.useEffect(() => {
    const isNotTheLastItem = autoplayInvertDirection
      ? paginationIndex !== _data.length - 1
      : paginationIndex !== 0;
    const shouldContinuoWithAutoplay = autoplay && isNotTheLastItem;
    let autoplayTimer;
    if (shouldContinuoWithAutoplay || autoplayLoop) {
      autoplayTimer = setTimeout(() => {
        const nextIncrement = autoplayInvertDirection ? -1 : +1;

        let nextIndex = (paginationIndex + nextIncrement) % _data.length;
        if (autoplayInvertDirection && nextIndex < 0) {
          nextIndex = _data.length - 1;
        }

        // When reach the end disable animated
        _scrollToIndex(nextIndex, isNotTheLastItem);
      }, autoplayDelay * MILLISECONDS);
    }
    // https://upmostly.com/tutorials/settimeout-in-react-components-using-hooks
    return () => clearTimeout(autoplayTimer);
  }, [paginationIndex]);
  // const _autoplay = _index => {
  //   if (isEnd) {
  //     // When scroll to the end and animated is false need to restart the autoplay
  //     setTimeout(() => {
  //       this.autoplayTimer = setTimeout(() => _scrollToIndex(1, true), autoplayDelay * 1000);
  //     }, autoplayDelay * 1000);
  //   }
  // };
  const _onMomentumScrollEnd = e => {
    const { contentOffset, layoutMeasurement } = e.nativeEvent;
    let _index;
    if (vertical) {
      _index = Math.round(contentOffset.y / layoutMeasurement.height);
    } else {
      // Divide the horizontal offset by the width of the view to see which page is visible
      _index = Math.round(contentOffset.x / layoutMeasurement.width);
    }

    setPaginationIndex(_index);

    if (onMomentumScrollEnd) {
      onMomentumScrollEnd({ index: _index }, e);
    }
  };

  const flatListProps = {
    ref: flatListElement,
    keyExtractor: (_item, _index) => _index.toString(),
    horizontal: !vertical,
    showsHorizontalScrollIndicator: false,
    showsVerticalScrollIndicator: false,
    pagingEnabled: true,
    ...props,
    onMomentumScrollEnd: _onMomentumScrollEnd,
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

  // console.log(paginationIndex);

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
    <React.Fragment>
      <FlatList {...flatListProps} />
      {showPagination && <PaginationComponent {...paginationProps} />}
    </React.Fragment>
  );
};

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
  autoplayInvertDirection: PropTypes.bool,
  autoplayLoop: PropTypes.bool,
};

SwiperFlatList.defaultProps = {
  index: 0,
  data: [],
  autoplayDelay: 3,
  autoplayInvertDirection: false,
  autoplayLoop: false,
  autoplay: false,
  showPagination: false,
  vertical: false,
  renderAll: false,
  PaginationComponent: Pagination,
};

export default SwiperFlatList;
