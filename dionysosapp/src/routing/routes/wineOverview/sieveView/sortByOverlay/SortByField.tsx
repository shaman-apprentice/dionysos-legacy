import React, { useContext } from 'react';

import { View, StyleSheet } from 'react-native';
import { Text, CheckBox } from 'react-native-elements';

import { SieveContext } from '../SieveContext';
import { SortableWineProps } from '../sieveViewTypes';

export function SortByField(props: SortByFieldProps) {
  const { sortBy, updateSortBy } = useContext(SieveContext);
  const toggleFieldState = () => {
    updateSortBy(props.field, !sortBy[props.field]);
  }

  return <View style={styles.container}>
    <Text style={styles.text}>{capitalise(props.field)}</Text>
    <CheckBox
      title="&darr;"
      checked={sortBy[props.field]}
      onPress={toggleFieldState}
    />
    <CheckBox
      title="&uarr;"
      checked={!sortBy[props.field]}
      onPress={toggleFieldState}
    />
  </View>
}

const  capitalise = (word: string) =>
  word[0].toUpperCase() + word.slice(1);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
  },
  text: {
    alignSelf: 'center',
    fontWeight: 'bold',
    flexGrow: 1,
  },
});

interface SortByFieldProps {
  field: SortableWineProps,
}
