import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';

import styles from './styles';

export default class Pagination extends PureComponent {
  static propTypes = {
    scrollToIndex: PropTypes.func.isRequired,
    size: PropTypes.number.isRequired,
    paginationIndex: PropTypes.number,
    paginationActiveColor: PropTypes.string,
    paginationDefaultColor: PropTypes.string,
  };

  static defaultProps = {
    data: [],
    paginationIndex: 0,
    paginationActiveColor: 'black',
    paginationDefaultColor: 'white',
  };

  render() {
    const {
      size,
      paginationIndex,
      scrollToIndex,
      paginationDefaultColor,
      paginationActiveColor,
    } = this.props;
    return (
      <View style={styles.paginationContainer}>
      {Array.from({ length: size }).map((_, index) => (
          <TouchableOpacity
            style={[
              styles.pagination,
              paginationIndex === index
                ? { backgroundColor: paginationActiveColor }
                : { backgroundColor: paginationDefaultColor },
            ]}
            key={index}
            onPress={() => scrollToIndex({index})}
          />
        ))}
      </View>
    );
  }
}
