import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from 'react-native-elements';

import { withAzureLogin } from './login/withAzureLogin';
import { Router, Switch, Route } from './router';
import Header from './header';
import { routeMapping } from './routesMapping';

export default withAzureLogin(function RoutedApp() {
  return <View style={styles.appView}>
    <React.Suspense fallback={<Text>Loading...</Text>}>
      <Router>
        <Header />

        <View style={styles.container}>
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
        </View>
      </Router>
    </React.Suspense>
  </View>
});

const styles = StyleSheet.create({
  appView: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
