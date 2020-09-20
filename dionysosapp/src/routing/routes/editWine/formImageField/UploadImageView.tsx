import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Image, Text } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';

import { Overlay, OverlayProps } from '../../../../sharedComponents/overlay/Overlay';
import { useFormikContext } from 'formik';
import { Wine } from '../../../../types/wine';

// todo: getPermissions for none web https://docs.expo.io/versions/latest/sdk/imagepicker/

export function UploadImageView(props: UploadImageViewProps) {
  const { values: wine, setFieldValue } = useFormikContext<Wine>();

  const uploadImage = useCallback(async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 0,
    });

    if (result.cancelled)
      return;

      setFieldValue('image', result.uri);
  }, []);
  
  return <Overlay {...props}>
    <View style={{alignItems: 'flex-start'}}>

      <Image
        key={wine.image /* without key a change in `imageUri` doesn't reload image */}
        style={{ width: 200, height: 200 }}
        source={{ uri: wine.image }}
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
