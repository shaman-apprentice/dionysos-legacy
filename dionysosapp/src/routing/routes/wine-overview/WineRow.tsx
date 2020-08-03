import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { Sweetness } from '../../../types/Wine';

interface WineRowProps {
  item: {
    RowKey: string,
    rating: number,
    Timestamp: number,
    color: string,
    sweetness: Sweetness
  },
  pushHistory: Function,
}

export default function WineRow(props: WineRowProps) {
  const wine = props.item;
  
  return <TouchableOpacity onPress={() => {
    props.pushHistory(`/edit-wine/${wine.RowKey}`);
  }}>
    <View style={styles.wineItem}>
      <Text>
        {wine.rating} {new Date(wine.Timestamp).toLocaleString('en-GB', { year: 'numeric', month: 'numeric', day: 'numeric' })} {wine.color} {wine.sweetness}
      </Text>
    </View>
  </TouchableOpacity>
}

const styles = StyleSheet.create({
  wineItem: {
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    padding: 15,
  }
});
