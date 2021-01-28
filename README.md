# :point_up_2: Swiper FlatList component

[![supports iOS](https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff)](https://www.npmjs.com/package/react-native-swiper-flatlist)
[![supports Android](https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff)](https://www.npmjs.com/package/react-native-swiper-flatlist)
[![supports web](https://img.shields.io/badge/web-4630EB.svg?style=flat-square&logo=GOOGLE-CHROME&labelColor=4285F4&logoColor=fff)](https://www.npmjs.com/package/react-native-swiper-flatlist)
[![npm](https://img.shields.io/npm/v/react-native-swiper-flatlist.svg)](https://www.npmjs.com/package/react-native-swiper-flatlist)
[![npm](https://img.shields.io/npm/dm/react-native-swiper-flatlist.svg)](https://www.npmjs.com/package/react-native-swiper-flatlist)
[![Build Status](https://app.bitrise.io/app/dfeb47a453df37dd/status.svg?token=54NHsU_G5kGTSZpdEejqLA&branch=master)](https://app.bitrise.io/app/dfeb47a453df37dd)
![license](https://img.shields.io/npm/l/react-native-swiper-flatlist.svg)

![Demo](https://raw.githubusercontent.com/gusgard/react-native-swiper-flatlist/master/demo.gif)

## Installation

```
yarn add react-native-swiper-flatlist
```

or

```
npm install react-native-swiper-flatlist --save
```

## Notice

Version 2.x was re-implemented using React Hooks so it only works with version 0.59 or above

Version 3.x was re-implemented using Typescript and it works with react-native-web

| react-native-swiper-flatlist | react-native | Detox tests                                                                                                                                                                     |
| ---------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.x                          | <= 0.58      | [![Build Status](https://travis-ci.org/gusgard/react-native-swiper-flatlist.svg?branch=v1)](https://travis-ci.org/github/gusgard/react-native-swiper-flatlist/builds/565267550) |
| 2.x                          | >= 0.59      | [![Build Status](https://travis-ci.org/gusgard/react-native-swiper-flatlist.svg?branch=v1)](https://travis-ci.org/github/gusgard/react-native-swiper-flatlist/builds/749156790) |
| 3.x                          | >= 0.59      | [![Build Status](https://app.bitrise.io/app/dfeb47a453df37dd/status.svg?token=54NHsU_G5kGTSZpdEejqLA&branch=master)](https://app.bitrise.io/app/dfeb47a453df37dd)               |

## Examples

[Expo example with renderItems, children and more](https://snack.expo.io/@gusgard/react-native-swiper-flatlist)

[Expo example with children](https://snack.expo.io/@gusgard/react-native-swiper-flatlist-show-next-screen)

[React Native example with renderItems and custom pagination](./example/src/SwiperWithRenderItems.js)

[React Native example with children](./example/src/SwiperWithChildren.js)

### Code

Using `renderItems` and `data` [![run in expo snack](https://img.shields.io/badge/snack-Try%20now-4630EB.svg?style=flat-square&logo=EXPO&labelColor=000&logoColor=FFF&logoWidth=20)](https://snack.expo.io/@gusgard/react-native-swiper-flatlist-simple-with-renderitems-and-data)

```jsx
import React from 'react';
import { Text, Dimensions, StyleSheet, View } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

const colors = ['tomato', 'thistle', 'skyblue', 'teal'];

const App = () => (
  <View style={styles.container}>
    <SwiperFlatList
      autoplay
      autoplayDelay={2}
      autoplayLoop
      index={2}
      showPagination
      data={colors}
      renderItem={({ item }) => (
        <View style={[styles.child, { backgroundColor: item }]}>
          <Text style={styles.text}>{item}</Text>
        </View>
      )}
    />
  </View>
);

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  child: { width, justifyContent: 'center' },
  text: { fontSize: width * 0.5, textAlign: 'center' },
});

export default App;
```

Using `children` [![run in expo snack](https://img.shields.io/badge/snack-Try%20now-4630EB.svg?style=flat-square&logo=EXPO&labelColor=000&logoColor=FFF&logoWidth=20)](https://snack.expo.io/@gusgard/react-native-swiper-flatlist-simple-with-children)

```jsx
import React from 'react';
import { Text, Dimensions, StyleSheet, View } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';

const App = () => (
  <View style={styles.container}>
    <SwiperFlatList autoplay autoplayDelay={2} autoplayLoop index={2} showPagination>
      <View style={[styles.child, { backgroundColor: 'tomato' }]}>
        <Text style={styles.text}>1</Text>
      </View>
      <View style={[styles.child, { backgroundColor: 'thistle' }]}>
        <Text style={styles.text}>2</Text>
      </View>
      <View style={[styles.child, { backgroundColor: 'skyblue' }]}>
        <Text style={styles.text}>3</Text>
      </View>
      <View style={[styles.child, { backgroundColor: 'teal' }]}>
        <Text style={styles.text}>4</Text>
      </View>
    </SwiperFlatList>
  </View>
);

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  child: { width, justifyContent: 'center' },
  text: { fontSize: width * 0.5, textAlign: 'center' },
});

export default App;
```

### Example project with Detox tests

[Code example](./example/README.md)

## Props

| Prop                        |                      Default                      |                  Type                   | Description                                                                           |
| :-------------------------- | :-----------------------------------------------: | :-------------------------------------: | :------------------------------------------------------------------------------------ |
| data                        |        _not required if children is used_         |                 `array`                 | Data to use in renderItem                                                             |
| children                    |                         -                         |                 `node`                  | Children elements                                                                     |
| renderItem                  |        _not required if children is used_         |    `FlatListProps<T>['renderItem']`     | Takes an item from data and renders it into the list                                  |
| onMomentumScrollEnd         |                         -                         | `(item: { index: number }, event: any)` | Called after scroll end and the first parameter is the current index                  |
| vertical                    |                       false                       |                `boolean`                | Show vertical swiper                                                                  |
| index                       |                         0                         |                `number`                 | Index to start                                                                        |
| renderAll                   |                       false                       |                `boolean`                | Render all the items before display it                                                |
| **Pagination**              |
| showPagination              |                       false                       |                `boolean`                | Show pagination                                                                       |
| paginationDefaultColor      |                       gray                        |                `string`                 | Pagination color                                                                      |
| paginationActiveColor       |                       white                       |                `string`                 | Pagination color                                                                      |
| paginationStyle             |                        {}                         |               `ViewStyle`               | Style object for the container                                                        |
| paginationStyleItem         |                        {}                         |               `ViewStyle`               | Style object for the item (dot)                                                       |
| paginationStyleItemActive   |                        {}                         |               `ViewStyle`               | Style object for the active item (dot)                                                |
| paginationStyleItemInactive |                        {}                         |               `ViewStyle`               | Style object for the inactive item (dot)                                              |
| onPaginationSelectedIndex   |                         -                         |              `() => void`               | Executed when the user presses the pagination index, similar properties onChangeIndex |
| PaginationComponent         | [Component](./src/components/Pagination/index.js) |                 `node`                  | Overwrite Pagination component                                                        |
| **Autoplay**                |
| autoplay                    |                       false                       |                `boolean`                | Change index automatically                                                            |
| autoplayDelay               |                         3                         |                `number`                 | Delay between every page in seconds                                                   |
| autoplayLoop                |                       false                       |                `boolean`                | Continue playing after reach end                                                      |
| autoplayLoopKeepAnimation   |                       false                       |                `boolean`                | Show animation when reach the end of the list                                         |
| autoplayInvertDirection     |                       false                       |                `boolean`                | Invert auto play direction                                                            |
| disableGesture              |                       false                       |                `boolean`                | Disable swipe gesture                                                                 |

**More props**

This is a wrapper around [Flatlist](http://facebook.github.io/react-native/docs/flatlist.html#props), all their `props` works well and the inherited `props` too (from [ScrollView](http://facebook.github.io/react-native/docs/scrollview#props) and [VirtualizedList](http://facebook.github.io/react-native/docs/virtualizedlist#props))

## Functions

| Name            | Type                                             | Use                                                                                                 |
| :-------------- | :----------------------------------------------- | :-------------------------------------------------------------------------------------------------- |
| scrollToIndex   | `({ index: number, animated?: boolean}) => void` | Scroll to the index                                                                                 |
| getCurrentIndex | `() => number`                                   | Returns the current index                                                                           |
| getPrevIndex    | `() => number`                                   | Returns the previous index                                                                          |
| onChangeIndex   | `({ index: number, prevIndex: number}) => void`  | Executed every time the index change, the index change when the user reaches 60% of the next screen |
| goToFirstIndex  | `() => void`                                     | Go to the first index                                                                               |
| goToLastIndex   | `() => void`                                     | Go to the last index                                                                                |

## Limitations

- Vertical pagination is not supported on Android. [Doc](https://github.com/facebook/react-native/blob/a48da14800013659e115bf2b58e31aa396e678e5/Libraries/Components/ScrollView/ScrollView.js#L274)

## Author

Gustavo Gard
