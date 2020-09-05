import React, { useState, useMemo } from 'react';

import {
  ISieveContext,
  SortableWineProps, SortBy, UpdateSortBy,
  FilterableWineProps, FilterBy, UpdateFilterBy,
} from './sieveViewTypes';

export const defaultContext: ISieveContext = {
  sortBy: {
    rating: true,
    date: true,
    price: true,
  },
  filterBy: {
    area: '',
    color: '',
    grape: '',
    sweetness: '',
  },
  updateSortBy: (field: SortableWineProps, isDescending: boolean) => {},
  updateFilterBy: (field: FilterableWineProps, value: string) => {},
}

export const SieveContext = React.createContext(defaultContext);

export function SieveContextProvider(props: React.PropsWithChildren<{}>) {
  const [ sortBy, setSortBy ] = useState<SortBy>(defaultContext.sortBy);
  const [ filterBy, setFilterBy ] = useState<FilterBy>(defaultContext.filterBy);

  const updateSortBy = useMemo<UpdateSortBy>(() => (field, isDescending) => {
    setSortBy({
      ...sortBy,
      [field]: isDescending,
    })
  }, [sortBy, setSortBy]);
  const updateFilterBy = useMemo<UpdateFilterBy>(() => (field, value) => {
    setFilterBy({
      ...filterBy,
      [field]: value,
    })
  }, [filterBy, setFilterBy]);

  return <SieveContext.Provider value={{
    sortBy, updateSortBy,
    filterBy, updateFilterBy
  }}>
    { props.children }
  </SieveContext.Provider>
}
