import React, { useCallback } from 'react';

import { useFormikContext } from 'formik';
import { Input } from 'react-native-elements';

import { Wine } from '../../../types/wine';

export function FormTextField(props:  FormTextFieldProps) {
  const { handleBlur, setFieldValue } = useFormikContext();
  const handleChangeText = useCallback(input => {
    setFieldValue(props.wineField, input, false);
  }, []);

  return <Input 
    label={props.wineField}
    value={String(props.wine[props.wineField] || '')}
    onChangeText={handleChangeText}
    onBlur={handleBlur(props.wineField)}
  />
}

interface FormTextFieldProps {
  wine: Wine,
  wineField: keyof Wine,
}
