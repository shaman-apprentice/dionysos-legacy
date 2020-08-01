import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';

import { Wine } from '../../../types/Wine';
import { wines } from './__mocks__/wines';

export default function WineOverview() {
  return <View style={styles.container}>
    <FlatList
      data={wines}
      keyExtractor={(wine) => wine.RowKey}
      renderItem={renderWine}
    />
  </View>
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  wineItem: {
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    padding: 15,
  }
});

const renderWine = (wineItem) => {
  const wine = wineItem.item;

  return <TouchableOpacity onPress={(ab, cd, ef) => {
    alert("Hi " + wine.color)}}>
    <View
      style={styles.wineItem}
    >
      <Text
        key={wine.RowKey}
        style={styles.item}
      >
        {wine.rating} {new Date(wine.Timestamp).toLocaleString('en-GB', { year: 'numeric', month: 'numeric', day: 'numeric' })} {wine.color} {wine.sweetness}
      </Text>
    </View>
  </TouchableOpacity>
}
