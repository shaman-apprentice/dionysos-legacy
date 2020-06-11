import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';

import { AzureContext } from '../../azure-api/AzureContext'
import { getAzureCredentials } from './login-api';

export function Login() {
  const [ username, setUsername ] = useState('');
  const [ pw, setPw ] = useState('');
  const [ isLoggingIn, setIsLoggingIn ] = useState(false);
  const [ loginError, setLoginError ] = useState('');
  const setAzureServices = useContext(AzureContext).setServices

  const login = async () => {
    const response = await getAzureCredentials(username, pw);
    if (response.status === 200) {
      const { host, sas } = await response.json();
      // todo investigate update of unmounted component
      setAzureServices(host, sas); // leads to login / "redirect to app"
    } else {
      setLoginError(await response.text());
      setIsLoggingIn(false);
    }
  };

  return <View style={styles.container}>
    <Input 
      label="Username"
      placeholder="Username"
      onChangeText={setUsername}
      disabled={isLoggingIn}
      errorMessage={loginError}
      />
    <Input 
      label="Password"
      placeholder="Password"
      secureTextEntry
      onChangeText={setPw}
      disabled={isLoggingIn}
      errorMessage={loginError}
    />
    <Button
      title="Login"
      onPress={login}
      containerStyle={{width: '90%'}}
      disabled={isLoggingIn || !username || !pw}
    />
  </View>
} 

const styles = StyleSheet.create({
  container: {
    maxWidth: 360,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
