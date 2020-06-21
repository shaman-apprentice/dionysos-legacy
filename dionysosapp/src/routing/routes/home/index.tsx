import React from 'react';
import { Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { routeMapping } from '../../routesMapping';
import { Link } from '../../router';

export default function Home() { 
  return <>
    <FontAwesome5 name="glass-cheers" size={32} color="red" />

    {
      Object.entries(routeMapping).map(([path, desc]) =>
        <Link key={path} to={path}>
            <Text>{desc.label}</Text>
        </Link>
      )
    }
  </>;
}
