import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  Router,
  Route,
  Link, Switch
} from './router/Router';

const Home = React.lazy(() => import('./routes/Home'));
const Login = React.lazy(() => import('./routes/Login'));


export default function App() {
  return (
    <Router>
      <View style={styles.container}>
        <Text>Hello World!</Text>
        <Link to="/Home"><Text>Home</Text></Link>
        <Link to="/Login"><Text>Login</Text></Link>
        <React.Suspense fallback={<Text>Loading...</Text>}>
          <Switch>
            <Route path="/Home"><Home /></Route>
            <Route><Login /></Route>
          </Switch>
        </React.Suspense>
      </View>
    </Router>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
