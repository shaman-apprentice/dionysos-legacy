import React from 'react';

import { Overlay, OverlayProps } from '../../../../../sharedComponents/overlay/Overlay';
import { SortByField } from './SortByField';
import { View } from 'react-native';
import { Button } from 'react-native-elements';


export function SortByOverlay(props: SortByOverlayProps) {
  return <Overlay {...props}>
    <View style={{alignItems: 'flex-start'}}>
      <SortByField field="date" />
      <SortByField field="rating" />
      <SortByField field="price" />

      <Button
        containerStyle={{ width: '100%' }}
        title="Close"
        onPress={props.onBackdropPress}
      />
    </View>
  </Overlay>
}

type SortByOverlayProps = Omit<OverlayProps, 'children'>
