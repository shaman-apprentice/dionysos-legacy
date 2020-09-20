import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Image, Text } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';

import { Overlay, OverlayProps } from '../../../../sharedComponents/overlay/Overlay';
import { useFormikContext } from 'formik';
import { Wine } from '../../../../types/wine';
import { AzureContext } from '../../../../azureApi/AzureContext';

// todo: getPermissions for none web https://docs.expo.io/versions/latest/sdk/imagepicker/

export function UploadImageView(props: UploadImageViewProps) {
  const { values: wine, setFieldValue } = useFormikContext<Wine>();
  const { manager } = useContext(AzureContext);
  const [ dataUri, setDataUri ] = useState('');

  useEffect(() => {
    console.log("hi from useEffect", dataUri, !props.isVisible);
    if (dataUri !== '' || !props.isVisible)
      return; 

    (async () => {
      const blobService = manager?.imageContainerClient.getBlobClient('wine.png'); 
      const blobClient = await blobService?.download();
      const blob = await blobClient?.blobBody;
      if (!blob)
        return;

      const fr = new FileReader();
      fr.onloadend = () => {
        console.log('image loaded');
        console.log(fr.result);
        setDataUri(fr.result as any)
      }
      fr.readAsDataURL(blob)
    })();
  }, [props.isVisible, dataUri, setDataUri]);

  const uploadImage = useCallback(async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 0,
    });

    if (result.cancelled)
      return;

    setFieldValue('image', result.uri);
    // setImageUri(result.uri);
  }, []);
  
  // todo: onclose upload image to azure and save wine.image
  
  return <Overlay {...props}>
    <View style={{alignItems: 'flex-start'}}>

      <Image
        key={dataUri /* without key a change in `imageUri` doesn't reload image */}
        style={{ width: 200, height: 200 }}
        source={{ uri: dataUri }}
        PlaceholderContent={<Text>...</Text>}
      />
      <Button
        containerStyle={style.button}
        title="Upload"
        onPress={uploadImage}
      />
      <Button
        containerStyle={style.button}
        title="Close"
        onPress={props.onBackdropPress}
      />
    </View>
  </Overlay>
}

type UploadImageViewProps = Omit<OverlayProps, 'children'>

const style = StyleSheet.create({
  button: {
    width: '100%',
    marginTop: 8,
  }
});
