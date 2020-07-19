import React from 'react';
import { Row, Cell, TableWrapper } from 'react-native-table-component';

import { columnsDescs } from './WineColumns';

export default function WineTableHeader() {
  return <Row widthArr={columnsDescs.map(cD => cD.width)} styles={{height: 80}}>
    <TableWrapper style={{ flexDirection: 'row' }}>
      {
        columnsDescs.map(cD => <Cell
          key={cD.property}
          style={{ borderWidth: 2, borderColor: '#c8e1ff' }}
          textStyle={{ fontWeight: 'bold', textAlign: 'center' }}
          data={cD.displayDesc}
        />)
      }
    </TableWrapper >
  </Row>
}

// data={columnsDescs.map(cD => cD.displayDesc)}