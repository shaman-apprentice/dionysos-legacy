import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
  Router,
  Route,
  Link, Switch
} from './router/Router';
import { withLogin } from './routes/login/withLogin';

const Home = React.lazy(() => import('./routes/Home'));

export default withLogin(function App() {
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
