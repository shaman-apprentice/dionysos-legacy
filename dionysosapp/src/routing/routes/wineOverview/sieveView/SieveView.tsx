import React, { useState } from 'react';

import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

import { SortByOverlay } from './sortByOverlay/SortByOverlay';
import { FilterByOverlay } from './filterByOverlay/FilterByOverlay';

export function SieveView() {
  const [ isSortByVisible, setIsSortByVisible ] = useState(false);
  const [ isFilterByVisible, setIsFilterByVisible ] = useState(false);

  return <View style={styles.container}>
  <Button 
    title="Sort by"
    containerStyle={{flexGrow: 1, borderRadius: 8, marginRight: 8}}
    onPress={() => { setIsSortByVisible(true); }}
  />
  <Button 
    title="Filter by"
    containerStyle={{flexGrow: 1, borderRadius: 8}}
    onPress={() => { setIsFilterByVisible(true); }}
  />

  <SortByOverlay
    isVisible={isSortByVisible}
    onBackdropPress={() => { setIsSortByVisible(false); }}
  />
  <FilterByOverlay
    isVisible={isFilterByVisible}
    onBackdropPress={() => { setIsFilterByVisible(false); }}
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
