import React from 'react';
import { Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { Link } from '../../router';

export default function Home() { 
  return <>
    <FontAwesome5 name="glass-cheers" size={32} color="red" />

    <Link to="/wine-overview">
      <Text>View wines</Text>
    </Link>
    <Link to="/edit-wine/-1">
      <Text>Add a wine</Text>
    </Link>
  </>;
}
