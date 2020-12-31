import { ViewabilityConfig, FlatListProps } from 'react-native';
import { PaginationProps } from '../Pagination/Pagination';

export type SwiperFlatListProps<T> = Partial<FlatListProps<T>> &
  Pick<
    PaginationProps,
    | 'paginationActiveColor'
    | 'paginationDefaultColor'
    | 'paginationStyle'
    | 'paginationStyleItem'
    | 'paginationStyleItemActive'
    | 'paginationStyleItemInactive'
    | 'onPaginationSelectedIndex'
    | 'disablePaginationPress'
  > & {
    children?: React.ReactNode | React.ReactNode[];
    data?: T[];
    vertical?: boolean;
    index?: number;
    renderAll?: boolean;
    renderItem?: FlatListProps<T>['renderItem'];
    onChangeIndex?: (item: { index: number; prevIndex: number }) => void;

    // Pagination
    showPagination?: boolean;
    PaginationComponent?: React.FC<PaginationProps>;

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
    e2eID?: string;
  };
