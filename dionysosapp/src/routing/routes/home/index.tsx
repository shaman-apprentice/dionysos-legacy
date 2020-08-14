import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { Link } from '../../router';

export default function Home() { 
  return <>
    <FontAwesome5 name="glass-cheers" size={32} color="red" />

    <View style={styles.link}>
      <Link  to="/wine-overview">
        <Text>View wines</Text>
      </Link>
    </View>
    <View style={styles.link}>
      <Link to="/edit-wine/-1">
        <Text>Add a wine</Text>
      </Link>
    </View>
  </>;
}

const styles = StyleSheet.create({
  link: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'blue',
    padding: 8,
    marginTop: 8,
  },
});
