import React, { useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Image, Text } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';

import { Overlay, OverlayProps } from '../../../../sharedComponents/overlay/Overlay';
import { useFormikContext } from 'formik';
import { Wine } from '../../../../types/wine';
import { CameraView } from './CameraView';

export function UploadImageView(props: UploadImageViewProps) {
  const { values: wine, setFieldValue } = useFormikContext<Wine>();
  const [ showCameraView, setShowCameraView ] = useState(false);

  const loadImageFromDisk = useCallback(async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 0,
    });

    if (result.cancelled)
      return;

    setFieldValue('image', result.uri);
  }, []);

  const closeCameraView = useCallback(() => {
    setShowCameraView(false);
  }, [setShowCameraView]);
  
  return <Overlay {...props}>
    <View style={{alignItems: 'flex-start'}}>
      <Image
        key={wine.image /* without key a change in `imageUri` doesn't reload image */}
        style={{ width: 250, height: 250 }}
        source={{ uri: wine.image }}
        PlaceholderContent={<Text>...</Text>}
      />
      <View style={styles.uploadRow}>
        <Button
          containerStyle={{ flexGrow: 1, marginRight: 8 }}
          title="From disk"
          onPress={loadImageFromDisk}
        />
        <Button
          containerStyle={{ flexGrow: 1 }}
          title="Take photo"
          onPress={() => setShowCameraView(true)}
        />
      </View>

      <Button
        containerStyle={styles.closeButton}
        title="Close"
        onPress={props.onBackdropPress}
      />
      <Overlay
        isVisible={showCameraView}
        onBackdropPress={closeCameraView}
        fullScreen
      >
        <CameraView
          isVisible={showCameraView}
          close={closeCameraView}
        />
      </Overlay>
    </View>
  </Overlay>
}

type UploadImageViewProps = Omit<OverlayProps, 'children'>

const styles = StyleSheet.create({
  closeButton: {
    width: '100%',
    marginTop: 8,
  },
  uploadRow: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    marginTop: 8,
  },
});
