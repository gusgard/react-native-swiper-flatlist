import { ViewabilityConfig, FlatListProps } from 'react-native';
import { PaginationProps } from '../Pagination/Pagination';

export type SwiperFlatListProps<T> = Partial<FlatListProps<T>> & {
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
  onViewableItemsChanged?: FlatListProps<T>['onViewableItemsChanged'];
  viewabilityConfig?: ViewabilityConfig;
  disableGesture?: boolean;
  e2eId?: string;
};
