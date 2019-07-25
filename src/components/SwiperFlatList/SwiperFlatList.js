import React from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';

import Pagination from '../Pagination';

const MILLISECONDS = 1000;
const FIRST_INDEX = 0;
const ITEM_VISIBLE_PERCENT_THRESHOLD = 60;

const SwiperFlatList = React.forwardRef(
  (
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
    const [prevIndex, setPrevIndex] = React.useState(index);
    const [tmpPrevIndex, setTmpPrevIndex] = React.useState(index);
    const flatListElement = React.useRef(null);

    const _onChangeIndex = ({ index: _index, prevIndex: _prevIndex }) => {
      onChangeIndex?.({ index: _index, prevIndex: _prevIndex });
    };

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

      setTmpPrevIndex(paginationIndex); //TODO:
      flatListElement?.current?.scrollToIndex(newParams);
    };

    React.useImperativeHandle(ref, () => ({
      scrollToIndex: (...args) => {
        _scrollToIndex(...args);
      },
      getCurrentIndex: () => {
        return paginationIndex;
      },
      getPrevIndex: () => {
        console.log('not working correctly!');
        console.log(this);
        console.log(ref);

        return prevIndex;
      },
      // add to readme
      goToLastIndex: () => {
        _scrollToIndex({ index: size - 1 });
      },
      // add to readme
      goToFirstIndex: () => {
        _scrollToIndex({ index: FIRST_INDEX });
      },
    }));

    React.useEffect(() => {
      const isLastIndexEnd = autoplayInvertDirection
        ? paginationIndex === FIRST_INDEX
        : paginationIndex === _data.length - 1;
      const shouldContinuoWithAutoplay = autoplay && !isLastIndexEnd;
      let autoplayTimer;
      if (shouldContinuoWithAutoplay || autoplayLoop) {
        autoplayTimer = setTimeout(() => {
          const nextIncrement = autoplayInvertDirection ? -1 : +1;

          let nextIndex = (paginationIndex + nextIncrement) % _data.length;
          if (autoplayInvertDirection && nextIndex < FIRST_INDEX) {
            nextIndex = _data.length - 1;
          }

          // When reach the end disable animated
          _scrollToIndex({ index: nextIndex, animated: !isLastIndexEnd });
        }, autoplayDelay * MILLISECONDS);
      }
      // https://upmostly.com/tutorials/settimeout-in-react-components-using-hooks
      return () => clearTimeout(autoplayTimer);
    }, [paginationIndex]);
    const _onMomentumScrollEnd = e => {
      // -------
      const { contentOffset, layoutMeasurement } = e.nativeEvent;
      let _index;
      if (vertical) {
        _index = Math.round(contentOffset.y / layoutMeasurement.height);
      } else {
        // Divide the horizontal offset by the width of the view to see which page is visible
        _index = Math.round(contentOffset.x / layoutMeasurement.width);
      }
      // -------
      if (paginationIndex !== _index) {
        // TODO:
        console.warn('REMOVE _INDEX if this console is never show ANDROID', {
          paginationIndex,
          _index,
          tmpPrevIndex,
          prevIndex,
        });
        // _index = paginationIndex;
      }
      let _prevIndex = prevIndex;
      if (tmpPrevIndex !== undefined) {
        _prevIndex = tmpPrevIndex;
      }
      setTmpPrevIndex(undefined); //TODO:

      console.log({ _index, _prevIndex, prevIndex });

      onMomentumScrollEnd?.({ index: _index }, e);
      _onChangeIndex({ index: _index, prevIndex: _prevIndex }); // consider prev index
    };

    const _onViewableItemsChanged = React.useMemo(
      () => ({ changed }) => {
        const newItem = changed?.[FIRST_INDEX];
        if (newItem !== undefined) {
          const nextIndex = newItem.index;
          if (newItem.isViewable) {
            setPaginationIndex(nextIndex);
          } else {
            setPrevIndex(nextIndex);
          }
        }
      },
      [],
    );

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
      viewabilityConfig: {
        itemVisiblePercentThreshold: ITEM_VISIBLE_PERCENT_THRESHOLD,
      },
      onViewableItemsChanged: _onViewableItemsChanged,
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
  },
);

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
  index: FIRST_INDEX,
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

export default SwiperFlatList;
