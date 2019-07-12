import React from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';

import Pagination from '../Pagination';

const MILLISECONDS = 1000;
const SwiperFlatList = (
  {
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
    onChangeIndex,
    ...props
  },
  ref,
) => {
  let _data;
  let _renderItem;

  if (children) {
    // github.com/gusgard/react-native-swiper-flatlist/issues/40
    _data = Array.isArray(children) ? children : [children];
    _renderItem = ({ item }) => item;
  } else if (data) {
    _data = data;
    _renderItem = renderItem;
  }
  const size = _data.length;
  // Items to render in the initial batch.
  const _initialNumToRender = renderAll ? size : 1;
  const [paginationIndex, setPaginationIndex] = React.useState(index);
  const flatListElement = React.useRef(null);

  // const _scrollToIndex = ({ index: _index, animated = true }) => {
  const _scrollToIndex = params => {
    //   const { autoplay } = this.props;
    //   if (autoplay && Platform.OS === 'android') {
    //     this._autoplay(index);
    //   }
    if (typeof params !== 'object') {
      console.error(
        'Expected an object for "scrollToIndex", for example: scrollToIndex({ index: 1 })',
      );
      // NOTE: remove in future versions.
      return;
    }

    const { index: indexToScroll, animated = true } = params;
    const newParams = { animated, index: indexToScroll };

    setPaginationIndex(() => {
      flatListElement?.current?.scrollToIndex(newParams);
      onChangeIndex?.(indexToScroll); // consider prev index
      return indexToScroll;
    });
  };

  React.useImperativeHandle(ref, () => ({
    scrollToIndex: (...args) => {
      _scrollToIndex(...args);
    },
    getCurrentIndex: () => {
      return paginationIndex;
    },
    // add to readme
    goToLastIndex: () => {
      _scrollToIndex({ index: size - 1 });
    },
    // add to readme
    goToFirstIndex: () => {
      _scrollToIndex({ index: 0 });
    },
  }));

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
        _scrollToIndex({ index: nextIndex, animated: isNotTheLastItem });
      }, autoplayDelay * MILLISECONDS);
    }
    // https://upmostly.com/tutorials/settimeout-in-react-components-using-hooks
    return () => clearTimeout(autoplayTimer);
  }, [paginationIndex]);
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

    console.log(e);

    onMomentumScrollEnd?.({ index: _index }, e);
    onChangeIndex?.(_index); // consider prev index
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
    onScrollToIndexFailed: info =>
      setTimeout(() => _scrollToIndex({ index: info.index, animated: false })),
    data: _data,
    renderItem: _renderItem,
    initialNumToRender: _initialNumToRender,
    initialScrollIndex: index, // used with onScrollToIndexFailed
  };

  const paginationProps = {
    size,
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
  onChangeIndex: PropTypes.func,

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
  onChangeIndex: undefined,
};

export default React.forwardRef(SwiperFlatList);
