import React, { useCallback, useState } from 'react';

import { useFormikContext } from 'formik';
import { Input } from 'react-native-elements';

import { Wine } from '../../../types/wine';

export function FormNumberField(props:  FormNumberFieldProps) {
  const { values: wine, setFieldValue, setFieldError, errors } = useFormikContext<Wine>();
  const [ displayValue, setDisplayValue ] = useState(wine[props.wineField] === undefined
    ? ''
    : String(wine[props.wineField])
  );

  const handleChangeNumber = useCallback((input: any) => {
    setDisplayValue(input);

    if (input === '') {
      setFieldValue(props.wineField, undefined);
      return;
    }

    const n = Number(input);
    if (!isNaN(n)) {
      setFieldValue(props.wineField, n);
      return;
    }

    setFieldError(props.wineField, 'not a valid number');
  }, []);

  return <Input 
    label={props.wineField}
    value={displayValue}
    onChangeText={handleChangeNumber}
    errorMessage={(errors as any)[props.wineField]}
  />
}

interface FormNumberFieldProps {
  wineField: keyof Wine,
}
