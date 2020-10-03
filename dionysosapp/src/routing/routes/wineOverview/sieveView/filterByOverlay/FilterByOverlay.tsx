import React from 'react';

import { Button } from 'react-native-elements';
import { View } from 'react-native';
import { Overlay, OverlayProps } from '../../../../../sharedComponents/overlay/Overlay';
import { FilterByField } from './FilterByField';

export function FilterByOverlay(props: FilterByOverlayProps) {
  return <Overlay {...props}>
    <View style={{alignItems: 'flex-start'}}>
      <FilterByField field="color" />
      <FilterByField field="sweetness" />
      <FilterByField field="area" />

      <Button
        containerStyle={{ width: '100%' }}
        title="Close"
        onPress={props.onBackdropPress}
      />
    </View>
  </Overlay>
}

type FilterByOverlayProps = Omit<OverlayProps, 'children'>
