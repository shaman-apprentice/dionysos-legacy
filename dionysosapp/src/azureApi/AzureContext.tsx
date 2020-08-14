import React, { useState, useRef, useMemo } from 'react';

import { createAzureServices, saveWine as saveWineInAzure, loadWines } from './azureApi';
import { IAzureContext } from './IAzureContext';
import { IAzureServices } from './IAzureServices';
import { Wine } from '../types/wine';
import { wines } from './wines';

// @ts-ignore `process.env.azureStorageConnectionString` is added through babel-plugin-inline-dotenv
const isDev = Boolean(__DEV__ && process.env.azureStorageConnectionString)
const defaultContext: IAzureContext = {
  isLoggedIn: isDev,
  login: (user: string, pw: string) => Promise.resolve(),
  wines: isDev ? wines : {} as {[RowKey: string]: Wine}, 
  saveWine: (wine: Wine) => Promise.resolve(),
}

export const AzureContext = React.createContext<IAzureContext>(defaultContext);
 
export function AzureContextProvider(props: React.PropsWithChildren<{}>) {
  const [isLoggedIn, setIsLoggedIn] = useState(defaultContext.isLoggedIn);
  const azureServices = useRef<IAzureServices | undefined>();
  const [ wines, setWines ] = useState(defaultContext.wines);

  // todo: Discuss with someone if such things should be a pure function, which receives `setWines` etc as parameter instead of `useMemo`
  const saveWine = useMemo(() => async (wine: Wine) => {
    const savedWine = await saveWineInAzure(azureServices.current, wine);
    const newWines = { ...wines };
    newWines[savedWine.RowKey] = savedWine;
    setWines(newWines);
  }, []);

  return <AzureContext.Provider value={{
    isLoggedIn,
    login: async (user: string, pw: string) => {
      azureServices.current = await createAzureServices(user, pw);
      setWines(await loadWines(azureServices.current));
      setIsLoggedIn(true);
    },
    wines,
    saveWine,
  }}>
    { props.children }
  </AzureContext.Provider>
}
