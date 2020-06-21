import React from 'react';
import { Platform } from 'react-native';

import { Header as RNHeader } from 'react-native-elements';

import NavMenu from './navMenu'

export default function Header() {
  return <RNHeader
    containerStyle={{
      height: Platform.OS === 'ios' ? 75 : 50,
      backgroundColor: '#3D6DCC',
    }}
    rightComponent={<NavMenu />}
  ></RNHeader>
}
