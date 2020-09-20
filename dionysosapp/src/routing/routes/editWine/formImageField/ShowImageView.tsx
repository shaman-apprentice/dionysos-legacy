import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Image } from 'react-native-elements';
import { useFormikContext } from 'formik';

import { AzureContext } from '../../../../azureApi/AzureContext';
import { Overlay, OverlayProps } from '../../../../sharedComponents/overlay/Overlay';
import { Wine } from '../../../../types/wine';

export function ShowImageView(props: ShowImageViewProps) {
  const { values: wine } = useFormikContext<Wine>();
  const { manager: azManager } = useContext(AzureContext);
  const [ dataUri, setDataUri ] = useState(wine.image);

  useEffect(() => {
    if (dataUri !== wine.image)
      setDataUri(wine.image);

    if (dataUri?.startsWith('data:') || !props.isVisible)
      return; 

    azManager?.downloadImage(dataUri!).then(setDataUri);
  }, [props.isVisible, wine.image]);
  
  return <Overlay {...props}>
    <View style={{alignItems: 'flex-start'}}>
      <Image
        key={dataUri /* without key a change in `imageUri` doesn't reload image */}
        style={{ width: 200, height: 200 }}
        source={{ uri: dataUri }}
      />
      <Button
        containerStyle={{ width: '100%' }}
        title="Close"
        onPress={props.onBackdropPress}
      />
    </View>
  </Overlay>
}

type ShowImageViewProps = Omit<OverlayProps, 'children'>
