import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { Camera } from 'expo-camera';
import { useFormikContext } from 'formik';

import { requestCamera, takePhoto as takePhotoHelper } from './cameraHelper';

export function CameraView(props: CameraViewProps) {
  const camera = useRef<Camera|null>(null);
  const [ hasCameraPermission, setHasCameraPermission ] = useState(false);
  const [ isCameraReady, setIsCameraReady ] = useState(false);
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    if (hasCameraPermission || !props.isVisible)
      return;

    requestCamera()
      .then(setHasCameraPermission);
  }, [hasCameraPermission, props.isVisible])

  const takePhoto = useCallback(async () => {
    setFieldValue('image', await takePhotoHelper(camera.current!)); // take photo button is disabled, until the camera is ready, so this is fine
    props.close();
  }, [camera]);

  if (!props.isVisible)
    return null;

  return <View style={{ flex: 1 }}>
    <Camera
      style={{ flex: 1, maxWidth: 400 }}
      type={Camera.Constants.Type.back}
      ref={camera}
      onCameraReady={() => { setIsCameraReady(true); }}
    >
      { !hasCameraPermission && <Text>Camera not available.</Text> }
      <View
          style={styles.cameraButtonRow}>
          <Button
            containerStyle={{ width: '40%', marginRight: 4 }}
            title="Close"
            onPress={props.close as any}
          />
          <Button
            containerStyle={{ width: '40%', marginLeft: 4 }}
            title="Take"
            disabled={!isCameraReady}
            onPress={takePhoto as any}
          />
        </View>
    </Camera>
  </View>
}

type CameraViewProps = {
  isVisible: boolean,
  close: Function,
}

const styles = StyleSheet.create({
  cameraButtonRow: {
    flex: 1,
    marginBottom: 8,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
