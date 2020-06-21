import React from 'react';

import { Header as RNHeader } from 'react-native-elements';

import NavMenu from './navMenu'

export default function Header() {
  return <RNHeader
    rightComponent={<NavMenu />}
  ></RNHeader>
}
