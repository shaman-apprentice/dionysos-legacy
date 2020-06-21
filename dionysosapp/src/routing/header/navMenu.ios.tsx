import React from 'react';

import Picker from 'react-native-picker-select'
import { FontAwesome5 } from '@expo/vector-icons';

import { withRouter } from '../router';
import { routeMapping } from '../routesMapping';

export default withRouter(function NavMenu(props) {
  return <Picker
    placeholder={{}}
    value={props.location.pathname}
    onValueChange={(itemValue, itemIndex) => {
      props.history.push(itemValue);
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
  });
