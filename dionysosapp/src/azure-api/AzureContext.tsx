import React, { useState } from 'react';
import { IServices, createServices } from './Services';

const defaultContext: IAzureContext = {
  // @ts-ignore `process.env.azureStorageConnectionString` is added through babel-plugin-inline-dotenv
  services: __DEV__ && process.env.azureStorageConnectionString
    ? { tableService: 'todo', blobService: null }
    : null, 
  setServices: (host: string, tableSAS: string) => {},
  resetServices: () => {},
}

export const AzureContext = React.createContext<IAzureContext>(defaultContext);
 
export function AzureContextProvider(props: React.PropsWithChildren<{}>) {
  const [services, setServices] = useState<IServices | null>(defaultContext.services);

  return <AzureContext.Provider value={{
    services,
    setServices: (host: string, tableSAS: string) =>
      setServices(createServices(host, tableSAS)),
    resetServices: () => setServices(null),
  }}>
    { props.children }
  </AzureContext.Provider>
}

export interface IAzureContext {
  services: IServices | null,
  setServices: (host: string, tableSAS: string) => void,
  resetServices: () => void,
}
