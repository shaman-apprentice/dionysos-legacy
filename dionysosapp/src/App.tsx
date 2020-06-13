import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Router, Route, Switch } from './shared-components/router';
import { withAzureLogin } from './shared-components/login/withAzureLogin';

const Home = React.lazy(() => import('./routes/home'));
const WineOverview = React.lazy(() => import('./routes/wine-overview'));
const EditWine = React.lazy(() => import('./routes/edit-wine'));

export default withAzureLogin(function App() {
  return <View style={styles.container}>
    <React.Suspense fallback={<Text>Loading...</Text>}>
      {/* Todo header */}
      <Router>
        <Switch>
          <Route path="/wine-overview" component={WineOverview} />
          <Route path="/edit-wine" component={EditWine} />
          <Route component={Home} />
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
