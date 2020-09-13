import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';

import { Overlay, OverlayProps } from '../../../../sharedComponents/overlay/Overlay';

// https://react-native-elements.github.io/react-native-elements/docs/image/

export function ShowImageView(props: ShowImageViewProps) {
  return <Overlay {...props}>
    <View style={{alignItems: 'flex-start'}}>

      <Button
        containerStyle={{ width: '100%' }}
        title="Close"
        onPress={props.onBackdropPress}
      />
    </View>
  </Overlay>
}

type ShowImageViewProps = Omit<OverlayProps, 'children'>
