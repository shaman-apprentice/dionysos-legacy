import React, { useState, useCallback } from 'react';

import { useHistory } from '../routing/router';
import { IAzureContext } from './IAzureContext';
import { Wine } from '../types/wine';
import { AzureManager } from './AzureManager';

const isDev = Boolean(__DEV__) && process.env.NODE_ENV !== 'test';
// const isDev = false; // for connecting to azure
const defaultContext: IAzureContext = {
  isLoggedIn: false,
  login: () => Promise.resolve(),
  manager: null,
  wines: isDev
    ? require('./devWines').wines
    : {} as {[RowKey: string]: Wine},
  getWines: () => undefined,
  saveWine: (wine) => Promise.resolve(wine),
}

export const AzureContext = React.createContext<IAzureContext>(defaultContext);
 
export function AzureContextProvider(props: React.PropsWithChildren<{}>) {
  const history = useHistory();
  const [ manager, setManager ] = useState(defaultContext.manager);
  const [ wines, setWines ] = useState(defaultContext.wines);

  const logout = useCallback(() => {
    setManager(null);
  }, [setManager]);
  
  const login = useCallback(async (username: string, pw: string) => {
    const azManager = await AzureManager.login(username, pw, logout);
    setManager(azManager);
    setWines(await azManager.getWines());
  }, [setManager, setWines]);

  const getWines = useCallback(async () => {
    setWines(await manager?.getWines() ?? {});
  }, [manager, setWines]);

  const saveWine = useCallback(async (wine: Wine) => {
    wine = await manager!.upsert(wine);
    setWines({
      ...wines,
      [wine.RowKey]: wine,
    });
    
    history.push('/wine-overview');
    return wine;
  }, [manager, setWines, wines, history]);

  return <AzureContext.Provider value={{
    isLoggedIn: isDev || manager !== null,
    login,
    manager,
    wines,
    getWines,
    saveWine,
  }}>
    { props.children }
  </AzureContext.Provider>
}
