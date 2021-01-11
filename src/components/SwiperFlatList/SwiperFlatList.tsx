import React from 'react';
import { FlatList, FlatListProps, Platform, Text } from 'react-native';

import { Pagination } from '../Pagination/Pagination';
import { SwiperFlatListProps } from './SwiperFlatListProps';

const MILLISECONDS = 1000;
const FIRST_INDEX = 0;
const ITEM_VISIBLE_PERCENT_THRESHOLD = 60;

// TODO: figure out how to use forwardRef with generics
type RefProps = any;
type T1 = any;
type ScrollToIndex = { index: number; animated?: boolean };

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
    // https://twitter.com/dan_abramov/status/1083330668522864640?lang=en
    const [paginationIndexes, setPaginationIndexes] = React.useState({ index, prevIndex: index });
    const [ignoreOnMomentumScrollEnd, setIgnoreOnMomentumScrollEnd] = React.useState(false);
    const flatListElement = React.useRef<FlatList<unknown>>(null);
    const [scrollEnabled, setScrollEnabled] = React.useState(!disableGesture);

    const _onChangeIndex = React.useCallback(
      ({ index: _index, prevIndex: _prevIndex }) => {
        onChangeIndex?.({ index: _index, prevIndex: _prevIndex });
      },
      [onChangeIndex],
      // eslint-disable-next-line react-hooks/exhaustive-deps
      // [],
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
      // console.log('-----');

      _onChangeIndex({ index: next.index, prevIndex: next.prevIndex });
      // only consider "paginationIndexes"
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paginationIndexes.index, paginationIndexes.prevIndex]);

    React.useEffect(() => {
      // console.log('holas');

      _onChangeIndex({ index: paginationIndex, prevIndex: prevIndex });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [paginationIndex, prevIndex]);
    // }, []);
    // }, [paginationIndex]);

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
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
    );

    const keyExtractor: FlatListProps<unknown>['keyExtractor'] = (_item, _index) =>
      _index.toString();
    const onScrollToIndexFailed: FlatListProps<unknown>['onScrollToIndexFailed'] = (info) =>
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
      testID: e2eID,
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
      e2eID,
    };

    if (Platform.OS === 'web') {
      console.error(
        'react-native-web is not supported, due to the lack of support of some `props` used in this library',
      );
      console.error(
        '[Expo example](https://snack.expo.io/@gusgard/react-native-web-example-with-swiper',
      );
      return <Text>It does not work with react-native-web</Text>;
    }

    return (
      <React.Fragment>
        <FlatList {...flatListProps} />
        {showPagination && <PaginationComponent {...paginationProps} />}
      </React.Fragment>
    );
  },
);
