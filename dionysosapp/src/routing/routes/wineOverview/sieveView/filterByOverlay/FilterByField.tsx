import React, { useContext, useCallback } from 'react';

import { Input } from 'react-native-elements';

import { SieveContext } from '../SieveContext';
import { FilterableWineProps } from '../sieveViewTypes';

export function FilterByField(props: SortByFieldProps) {
  const { filterBy, updateFilterBy } = useContext(SieveContext);
  const setValue = useCallback((value: string) => {
    updateFilterBy(props.field, value);
  }, [updateFilterBy]);

  return <Input
    label={props.field}
    placeholder=" = ?"
    value={filterBy[props.field]}
    onChangeText={setValue}
  />
}

interface SortByFieldProps {
  field: FilterableWineProps,
}
