import React from 'react';

import { AzureContextProvider, AzureContext } from '../../azure-api/AzureContext';
import { Login } from "./Login";

export const withLogin = (Component: React.ComponentType ) =>
  function() {
    return <AzureContextProvider>
      <AzureContext.Consumer>
        { ({ services }) => {
          const isLoggedIn = services !== null;
          if (!isLoggedIn)
            return <Login />

          return <Component />
        } }
      </AzureContext.Consumer>
    </AzureContextProvider>
  }
