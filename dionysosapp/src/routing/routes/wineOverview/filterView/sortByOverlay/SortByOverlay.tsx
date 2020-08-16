import React from 'react';

import { Overlay, OverlayProps } from '../Overlay';
import { SortByField } from './SortByField';

export function SortByOverlay(props: SortByOverlayProps) {
  // todo: layout and an exit button
  return <Overlay {...props}>
    <SortByField field="rating" />
  </Overlay>
}

type SortByOverlayProps = Omit<OverlayProps, 'children'>
