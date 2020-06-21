import React, { useCallback, useState } from 'react';
import { Picker } from 'react-native'

import { withRouter } from '../router';
import { routeMapping } from '../routesMapping';

export default withRouter(function NavMenu(props) {
  return <Picker
    style={{ height: 50, width: 100 }}
    selectedValue={props.location.pathname}
    onValueChange={(itemValue, itemIndex) => {
      props.history.push(itemValue);
    } }>
      {
        Object.entries(routeMapping).map(([path, desc]) =>
          <Picker.Item
            key={path}
            value={path}
            label={desc.label}
          />
        )
      }
  </Picker>
});
