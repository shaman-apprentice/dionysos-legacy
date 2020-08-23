import React, { useState, useMemo } from 'react';

import { SortableWineProps, UpdateSortByState, SortByState, ISortByContext } from './filterViewTypes';

export const defaultContext: ISortByContext = {
  sortByState: {
    rating: true,
    Timestamp: true,
    price: true,
  },
  updateSortByState: (field: SortableWineProps, isDescending: boolean) => {},
}

export const FilterContext = React.createContext(defaultContext);

export function FilterContextProvider(props: React.PropsWithChildren<{}>) {
  const [ sortByState, setSortByState ] = useState<SortByState>({
    rating: true,
    Timestamp: true,  
    price: true,
  });

  const updateSortByState = useMemo<UpdateSortByState>(() => (field, isDescending) => {
    setSortByState({
      ...sortByState,
      [field]: isDescending,
    })
  }, [sortByState, setSortByState]);

  return <FilterContext.Provider value={{
    sortByState,
    updateSortByState,
  }}>
    { props.children }
  </FilterContext.Provider>
}
