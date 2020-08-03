import React from 'react';

import { Picker } from 'react-native'

import { useLocation, useHistory } from '../router';
import { routeMapping } from '../routesMapping';

// todo fix this
export default function NavMenu() {
  const location = useLocation();
  const history = useHistory();

  console.log(JSON.stringify(location, null, 2))
  return <Picker
    style={{ height: 49, width: 150 }}
    mode="dropdown"
    selectedValue={location.pathname.includes('wine-overview')}
    onValueChange={(itemValue, itemIndex) => {
      history.push(itemValue);
    } }>
        <Picker.Item
          value="/wine-overview"
          label="View Wines"
        />
  </Picker>
}
