import React from 'react';

import { Text } from 'react-native-elements';

import { Overlay } from './Overlay';

export function SortByOverlay(props: SortByOverlayProps) {
  return <Overlay
    isVisible={props.isVisible}
  >
    <Text>hi</Text>
  </Overlay>
}

interface SortByOverlayProps {
  isVisible: boolean,
}
