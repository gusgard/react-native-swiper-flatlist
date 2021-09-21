import React from 'react';
import { FlatList, FlatListProps, Platform, Dimensions } from 'react-native';

import { Pagination } from '../Pagination/Pagination';
import { SwiperFlatListProps, SwiperFlatListRefProps } from './SwiperFlatListProps';

const MILLISECONDS = 1000;
const FIRST_INDEX = 0;
const ITEM_VISIBLE_PERCENT_THRESHOLD = 60;

// TODO: figure out how to use forwardRef with generics
type T1 = any;
type ScrollToIndex = { index: number; animated?: boolean };
type ScrollToIndexInternal = { useOnChangeIndex: boolean };

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

// const SwiperFlatList = React.forwardRef<RefProps, SwiperFlatListProps<SwiperType>>(
export const SwiperFlatList = React.forwardRef(
  // <T1 extends any>(
  (
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
      e2eID,
      ...props
    }: SwiperFlatListProps<T1>,
    ref: React.Ref<SwiperFlatListRefProps>,
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
    const [currentIndexes, setCurrentIndexes] = React.useState({ index, prevIndex: index });
    const [ignoreOnMomentumScrollEnd, setIgnoreOnMomentumScrollEnd] = React.useState(false);
    const flatListElement = React.useRef<FlatList<unknown>>(null);
    const [scrollEnabled, setScrollEnabled] = React.useState(!disableGesture);

    const _onChangeIndex = React.useCallback(
      ({ index: _index, prevIndex: _prevIndex }) => {
        if (_index !== _prevIndex) {
          onChangeIndex?.({ index: _index, prevIndex: _prevIndex });
        }
      },
      [onChangeIndex],
    );

    const _scrollToIndex = (params: ScrollToIndex, extra: ScrollToIndexInternal) => {
      const { index: indexToScroll, animated = true } = params;
      const newParams = { animated, index: indexToScroll };

      setIgnoreOnMomentumScrollEnd(true);

      const next = {
        index: indexToScroll,
        prevIndex: currentIndexes.index,
      };
      if (currentIndexes.index !== next.index && currentIndexes.prevIndex !== next.prevIndex) {
        setCurrentIndexes({ index: next.index, prevIndex: next.prevIndex });
      } else if (currentIndexes.index !== next.index) {
        setCurrentIndexes((prevState) => ({ ...prevState, index: next.index }));
      } else if (currentIndexes.prevIndex !== next.prevIndex) {
        setCurrentIndexes((prevState) => ({ ...prevState, prevIndex: next.prevIndex }));
      }

      if (extra.useOnChangeIndex) {
        _onChangeIndex({ index: next.index, prevIndex: next.prevIndex });
      }

      // When execute "scrollToIndex", we ignore the method "onMomentumScrollEnd"
      // because it not working on Android
      // https://github.com/facebook/react-native/issues/21718
      flatListElement?.current?.scrollToIndex(newParams);
    };

    // change the index when the user swipe the items
    React.useEffect(() => {
      _onChangeIndex({ index: currentIndexes.index, prevIndex: currentIndexes.prevIndex });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndexes.index]);

    React.useImperativeHandle(ref, () => ({
      scrollToIndex: (item: ScrollToIndex) => {
        setScrollEnabled(true);
        _scrollToIndex(item, { useOnChangeIndex: true });
        setScrollEnabled(!disableGesture);
      },
      getCurrentIndex: () => currentIndexes.index,
      getPrevIndex: () => currentIndexes.prevIndex,
      goToLastIndex: () => {
        setScrollEnabled(true);
        _scrollToIndex({ index: size - 1 }, { useOnChangeIndex: false });
        setScrollEnabled(!disableGesture);
      },
      goToFirstIndex: () => {
        setScrollEnabled(true);
        _scrollToIndex({ index: FIRST_INDEX }, { useOnChangeIndex: false });
        setScrollEnabled(!disableGesture);
      },
    }));

    React.useEffect(() => {
      const isLastIndexEnd = autoplayInvertDirection
        ? currentIndexes.index === FIRST_INDEX
        : currentIndexes.index === _data.length - 1;
      const shouldContinuoWithAutoplay = autoplay && !isLastIndexEnd;
      let autoplayTimer: ReturnType<typeof setTimeout>;
      if (shouldContinuoWithAutoplay || autoplayLoop) {
        autoplayTimer = setTimeout(() => {
          if (_data.length < 1) {
            // avoid nextIndex being set to NaN
            return;
          }

          const nextIncrement = autoplayInvertDirection ? -1 : +1;

          let nextIndex = (currentIndexes.index + nextIncrement) % _data.length;
          if (autoplayInvertDirection && nextIndex < FIRST_INDEX) {
            nextIndex = _data.length - 1;
          }

          // Disable end loop animation unless `autoplayLoopKeepAnimation` prop configured
          const animate = !isLastIndexEnd || autoplayLoopKeepAnimation;

          _scrollToIndex({ index: nextIndex, animated: animate }, { useOnChangeIndex: true });
        }, autoplayDelay * MILLISECONDS);
      }
      // https://upmostly.com/tutorials/settimeout-in-react-components-using-hooks
      return () => clearTimeout(autoplayTimer);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndexes.index, _data.length]);

    const _onMomentumScrollEnd: FlatListProps<unknown>['onMomentumScrollEnd'] = (event) => {
      // NOTE: Method not executed when call "flatListElement?.current?.scrollToIndex"
      if (ignoreOnMomentumScrollEnd) {
        setIgnoreOnMomentumScrollEnd(false);
        return;
      }

      onMomentumScrollEnd?.({ index: currentIndexes.index }, event);
    };

    const _onViewableItemsChanged = React.useMemo<FlatListProps<unknown>['onViewableItemsChanged']>(
      () => (params) => {
        const { changed } = params;
        const newItem = changed?.[FIRST_INDEX];
        if (newItem !== undefined) {
          const nextIndex = newItem.index as number;
          if (newItem.isViewable) {
            setCurrentIndexes((prevState) => ({ ...prevState, index: nextIndex }));
          } else {
            setCurrentIndexes((prevState) => ({ ...prevState, prevIndex: nextIndex }));
          }
        }
        onViewableItemsChanged?.(params);
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
    );

    const keyExtractor: FlatListProps<unknown>['keyExtractor'] = (_item, _index) =>
      _index.toString();
    const onScrollToIndexFailed: FlatListProps<unknown>['onScrollToIndexFailed'] = (info) =>
      setTimeout(() =>
        _scrollToIndex({ index: info.index, animated: false }, { useOnChangeIndex: true }),
      );

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
      testID: e2eID,
    };

    if (Platform.OS === 'web') {
      if (props.getItemLayout === undefined) {
        // NOTE: should we pass height/width for getItemLayout?
        const ITEM_DIMENSION = vertical ? HEIGHT : WIDTH;
        flatListProps.getItemLayout = (__data, ItemIndex: number) => {
          return {
            length: ITEM_DIMENSION,
            offset: ITEM_DIMENSION * ItemIndex,
            index: ItemIndex,
          };
        };
      }

      (flatListProps as any).dataSet = { 'paging-enabled-fix': true };
    }

    const scrollToIndexForPagination = (params: ScrollToIndex) => {
      _scrollToIndex(params, { useOnChangeIndex: false });
    };

    const paginationProps = {
      size,
      paginationIndex: currentIndexes.index,
      scrollToIndex: scrollToIndexForPagination,
      paginationActiveColor,
      paginationDefaultColor,
      paginationStyle,
      paginationStyleItem,
      paginationStyleItemActive,
      paginationStyleItemInactive,
      onPaginationSelectedIndex,
      e2eID,
    };

    return (
      <React.Fragment>
        <FlatList {...flatListProps} />
        {showPagination && <PaginationComponent {...paginationProps} />}
      </React.Fragment>
    );
  },
);

// https://gist.github.com/Venryx/7cff24b17867da305fff12c6f8ef6f96
type Handle<T> = T extends React.ForwardRefExoticComponent<React.RefAttributes<infer T2>>
  ? T2
  : never;
export type SwiperFlatList = Handle<typeof SwiperFlatList>;
