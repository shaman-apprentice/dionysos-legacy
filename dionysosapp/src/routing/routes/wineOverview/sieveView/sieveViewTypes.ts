import { Wine } from '../../../../types/wine';

export type SortableWineProps = keyof Pick<Wine,
  'rating' | 'Timestamp' | 'price'
>

type IsDescending = boolean;

export type SortBy = {
  [field in SortableWineProps]: IsDescending;
}

export type UpdateSortBy =
  (field: SortableWineProps, isDescending: IsDescending) => void

export type FilterableWineProps = keyof Pick<Wine,
  'color' | 'sweetness' | 'area' | 'grape' 
>

export type FilterBy = {
  [field in FilterableWineProps]: string;
}

export type UpdateFilterBy = 
  (field: FilterableWineProps, value: string) => void

export interface ISieveContext {
  sortBy: SortBy,
  updateSortBy: UpdateSortBy,
  filterBy: FilterBy,
  updateFilterBy: UpdateFilterBy,
}
