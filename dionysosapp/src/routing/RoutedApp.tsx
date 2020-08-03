import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from 'react-native-elements';

import { withLogin } from './login/withLogin';
import { Router, Switch, Route } from './router';
import Header from './header';
import { routeMapping } from './routesMapping';
import Home from './routes/home';

export default withLogin(function RoutedApp() {
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
                  path={path}
                  component={desc.component}
                />
              )
            }
            <Route component={Home} />
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
