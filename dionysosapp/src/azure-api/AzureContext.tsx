import React, { useState } from 'react';
import { IServices, createServices } from './Services';

export const AzureContext = React.createContext<IAzureContext>({
  services: null,
  setServices: (host: string, tableSAS: string) => {},
  resetServices: () => {},
});
 
export function AzureContextProvider(props: React.PropsWithChildren<{}>) {
  const [services, setServices] = useState<IServices | null>(null);

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
