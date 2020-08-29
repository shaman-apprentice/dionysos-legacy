import React from 'react';

import { SieveContextProvider } from './sieveView/SieveContext';
import { WineList } from './WineList';

export default function WineOverview() {
  return <SieveContextProvider>
    <WineList />
  </SieveContextProvider>
}
