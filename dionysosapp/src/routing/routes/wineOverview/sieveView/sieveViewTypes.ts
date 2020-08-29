import { Wine } from '../../../../types/wine';

export type SortableWineProps = keyof Pick<Wine,
  'rating'
  | 'Timestamp'
  | 'price'
>;

type IsDescending = boolean;

export type SortBy = {
  [field in SortableWineProps]: IsDescending;
}

export type UpdateSortBy =
  (field: SortableWineProps, isDescending: IsDescending) => void

export interface ISieveContext {
  sortBy: SortBy,
  updateSortBy: UpdateSortBy,
}
