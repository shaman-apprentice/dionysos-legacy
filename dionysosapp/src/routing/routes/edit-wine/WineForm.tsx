import React from 'react';

import { Formik } from 'formik';
import { Input, Button } from 'react-native-elements';

import { Wine } from '../../../types/wine';

export const WineForm = (props: { wine : Wine }) => {
  return <Formik
    initialValues={props.wine}
    onSubmit={(wine, actions) => {
      console.log('submitting');
      console.log(actions);
      console.log(JSON.stringify(wine, null, 2));
    }}
  >
    {({ handleChange, handleBlur, handleSubmit, values: wine }) => <>
      <Input
        value={wine.brand}
        onChangeText={handleChange('brand')}
        onBlur={handleBlur('brand')}
      />
      <Button onPress={handleSubmit as any} title="Submit" />
    </>}
  </Formik>
}