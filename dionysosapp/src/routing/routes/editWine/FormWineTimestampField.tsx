import React, { useCallback } from 'react';

import { useFormikContext } from 'formik';
import { Input } from 'react-native-elements';

import { Wine } from '../../../types/wine';
import { parseDate, formatDate } from '../../../utils/dateHelper';

export function FormWineTimestampField(props:  FormWineTimestampFieldProps) {
  const { handleBlur, setFieldValue, setFieldError, errors } = useFormikContext();

  const handleChangeDate = useCallback(input => {
    try {
      setFieldValue('Timestamp', parseDate(input));
    } catch (error) {
      setFieldError('Timestamp', 'date must have the form dd/mm/yyyy');
      setFieldValue('Timestamp', input, false);
    }
  }, []);

  return <Input 
    label="Timestamp"
    value={isNaN(props.wine.Timestamp)
      ? String(props.wine.Timestamp)
      : formatDate(props.wine.Timestamp)
    }
    onChangeText={handleChangeDate}
    onBlur={handleBlur('Timestamp')}
    errorMessage={(errors as any).Timestamp}
  />
}

interface FormWineTimestampFieldProps {
  wine: Wine,
}
