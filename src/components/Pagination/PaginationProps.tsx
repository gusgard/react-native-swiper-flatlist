import { ViewStyle } from 'react-native';

export type PaginationProps = {
  scrollToIndex: (item: { index: number }) => void;
  size: number;
  paginationIndex?: number;
  paginationActiveColor?: string;
  paginationDefaultColor?: string;
  paginationStyle?: ViewStyle;
  paginationStyleItem?: ViewStyle;
  paginationStyleItemActive?: ViewStyle;
  paginationStyleItemInactive?: ViewStyle;
  onPaginationSelectedIndex?: () => void;
  e2eID?: string;
};
