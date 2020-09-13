import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useFormikContext } from 'formik';
import { Wine } from '../../../../types/wine';
import { ShowImageView } from './ShowImageView';
import { UploadImageView } from './UploadImageView';

export function FormImageField() {
  return <Input
    label="Image"
    InputComponent={WineImageRowWrapper}
  />
}

class WineImageRowWrapper extends React.Component { // as Input's InputComponent needs an old react ref this must be a class
  render() {
    return <WineImageRow />
  }
}

function WineImageRow() {
  const { values: wine } = useFormikContext<Wine>();
  const [ showImage, setShowImage ] = useState(false);
  const [ showUpload, setShowUpload ] = useState(false);

  return <View style={styles.container}>
    <Button
      title="Show"
      disabled={!Boolean(wine.image)}
      containerStyle={styles.button}
      onPress={() => { setShowImage(true); }}
    />
    <Button
      title="Upload"
      containerStyle={styles.button}
      onPress={() => { setShowUpload(true); }}
    />

    <ShowImageView
      isVisible={showImage}
      onBackdropPress={() => { setShowImage(false); }}
    />
    <UploadImageView
      isVisible={showUpload}
      onBackdropPress={() => { setShowUpload(false); }}
    />
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 8,
  }, 
  button: {
    flexGrow: 1,
    borderRadius: 8,
    marginTop: 8,
    marginRight: 8,
  },
});