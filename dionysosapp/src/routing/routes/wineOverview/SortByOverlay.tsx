import React from 'react';

import { Text } from 'react-native-elements';

import { Overlay, OverlayProps } from './Overlay';

export function SortByOverlay(props: SortByOverlayProps) {
  return <Overlay {...props}>
    <Text>hi</Text>
  </Overlay>
}

type SortByOverlayProps = Omit<OverlayProps, 'children'>;
