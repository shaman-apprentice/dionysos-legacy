import React, { useState, useContext, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';

import { AzureContext } from '../../azureApi/AzureContext';

export function Login() {
  const [ user, setUser ] = useState('');
  const [ pw, setPw ] = useState('');
  const [ isLoggingIn, setIsLoggingIn ] = useState(false);
  const [ loginError, setLoginError ] = useState('');
  const { login } = useContext(AzureContext);

  const onLoginPressed = useCallback(() => {
    setIsLoggingIn(true);
  }, [ setIsLoggingIn ]);

  useEffect(() => {
    if (!isLoggingIn)
      return;
    
    login(user, pw).catch(error => {
      setLoginError(error.message);
      setIsLoggingIn(false);
    });
  }, [ isLoggingIn ]);

  return <View style={styles.container}>
    <Input 
      label="Username"
      placeholder="Username"
      onChangeText={setUser}
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
      disabled={isLoggingIn || !user || !pw}
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
