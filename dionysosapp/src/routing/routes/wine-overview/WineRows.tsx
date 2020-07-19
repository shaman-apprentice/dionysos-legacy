import React from 'react';
import { Table, Row } from 'react-native-table-component';

import { withRouter, RouteComponentProps } from '../../router';

import { columnsDescs } from './WineColumns';
import { Wine } from '../../../types/wine';

export default withRouter(function WineRows(props: RouteComponentProps & { wines: Wine[] }) {
  return <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
    {
      props.wines.map(wine => {
        const formattedWine = JSON.parse(JSON.stringify(wine));
        formattedWine.Timestamp = new Date(wine.Timestamp).toLocaleString('en-GB', { year: 'numeric', month: 'numeric', day: 'numeric' });
        
        return <Row
          key={formattedWine.RowKey}
          widthArr={columnsDescs.map(wC => wC.width)}
          data={columnsDescs.map(wC => formattedWine[wC.property])}
          onPress={() => props.history.push(`/edit-wine?key=${wine.RowKey}`)}
        />
      })
    }
  </Table>
})
