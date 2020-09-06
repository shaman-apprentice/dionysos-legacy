import React, { useContext } from 'react';

import { ScrollView, View, StyleSheet, Platform } from 'react-native';
import { Formik } from 'formik';
import { Button } from 'react-native-elements';

import { Wine } from '../../../types/wine';
import { AzureContext } from '../../../azureApi/AzureContext';
import { FormTextField } from './FormTextField';
import { FormWineDateField } from './FormDateField';
import { FormSweetnessField } from './FormSweetnessField';
import { FormNumberField } from './FormNumberField';

export function WineForm(props: { wine : Wine }) {
  const { upsertWine } = useContext(AzureContext);

  return <View style={styles.form}>
    <Formik
      initialValues={props.wine}
      onSubmit={(wine, actions) => upsertWine(wine) }
    >
      {({ handleSubmit, values: wine, isSubmitting, isValid, dirty }) => <ScrollView>
        <FormWineDateField />
        <FormTextField wineField="color" />
        <FormSweetnessField />
        <FormTextField wineField="area" />
        <FormTextField wineField="grape" />
        <FormNumberField wineField="vintage" />
        <FormNumberField wineField="price" />
        <FormTextField wineField="brand" />
        <FormTextField wineField="comment" />
        <FormNumberField wineField="rating" />
        <Button
          containerStyle={{ paddingTop: 8, width: '100%' }}
          title="Submit"
          onPress={handleSubmit as any}
          disabled={isSubmitting || !isValid || !dirty}
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
