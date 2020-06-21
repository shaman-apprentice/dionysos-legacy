import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from 'react-native-elements';

import { withAzureLogin } from './login/withAzureLogin';
import { Router, Switch, Route } from './router';
import Header from './header';
import { routeMapping } from './routesMapping';

export default withAzureLogin(function RoutedApp() {
  return <View style={styles.container}>
    <React.Suspense fallback={<Text>Loading...</Text>}>
      <Router>
        <Header />

        <Switch>
          {
            Object.entries(routeMapping).map(([path, desc]) => 
              <Route
                key={path}
                exact
                path={path}
                component={desc.component}
              />
            )
          }
        </Switch>
      </Router>
    </React.Suspense>
  </View>
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
