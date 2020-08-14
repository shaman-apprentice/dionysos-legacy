import React from 'react';

import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

export function FilterView() {
  return <View style={styles.container}>
  <Button 
    title="Sort by"
    containerStyle={{flexGrow: 1, borderRadius: 8, marginRight: 8}}
  />
  <Button 
    title="Filter by"
    containerStyle={{flexGrow: 1, borderRadius: 8}}
  />
</View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 8,
  }, 
});
