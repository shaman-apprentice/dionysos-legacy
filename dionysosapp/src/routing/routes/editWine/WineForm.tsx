import React, { useMemo } from 'react';

import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { Button } from 'react-native-elements';

import { Wine } from '../../../types/wine';
import { FormTextField } from './FormTextField';
import { FormWineTimestampField } from './FormWineTimestampField';

export function WineForm(props: { wine : Wine }) {
  const tmpWine = useMemo(() =>
    JSON.parse(JSON.stringify(props.wine))
  , [props.wine]);

  return <View style={styles.form}>
    <Formik
      initialValues={tmpWine}
      onSubmit={(wine, actions) => {
        console.log('submitting');
        console.log(actions);
        console.log(JSON.stringify(wine, null, 2));
      }}
    >
      {({ handleSubmit, values: wine }) => <>
        <FormWineTimestampField wine={wine} />
        <FormTextField wine={wine} wineField="brand" />
        <Button onPress={handleSubmit as any} title="Submit" />
      </>}
    </Formik>
  </View>
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 1024,
  }
});
