import React from 'react';

import Picker from 'react-native-picker-select'
import { FontAwesome5 } from '@expo/vector-icons';

import { useLocation, useHistory } from '../router';

import { navigationRoutes, getValueFromLocation, updateLocation } from './navigationRoutes';

export default function NavMenu() {
  const history = useHistory();
  const location = useLocation();

  return <Picker
    placeholder={{}}
    value={getValueFromLocation(location.pathname)}
    onValueChange={itemValue => {
      updateLocation(location.pathname, itemValue, history.push);
    } }
    items={navigationRoutes}
    Icon={() => <FontAwesome5 name="caret-down" size={16}/>}
    style={{
      inputIOS: {
        paddingRight: 16,
      },
    }}
  />
}
