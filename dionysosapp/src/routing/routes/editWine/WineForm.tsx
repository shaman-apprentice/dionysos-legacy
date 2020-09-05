import React, { useContext } from 'react';

import { ScrollView, View, StyleSheet, Platform } from 'react-native';
import { Formik } from 'formik';
import { Button } from 'react-native-elements';

import { Wine } from '../../../types/wine';
import { AzureContext } from '../../../azureApi/AzureContext';
import { FormTextField } from './FormTextField';
import { FormWineTimestampField } from './FormTimestampField';
import { FormSweetnessField } from './FormSweetnessField';
import { FormNumberField } from './FormNumberField';

export function WineForm(props: { wine : Wine }) {
  const { saveWine } = useContext(AzureContext);

  return <View style={styles.form}>
    <Formik
      initialValues={props.wine}
      onSubmit={async (wine, actions) => {
        await saveWine(wine);
      }}
    >
      {({ handleSubmit, values: wine, isSubmitting }) => <ScrollView>
        <FormWineTimestampField wine={wine} />
        <FormTextField wine={wine} wineField="color" />
        <FormSweetnessField wine={wine} />
        <FormTextField wine={wine} wineField="area" />
        <FormTextField wine={wine} wineField="grape" />
        <FormNumberField wine={wine} wineField="vintage" />
        <FormNumberField wine={wine} wineField="price" />
        <FormTextField wine={wine} wineField="brand" />
        <FormTextField wine={wine} wineField="comment" />
        <FormNumberField wine={wine} wineField="rating" />
        <Button
          containerStyle={{ paddingTop: 8, width: '100%' }}
          title="Submit"
          onPress={handleSubmit as any}
          disabled={isSubmitting}
        />
      </ScrollView>}
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
