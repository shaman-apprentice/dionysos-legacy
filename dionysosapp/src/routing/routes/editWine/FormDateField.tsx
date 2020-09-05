import React, { useCallback, useState } from 'react';

import { useFormikContext } from 'formik';
import { Input } from 'react-native-elements';

import { Wine } from '../../../types/wine';
import { parseDate, formatDate } from '../../../utils/dateHelper';

export function FormWineDateField(props:  FormWineDateFieldProps) {
  const { handleBlur, setFieldValue, setFieldError, errors } = useFormikContext();
  const [ userInput, setUserInput ] = useState(formatDate(props.wine.date));

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
    onBlur={handleBlur('date')}
    errorMessage={(errors as any).date}
  />
}

interface FormWineDateFieldProps {
  wine: Wine,
}
