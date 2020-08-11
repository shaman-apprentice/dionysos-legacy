import React from 'react';

import { Picker } from 'react-native'

import { useLocation, useHistory } from '../router';
import { navigationRoutes, getValueFromLocation, updateLocation } from './navigationRoutes';

export default function NavMenu() {
  const location = useLocation();
  const history = useHistory();

  return <Picker
    style={{ height: 49, width: 150 }}
    mode="dropdown"
    selectedValue={getValueFromLocation(location.pathname)}
    onValueChange={itemValue => {
      updateLocation(location.pathname, itemValue, history.push);
    } }>
      {
        navigationRoutes.map(navRoute =>
          <Picker.Item
            key={navRoute.value}
            label={navRoute.label}
            value={navRoute.value}
          />
        )
      }
  </Picker>
}
