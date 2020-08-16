import React from 'react';

import { FilterContextProvider } from './filterView/FilterContext';
import { WineList } from './WineList';

export default function WineOverview() {
  return <FilterContextProvider>
    <WineList />
  </FilterContextProvider>
}
