import React, { useState, useCallback } from 'react';

import { IAzureContext } from './IAzureContext';
import { Wine } from '../types/wine';
import { AzureManager } from './AzureManager';

const isDev = Boolean(__DEV__);
const defaultContext: IAzureContext = {
  isLoggedIn: isDev,
  login: () => Promise.resolve(),
  manager: null,
  wines: isDev
    ? require('./devWines').wines
    : {} as {[RowKey: string]: Wine},
  getWines: () => undefined,
}

export const AzureContext = React.createContext<IAzureContext>(defaultContext);
 
export function AzureContextProvider(props: React.PropsWithChildren<{}>) {
  const [ manager, setManager ] = useState(defaultContext.manager);
  const [ wines, setWines ] = useState(defaultContext.wines);

  const logout = useCallback(() => {
    setManager(null);
  }, [setManager]);
  
  const login = useCallback(async (username: string, pw: string) => {
    const azManager = await AzureManager.login(username, pw, logout);
    setManager(azManager);
    setWines(await azManager.getWines());
  }, [setManager]);

  const getWines = useCallback(async () => {
    setWines(await manager?.getWines() ?? {});
  }, [setWines]);

  return <AzureContext.Provider value={{
    isLoggedIn: isDev || manager !== null,
    login,
    manager,
    wines,
    getWines,
  }}>
    { props.children }
  </AzureContext.Provider>
}
