import React from 'react';
import { Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { Link } from '../../shared-components/router'

export default function Home() { 
  return <>
    {/* todo: nice layout */}
    <FontAwesome5 name="glass-cheers" size={32} color="red" />

    <Link to="/wine-overview">
      <>
        <Text>View wines</Text>
        <WineIcon/><WineIcon/><WineIcon/>
        </>
      </Link>
    <Link to="/edit-wine">
      <>
        <Text>Add a wine</Text>
        <WineIcon/>
      </>
    </Link>
  </>;
}

const WineIcon = () =>
  <FontAwesome5 name="wine-glass-alt" size={16} color="red" />