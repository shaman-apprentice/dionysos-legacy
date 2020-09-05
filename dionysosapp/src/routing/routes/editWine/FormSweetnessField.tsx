import React, { useCallback, useMemo } from 'react';

import { useFormikContext } from 'formik';
import Picker from 'react-native-picker-select'
import { Wine, Sweetness } from '../../../types/Wine';
import { Input } from 'react-native-elements';
import { Text, Platform } from 'react-native';

export function FormSweetnessField() {
  return <Input
    label="Sweetness"
    InputComponent={SweetnessDropdownWrapper}
  />
}

class SweetnessDropdownWrapper extends React.Component { // as Input's InputComponent needs an old react ref this must be a class
  render() {
    return <SweetnessDropdown />
  }
}

function SweetnessDropdown() {
  const { setFieldValue, values: wine } = useFormikContext<Wine>();
  const handleValueChange = useCallback(sweetness => {
    setFieldValue('sweetness', sweetness, false);
  }, []);
  
  const sweetnessItems = useMemo(() => Object.keys(Sweetness).map(sweetness => ({
    label: sweetness,
    value: sweetness,
  })), []);

  return <Picker
    style={{
      viewContainer: {
        flex: 1,
        marginTop: Platform.OS !=='android' ? 16 : 0
      }
    }}
    value={wine.sweetness}
    items={sweetnessItems}
    onValueChange={value => {
      handleValueChange(value);
    }}
  />
}
