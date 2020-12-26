# :point_up_2: Swiper FlatList component

![platforms](https://img.shields.io/badge/platforms-Android%20|%20iOS-brightgreen.svg)
[![npm](https://img.shields.io/npm/v/react-native-swiper-flatlist.svg)](https://www.npmjs.com/package/react-native-swiper-flatlist)
[![npm](https://img.shields.io/npm/dm/react-native-swiper-flatlist.svg)](https://www.npmjs.com/package/react-native-swiper-flatlist)
[![travis](https://travis-ci.org/gusgard/react-native-swiper-flatlist.svg?branch=master)](https://travis-ci.org/gusgard/react-native-swiper-flatlist)
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

| react-native-swiper-flatlist | react-native |
| ---------------------------- | ------------ |
| 1.x                          | <= 0.58      |
| 2.x                          | >= 0.59      |

## Example

### Expo

[Example](https://snack.expo.io/@gusgard/react-native-swiper-flatlist)

### Code

```js
import React, { PureComponent } from 'react';
import { Text, Dimensions, Image, StyleSheet, View } from 'react-native';

import SwiperFlatList from 'react-native-swiper-flatlist';

export default class App extends PureComponent {
  render() {
    return (
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
  }
}

export const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  child: {
    height: height * 0.5,
    width,
    justifyContent: 'center',
  },
  text: {
    fontSize: width * 0.5,
    textAlign: 'center',
  },
});
```

[Code example](./example/README.md)

## Props

| Prop                        |                      Default                      |         Type          | Description                                                                           |
| :-------------------------- | :-----------------------------------------------: | :-------------------: | :------------------------------------------------------------------------------------ |
| data                        |        _not required if children is used_         |        `array`        | Data to use in renderItem                                                             |
| children                    |                         -                         |        `node`         | Children elements                                                                     |
| renderItem                  |        _not required if children is used_         |        `func`         | Takes an item from data and renders it into the list                                  |
| onMomentumScrollEnd         |                         -                         |        `func`         | Called after scroll end and the first parameter is the current index                  |
| vertical                    |                       false                       |        `bool`         | Show vertical swiper                                                                  |
| index                       |                         0                         |       `number`        | Index to start                                                                        |
| renderAll                   |                       false                       |        `bool`         | Render all the items before display it                                                |
| **Pagination**              |
| showPagination              |                       false                       |        `bool`         | Show pagination                                                                       |
| paginationDefaultColor      |                       gray                        |       `string`        | Pagination color                                                                      |
| paginationActiveColor       |                       white                       |       `string`        | Pagination color                                                                      |
| paginationStyle             |                        {}                         | `ViewPropTypes.style` | Style object for the container                                                        |
| paginationStyleItem         |                        {}                         | `ViewPropTypes.style` | Style object for the item (dot)                                                       |
| paginationStyleItemActive   |                        {}                         | `ViewPropTypes.style` | Style object for the active item (dot)                                                |
| paginationStyleItemInactive |                        {}                         | `ViewPropTypes.style` | Style object for the inactive item (dot)                                              |
| onPaginationSelectedIndex   |                         -                         |        `func`         | Executed when the user presses the pagination index, similar properties onChangeIndex |
| PaginationComponent         | [Component](./src/components/Pagination/index.js) |        `node`         | Overwrite Pagination component                                                        |
| **Autoplay**                |
| autoplay                    |                       false                       |        `bool`         | Change index automatically                                                            |
| autoplayDelay               |                         3                         |       `number`        | Delay between every page in seconds                                                   |
| autoplayLoop                |                       false                       |        `bool`         | Continue playing after reach end                                                      |
| autoplayLoopKeepAnimation   |                       false                       |        `bool`         | Show animation when reach the end of the list                                         |
| autoplayInvertDirection     |                       false                       |        `bool`         | Invert auto play direction                                                            |
| disableGesture              |                       false                       |        `bool`         | Disable swipe gesture                                                                 |

**More props**

This is a wrapper around [Flatlist](http://facebook.github.io/react-native/docs/flatlist.html#props), all their `props` works well and the inherited `props` too (from [ScrollView](http://facebook.github.io/react-native/docs/scrollview#props) and [VirtualizedList](http://facebook.github.io/react-native/docs/virtualizedlist#props))

## Functions

| Name            | Params                                  | Use                                                                                                 |
| :-------------- | :-------------------------------------- | :-------------------------------------------------------------------------------------------------- |
| scrollToIndex   | { index: `number`, animated: `bool?`}   | Scroll to the index                                                                                 |
| getCurrentIndex | -                                       | Returns the current index                                                                           |
| getPrevIndex    | -                                       | Returns the previous index                                                                          |
| onChangeIndex   | { index: `number`, prevIndex: `number`} | Executed every time the index change, the index change when the user reaches 60% of the next screen |
| goToFirstIndex  | -                                       | Go to the first index                                                                               |
| goToLastIndex   | -                                       | Go to the last index                                                                                |

## Limitations

- Vertical pagination is not supported on Android. [Doc](https://github.com/facebook/react-native/blob/a48da14800013659e115bf2b58e31aa396e678e5/Libraries/Components/ScrollView/ScrollView.js#L274)
- `react-native-web` is not supported, due to the lack of support of some `props` used in this library. [Expo example](https://snack.expo.io/@gusgard/react-native-web-example-with-swiper)

## Author

Gustavo Gard
