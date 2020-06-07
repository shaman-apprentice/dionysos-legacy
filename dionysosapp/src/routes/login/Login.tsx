import React, { useState, useCallback, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';

import { getAzureCredentials } from './login-api';

export default  function Login() {
  const [ username, setUsername ] = useState('');
  const [ pw, setPw ] = useState('');
  const [ isLoggingIn, setIsLoggingIn ] = useState(false);
  const [ loginError, setLoginError ] = useState('');

  const login = async () => {
    try {
      setIsLoggingIn(true);
      const response = await getAzureCredentials(username, pw);
      if (response.status === 200) {
        // sas: string,
        // host: string,
        console.log(await response.json())
      } else {
        setLoginError(await response.text());
      }
    } finally {
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
      loading={isLoggingIn}
      disabled={isLoggingIn || !username || !pw}
    />
  </View>
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
