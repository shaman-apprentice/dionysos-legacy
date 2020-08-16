import React, { useCallback } from 'react';

import { useFormikContext } from 'formik';
import Picker from 'react-native-picker-select'
import { Wine, Sweetness } from '../../../types/Wine';

export function FormSweetnessField(props:  FormSweetnessFieldProps) {
  const { setFieldValue } = useFormikContext();
  const handleValueChange = useCallback(sweetness => {
    setFieldValue('sweetness', sweetness, false);
  }, []);

  // todo: Add label
  return <Picker
    style={{
      viewContainer: { paddingLeft: 8 },
    }}
    value={props.wine.sweetness}
    items={sweetnessItems}
    onValueChange={value => {
      handleValueChange(value);
    }} />
}

interface FormSweetnessFieldProps {
  wine: Wine,
}

const sweetnessItems = Object.keys(Sweetness).map(sweetness => ({
  label: sweetness,
  value: sweetness,
}));
