import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';

import styles from './styles';

export default class Pagination extends PureComponent {
  static propTypes = {
    scrollToIndex: PropTypes.func.isRequired,
    data: PropTypes.array,
    paginationIndex: PropTypes.number,
    paginationActiveColor: PropTypes.string,
    paginationDefaultColor: PropTypes.string
  };

  static defaultProps = {
    data: [],
    paginationIndex: 0,
    paginationActiveColor: 'black',
    paginationDefaultColor: 'white'
  };

  render() {
    const {
      data,
      paginationIndex,
      scrollToIndex,
      paginationDefaultColor,
      paginationActiveColor
    } = this.props;
    return (
      <View style={styles.paginationContainer}>
        {data.map((_, index) => (
          <TouchableOpacity
            style={[
              styles.pagination,
              paginationIndex === index
                ? { backgroundColor: paginationActiveColor }
                : { backgroundColor: paginationDefaultColor }
            ]}
            key={index}
            onPress={() => scrollToIndex(index)}
          />
        ))}
      </View>
    );
  }
}
