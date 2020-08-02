import React, { useState, useRef } from 'react';
import { createAzureServices } from './azureApi';
import { IAzureContext } from './IAzureContext';
import { IAzureServices } from './IAzureServices';

const defaultContext: IAzureContext = {
  // @ts-ignore `process.env.azureStorageConnectionString` is added through babel-plugin-inline-dotenv
  isLoggedIn: Boolean(__DEV__ && process.env.azureStorageConnectionString),
  login: (host: string, tableSAS: string) => Promise.resolve(),
}

export const AzureContext = React.createContext<IAzureContext>(defaultContext);
 
export function AzureContextProvider(props: React.PropsWithChildren<{}>) {
  const [isLoggedIn, setIsLoggedIn] = useState(defaultContext.isLoggedIn);
  const azureServices = useRef<IAzureServices | undefined>();

  return <AzureContext.Provider value={{
    isLoggedIn,
    login: async (user: string, pw: string) => {
      azureServices.current = await createAzureServices(user, pw);
      setIsLoggedIn(true);
    }
    // saveWine - uses azureServices.current.tableService
  }}>
    { props.children }
  </AzureContext.Provider>
}
