import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from 'react-native-elements';

import { withLogin } from './login/withLogin';
import { Router, Switch, Route } from './router';
import Header from './header';
import Home from './routes/home';

export default withLogin(function RoutedApp() {
  return <View style={styles.appView}>
    <React.Suspense fallback={<Text>Loading...</Text>}>
      <Router>
        <Header />

        <View style={styles.container}>
          <Switch>
            <Route
              path="/wine-overview"
              component={React.lazy(() => import('./routes/wine-overview'))}
            />
            <Route
              path="/edit-wine/:RowKey"
              component={React.lazy(() => import('./routes/edit-wine'))}
            />
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
