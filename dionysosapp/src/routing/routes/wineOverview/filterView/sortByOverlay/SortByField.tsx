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
    <Text style={styles.text}>{capitalise(props.field)}</Text>
    <CheckBox
      title="&darr;"
      checked={sortByState[props.field]}
      onPress={toggleFieldState}
    />
    <CheckBox
      title="&uarr;"
      checked={!sortByState[props.field]}
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
