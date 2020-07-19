import React from 'react';
import { Row } from 'react-native-table-component';

import { columnsDescs } from './WineColumns';

export default function WineTableHeader() {
  return <Row
    textStyle={{ fontWeight: 'bold', textAlign: 'center' }}
    widthArr={columnsDescs.map(cD => cD.width)}
    data={columnsDescs.map(cD => cD.displayDesc)}
  />
}
