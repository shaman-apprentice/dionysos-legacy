import React from 'react';

import Picker from 'react-native-picker-select'
import { FontAwesome5 } from '@expo/vector-icons';

import { useLocation, useHistory } from '../router';
import { routeMapping } from '../routesMapping';

export default function NavMenu() {
  const history = useHistory();
  const location = useLocation();

  return <Picker
    placeholder={{}}
    value={location.pathname}
    onValueChange={(itemValue, itemIndex) => {
      history.push(itemValue);
    } }
    items={Object.entries(routeMapping).map(([path, desc]) =>
      ({ label: desc.label, value: path})
    ) }
    Icon={() => <FontAwesome5 name="caret-down" size={16}/>}
    style={{
      inputIOS: {
        paddingRight: 16,
      },
    }}
  />
}
