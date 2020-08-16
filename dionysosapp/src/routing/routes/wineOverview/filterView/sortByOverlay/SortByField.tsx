import React, { useContext } from 'react';

import { View, StyleSheet } from 'react-native';
import { Text, CheckBox } from 'react-native-elements';
import { FilterContext } from '../FilterContext';
import { SortableWineProps } from '../filterViewTypes';

export function SortByField(props: SortByFieldProps) {
  const { sortByState, updateSortByState } = useContext(FilterContext);
  const toggleFieldState = () => {
    updateSortByState(props.field, !sortByState[props.field]);
  }

  return <View style={styles.container}>
    <Text style={styles.text}>{capitalise(props.field as any)}</Text>
    <CheckBox
      title="descending"
      checked={sortByState[props.field]}
      onPress={toggleFieldState}
    />
    <CheckBox
      title="ascending"
      checked={!sortByState[props.field]}
      onPress={toggleFieldState}
    />
  </View>
}

const  capitalise = (word: string) =>
  word[0].toUpperCase() + word.slice(1);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  text: {
    alignSelf: 'center',
    fontWeight: 'bold',
  }
});

interface SortByFieldProps {
  field: SortableWineProps,
}
