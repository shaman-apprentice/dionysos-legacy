import { Wine } from '../../../../types/wine';

export type SortableWineProps = keyof Pick<Wine, 'rating' | 'Timestamp'>;

type IsDescending = boolean;

export type SortByState = {
  [field in SortableWineProps]: IsDescending;
}

export type UpdateSortByState =
  (field: SortableWineProps, isDescending: IsDescending) => void

export interface ISortByContext {
  sortByState: SortByState,
  updateSortByState: UpdateSortByState,
}
