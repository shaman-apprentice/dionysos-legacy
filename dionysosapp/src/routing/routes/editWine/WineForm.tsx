import React from 'react';

import { View, StyleSheet, Platform } from 'react-native';
import { Formik } from 'formik';
import { Button } from 'react-native-elements';

import { Wine } from '../../../types/wine';
import { FormTextField } from './FormTextField';
import { FormWineTimestampField } from './FormTimestampField';
import { FormSweetnessField } from './FormSweetnessField';

export function WineForm(props: { wine : Wine }) {
  return <View style={styles.form}>
    <Formik
      initialValues={props.wine}
      onSubmit={(wine, actions) => {
        console.log('submitting');
        console.log(actions);
        console.log(JSON.stringify(wine, null, 2));
      }}
    >
      {({ handleSubmit, values: wine }) => <>
        <FormWineTimestampField wine={wine} />
        <FormTextField wine={wine} wineField="color" />
        <FormTextField wine={wine} wineField="brand" />
        <FormSweetnessField wine={wine} />
        <Button
          containerStyle={{ paddingTop: 8, width: '100%' }}
          onPress={handleSubmit as any}
          title="Submit"
        />
      </>}
    </Formik>
  </View>
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    ...(Platform.OS === 'web'
      ? { alignItems: 'center', justifyContent: 'center', width: 400 }
      : { alignSelf: 'stretch'}
    ),
  },
});
