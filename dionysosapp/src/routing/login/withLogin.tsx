import React from 'react';

import { AzureContextProvider, AzureContext } from '../../azureApi/AzureContext';
import { Login } from './Login';
import { Router } from '../router';

export const withLogin = (Component: React.ComponentType) =>
  function() {
    return <Router>
      <AzureContextProvider>
        <AzureContext.Consumer>
          { ({ isLoggedIn }) => {
            if (!isLoggedIn)
              return <Login />

            return <Component />
          } }
        </AzureContext.Consumer>
      </AzureContextProvider>
    </Router>
  }
