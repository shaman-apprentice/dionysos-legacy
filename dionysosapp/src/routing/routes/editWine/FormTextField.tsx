import React from 'react';

import { useFormikContext } from 'formik';
import { Input } from 'react-native-elements';

import { Wine } from '../../../types/wine';

export function FormTextField(props:  FormTextFieldProps) {
  const { handleBlur, handleChange } = useFormikContext();
  return <Input 
    label={props.wineField}
    value={String(props.wine[props.wineField] || '')}
    onChangeText={handleChange(props.wineField)}
    onBlur={handleBlur(props.wineField)}
  />
}

interface FormTextFieldProps {
  wine: Wine,
  wineField: keyof Wine,
}
