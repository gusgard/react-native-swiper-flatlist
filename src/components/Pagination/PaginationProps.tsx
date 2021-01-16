import { ViewStyle } from 'react-native';

export type PaginationProps = {
  scrollToIndex: (item: { index: number }) => void;
  size: number;
  paginationIndex: number;
  /**
   * Pagination color
   * Defaults to 'white'
   *
   */
  paginationActiveColor?: string;
  /**
   * Pagination color
   * Defaults to 'gray'
   *
   */
  paginationDefaultColor?: string;
  /**
   * Style object for the container
   * Defaults to '{}'
   *
   */
  paginationStyle?: ViewStyle;
  /**
   * Style object for the item (dot)
   * Defaults to '{}'
   *
   */
  paginationStyleItem?: ViewStyle;
  /**
   * Style object for the active item (dot)
   * Defaults to '{}'
   *
   */
  paginationStyleItemActive?: ViewStyle;
  /**
   * Style object for the inactive item (dot)
   * Defaults to '{}'
   *
   */
  paginationStyleItemInactive?: ViewStyle;
  /**
   * Executed when the user presses the pagination index, similar properties onChangeIndex
   */
  onPaginationSelectedIndex?: () => void;
  /**
   * TestID for automation testing
   */
  e2eID?: string;
};
