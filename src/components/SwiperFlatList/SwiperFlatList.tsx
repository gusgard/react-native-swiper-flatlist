import React from 'react';
import { FlatList, ViewabilityConfig, FlatListProps } from 'react-native';

import { Pagination, PaginationProps } from '../Pagination/Pagination';

const MILLISECONDS = 1000;
const FIRST_INDEX = 0;
const ITEM_VISIBLE_PERCENT_THRESHOLD = 60;

type SwiperFlatListProps<T> = {
  children?: React.ReactNode | React.ReactNode[];
  data?: T[];
  vertical?: boolean;
  index?: number;
  renderAll?: boolean;
  renderItem?: FlatListProps<T>['renderItem'];
  onChangeIndex?: (item: { index: number; prevIndex: number }) => void;

  // Pagination
  showPagination?: boolean;
  PaginationComponent?: any; //react node
  paginationActiveColor?: PaginationProps['paginationActiveColor'];
  paginationDefaultColor?: PaginationProps['paginationDefaultColor'];
  paginationStyle?: PaginationProps['paginationStyle'];
  paginationStyleItem?: PaginationProps['paginationStyleItem'];
  paginationStyleItemActive?: PaginationProps['paginationStyleItemActive'];
  paginationStyleItemInactive?: PaginationProps['paginationStyleItemInactive'];
  onPaginationSelectedIndex?: PaginationProps['onPaginationSelectedIndex'];

  // Autoplay
  autoplayDelay?: number;
  autoplay?: boolean;
  autoplayInvertDirection?: boolean;
  autoplayLoop?: boolean;
  autoplayLoopKeepAnimation?: boolean;

  // Optionals
  // onMomentumScrollEnd: ScrollViewProps['onMomentumScrollEnd'];
  onMomentumScrollEnd?: (item: { index: number }, event: any) => void;
  onViewableItemsChanged?: FlatListProps<unknown>['onViewableItemsChanged'];
  viewabilityConfig?: ViewabilityConfig;
  disableGesture?: boolean;
  e2eId?: string;
};

// Only is allowed children or data not both
// children(props, propName) {
//   const { data } = props;
//   if (!props[propName] && !data) {
//     return new Error('Invalid props, `data` or `children` is required');
//   }
//   if (data && data.length !== 0 && !props.renderItem) {
//     return new Error('Invalid props, `renderItem` is required');
//   }
//   return undefined;
// },

type RefProps = any;
type ScrollToIndex = { index: number; animated?: boolean };

// const SwiperFlatList = React.forwardRef<RefProps, SwiperFlatListProps<SwiperType>>(
const SwiperFlatList = React.forwardRef(
  <T1 extends unknown>(
    {
      vertical = false,
      children,
      data = [],
      renderItem,
      renderAll = false,
      index = FIRST_INDEX,
      // Pagination
      showPagination = false,
      PaginationComponent = Pagination,
      paginationActiveColor,
      paginationDefaultColor,
      paginationStyle,
      paginationStyleItem,
      paginationStyleItemActive,
      paginationStyleItemInactive,
      onPaginationSelectedIndex,
      // Autoplay
      autoplayDelay = 3,
      autoplay = false,
      autoplayLoop = false,
      autoplayLoopKeepAnimation = false,
      autoplayInvertDirection = false,
      // Functions
      onChangeIndex,
      onMomentumScrollEnd,
      onViewableItemsChanged,
      viewabilityConfig = {},
      disableGesture = false,
      e2eId,
      ...props
    }: SwiperFlatListProps<T1>,
    ref: RefProps,
  ) => {
    let _data: unknown[] = [];
    let _renderItem: FlatListProps<any>['renderItem'];

    if (children) {
      // github.com/gusgard/react-native-swiper-flatlist/issues/40
      _data = Array.isArray(children) ? children : [children];
      _renderItem = ({ item }) => item;
    } else if (data) {
      _data = data;
      _renderItem = renderItem;
    } else {
      console.error('Invalid props, `data` or `children` is required');
    }
    const size = _data.length;
    // Items to render in the initial batch.
    const _initialNumToRender = renderAll ? size : 1;
    const [paginationIndex, setPaginationIndex] = React.useState(index);
    const [prevIndex, setPrevIndex] = React.useState(index);
    const [paginationIndexes, setPaginationIndexes] = React.useState({ index, prevIndex: index });
    const [ignoreOnMomentumScrollEnd, setIgnoreOnMomentumScrollEnd] = React.useState(false);
    const flatListElement = React.useRef<FlatList<unknown>>(null);
    const [scrollEnabled, setScrollEnabled] = React.useState(!disableGesture);

    const _onChangeIndex = React.useCallback(
      ({ index: _index, prevIndex: _prevIndex }) => {
        onChangeIndex?.({ index: _index, prevIndex: _prevIndex });
      },
      [onChangeIndex],
    );

    const _scrollToIndex = (params: ScrollToIndex) => {
      const { index: indexToScroll, animated = true } = params;
      const newParams = { animated, index: indexToScroll };

      setPaginationIndexes((prevState) => {
        setIgnoreOnMomentumScrollEnd(true);
        return { index: indexToScroll, prevIndex: prevState.index };
      });
      // When execute "scrollToIndex", we ignore the method "onMomentumScrollEnd"
      // because it not working on Android
      // https://github.com/facebook/react-native/issues/21718
      flatListElement?.current?.scrollToIndex(newParams);
    };

    React.useEffect(() => {
      const next = {
        index: paginationIndexes.index,
        prevIndex: paginationIndexes.prevIndex,
      };
      if (paginationIndex !== next.index) {
        setPaginationIndex(next.index);
      }
      if (prevIndex !== next.prevIndex) {
        setPrevIndex(next.prevIndex);
      }
      _onChangeIndex({ index: next.index, prevIndex: next.prevIndex });
      // only consider "paginationIndexes"
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paginationIndexes]);

    React.useEffect(() => {
      _onChangeIndex({ index: paginationIndex, prevIndex: prevIndex });
    }, [paginationIndex, prevIndex, _onChangeIndex]);

    React.useImperativeHandle(ref, () => ({
      scrollToIndex: (item: ScrollToIndex) => {
        setScrollEnabled(true);
        _scrollToIndex(item);
        setScrollEnabled(!disableGesture);
      },
      getCurrentIndex: () => paginationIndex,
      getPrevIndex: () => prevIndex,
      goToLastIndex: () => {
        setScrollEnabled(true);
        _scrollToIndex({ index: size - 1 });
        setScrollEnabled(!disableGesture);
      },
      goToFirstIndex: () => {
        setScrollEnabled(true);
        _scrollToIndex({ index: FIRST_INDEX });
        setScrollEnabled(!disableGesture);
      },
    }));

    React.useEffect(() => {
      const isLastIndexEnd = autoplayInvertDirection
        ? paginationIndex === FIRST_INDEX
        : paginationIndex === _data.length - 1;
      const shouldContinuoWithAutoplay = autoplay && !isLastIndexEnd;
      let autoplayTimer: ReturnType<typeof setTimeout>;
      if (shouldContinuoWithAutoplay || autoplayLoop) {
        autoplayTimer = setTimeout(() => {
          if (_data.length < 1) {
            // avoid nextIndex being set to NaN
            return;
          }

          const nextIncrement = autoplayInvertDirection ? -1 : +1;

          let nextIndex = (paginationIndex + nextIncrement) % _data.length;
          if (autoplayInvertDirection && nextIndex < FIRST_INDEX) {
            nextIndex = _data.length - 1;
          }

          // Disable end loop animation unless `autoplayLoopKeepAnimation` prop configured
          const animate = !isLastIndexEnd || autoplayLoopKeepAnimation;

          _scrollToIndex({ index: nextIndex, animated: animate });
        }, autoplayDelay * MILLISECONDS);
      }
      // https://upmostly.com/tutorials/settimeout-in-react-components-using-hooks
      return () => clearTimeout(autoplayTimer);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paginationIndex]);

    const _onMomentumScrollEnd: FlatListProps<unknown>['onMomentumScrollEnd'] = (event) => {
      // NOTE: Method not executed when call "flatListElement?.current?.scrollToIndex"
      if (ignoreOnMomentumScrollEnd) {
        setIgnoreOnMomentumScrollEnd(false);
        return;
      }

      onMomentumScrollEnd?.({ index: paginationIndex }, event);

      //_onChangeIndex({ index: paginationIndex, prevIndex });
    };

    const _onViewableItemsChanged = React.useMemo<FlatListProps<unknown>['onViewableItemsChanged']>(
      () => (params) => {
        const { changed } = params;
        const newItem = changed?.[FIRST_INDEX];
        if (newItem !== undefined) {
          const nextIndex = newItem.index as number;
          if (newItem.isViewable) {
            setPaginationIndex(nextIndex);
          } else {
            setPrevIndex(nextIndex);
          }
        }
        onViewableItemsChanged?.(params);
      },
      [onViewableItemsChanged],
    );

    const keyExtractor: FlatListProps<any>['keyExtractor'] = (_item, _index) => _index.toString();
    const onScrollToIndexFailed: FlatListProps<any>['onScrollToIndexFailed'] = (info) =>
      setTimeout(() => _scrollToIndex({ index: info.index, animated: false }));

    const flatListProps = {
      scrollEnabled,
      ref: flatListElement,
      keyExtractor,
      horizontal: !vertical,
      showsHorizontalScrollIndicator: false,
      showsVerticalScrollIndicator: false,
      pagingEnabled: true,
      ...props,
      onMomentumScrollEnd: _onMomentumScrollEnd,
      onScrollToIndexFailed: onScrollToIndexFailed,
      data: _data,
      renderItem: _renderItem,
      initialNumToRender: _initialNumToRender,
      initialScrollIndex: index, // used with onScrollToIndexFailed
      viewabilityConfig: {
        // https://facebook.github.io/react-native/docs/flatlist#minimumviewtime
        minimumViewTime: 200,
        itemVisiblePercentThreshold: ITEM_VISIBLE_PERCENT_THRESHOLD,
        ...viewabilityConfig,
      },
      onViewableItemsChanged: _onViewableItemsChanged,
      // debug: true, // for debug
      testID: e2eId,
    };

    const paginationProps = {
      size,
      paginationIndex: paginationIndex,
      scrollToIndex: _scrollToIndex,
      paginationActiveColor,
      paginationDefaultColor,
      paginationStyle,
      paginationStyleItem,
      paginationStyleItemActive,
      paginationStyleItemInactive,
      onPaginationSelectedIndex,
      e2eId,
    };

    return (
      <React.Fragment>
        <FlatList {...flatListProps} />
        {showPagination && <PaginationComponent {...paginationProps} />}
      </React.Fragment>
    );
  },
);

export default SwiperFlatList;
