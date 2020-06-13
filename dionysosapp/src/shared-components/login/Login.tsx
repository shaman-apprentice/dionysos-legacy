import React, { useState, useContext, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';

import { AzureContext } from '../../azure-api/AzureContext'
import { getAzureCredentials } from './loginApi';

export function Login() {
  const [ username, setUsername ] = useState('');
  const [ pw, setPw ] = useState('');
  const [ isLoggingIn, setIsLoggingIn ] = useState(false);
  const [ loginError, setLoginError ] = useState('');
  const { setServices } = useContext(AzureContext);

  const onLoginPressed = useCallback(() => {
    setIsLoggingIn(true);
  }, [ setIsLoggingIn ]);

  useEffect(() => {
    if (!isLoggingIn)
      return;
     
    login();
     
    async function login() {
      const response = await getAzureCredentials(username, pw);
      
      if (response.status === 200) {
        const { host, sas } = await response.json();
        setServices(host, sas); // leads to login / "redirect to app" via `withAzureLogin HoC`
      } else {
        setLoginError(await response.text());
        setIsLoggingIn(false);
      }
    }
  }, [ isLoggingIn ]);

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
      onPress={onLoginPressed}
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
