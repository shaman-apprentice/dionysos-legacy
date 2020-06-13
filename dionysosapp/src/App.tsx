import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Router, Route, Switch } from './router/Router';
import { withAzureLogin } from './shared-components/login/withAzureLogin';

const Home = React.lazy(() => import('./routes/Home'));

export default withAzureLogin(function App() {
  return <View style={styles.container}>
    <React.Suspense fallback={<Text>Loading...</Text>}>
      <Router>
        <Switch>
          <Route><Home /></Route>
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
