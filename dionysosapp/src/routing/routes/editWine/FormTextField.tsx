import React, { useCallback } from 'react';

import { useFormikContext } from 'formik';
import { Input } from 'react-native-elements';

import { Wine } from '../../../types/wine';

export function FormTextField(props:  FormTextFieldProps) {
  const { setFieldValue, values: wine } = useFormikContext<Wine>();
  const handleChangeText = useCallback(input => {
    setFieldValue(props.wineField, input, false);
  }, []);

  return <Input 
    label={props.wineField}
    value={String(wine[props.wineField] || '')}
    onChangeText={handleChangeText}
  />
}

interface FormTextFieldProps {
  wineField: keyof Wine,
}
