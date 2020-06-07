import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AzureContextProvider, AzureContext } from './azure-api/AzureContext';
import {
  Router,
  Route,
  Link, Switch
} from './router/Router';


const Home = React.lazy(() => import('./routes/Home'));
const Login = React.lazy(() => import('./routes/login/Login'));


export default function App() {
  return <View style={styles.container}>
    <React.Suspense fallback={<Text>Loading...</Text>}>
      <AzureContextProvider>
        <AzureContext.Consumer>
          { ({ services }) => {
            const isLoggedIn = services !== null;
            if (!isLoggedIn)
              return <Login />

            return <Router>
              <Switch>
                <Route><Home /></Route>
              </Switch>
            </Router>
          } }
        </AzureContext.Consumer>
      </AzureContextProvider>
    </React.Suspense>
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
