import React, { useCallback, useState } from 'react';

import { useFormikContext } from 'formik';
import { Input } from 'react-native-elements';

import { Wine } from '../../../types/wine';
import { parseDate, formatDate } from '../../../utils/dateHelper';

export function FormWineDateField() {
  const { values: wine, setFieldValue, setFieldError, errors } = useFormikContext<Wine>();
  const [ userInput, setUserInput ] = useState(formatDate(wine.date));

  const handleChangeDate = useCallback(input => {
    setUserInput(input);

    try {
      setFieldValue('date', parseDate(input));
    } catch (error) {
      setFieldError('date', error.message);
    }
  }, [setUserInput]);

  return <Input 
    label="Date"
    value={userInput}
    onChangeText={handleChangeDate}
    errorMessage={(errors as any).date}
  />
}
