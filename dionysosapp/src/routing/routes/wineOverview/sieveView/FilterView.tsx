import React, { useState } from 'react';

import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

import { SortByOverlay } from './sortByOverlay/SortByOverlay';

export function FilterView() {
  const [ isSortByVisible, setIsSortByVisible ] = useState(false);

  return <View style={styles.container}>
  <Button 
    title="Sort by"
    containerStyle={{flexGrow: 1, borderRadius: 8, marginRight: 8}}
    onPress={() => { setIsSortByVisible(true); }}
  />
  <Button 
    title="Filter by"
    containerStyle={{flexGrow: 1, borderRadius: 8}}
  />

  <SortByOverlay
    isVisible={isSortByVisible}
    onBackdropPress={() => { setIsSortByVisible(false); }}
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
