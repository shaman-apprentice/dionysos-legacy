import React, { useState, useMemo } from 'react';

import {
  SortableWineProps,
  UpdateSortBy,
  SortBy,
  ISieveContext,
} from './sieveViewTypes';

export const defaultContext: ISieveContext = {
  sortBy: {
    rating: true,
    Timestamp: true,
    price: true,
  },
  updateSortBy: (field: SortableWineProps, isDescending: boolean) => {},
}

export const SieveContext = React.createContext(defaultContext);

export function SieveContextProvider(props: React.PropsWithChildren<{}>) {
  const [ sortBy, setSortBy ] = useState<SortBy>({
    rating: true,
    Timestamp: true,  
    price: true,
  });

  const updateSortBy = useMemo<UpdateSortBy>(() => (field, isDescending) => {
    setSortBy({
      ...sortBy,
      [field]: isDescending,
    })
  }, [sortBy, setSortBy]);

  return <SieveContext.Provider value={{
    sortBy: sortBy,
    updateSortBy,
  }}>
    { props.children }
  </SieveContext.Provider>
}
