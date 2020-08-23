import React from 'react';

import { Overlay, OverlayProps } from '../Overlay';
import { SortByField } from './SortByField';
import { View } from 'react-native';


export function SortByOverlay(props: SortByOverlayProps) {
  // todo: exit button
  return <Overlay {...props}>
    <View style={{alignItems: 'flex-start'}}>
      <SortByField field="rating" />
      <SortByField field="Timestamp" />
    </View>
  </Overlay>
}

type SortByOverlayProps = Omit<OverlayProps, 'children'>
