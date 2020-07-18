import React from 'react';
import { View } from 'react-native';
import { withRouter } from '../../router';
import { Table, Row } from 'react-native-table-component';

import { Wine } from '../../../types/wine';

import { wines } from './__mocks__/wines';

export default withRouter(function WineOverview(props: any) {
  return <View>
    <Table
      style={{ backgroundColor: '#f1f8ff' }}
      borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}
    >
      <Row
          textStyle={{ fontWeight: 'bold', textAlign: 'center' }}
          widthArr={headerEntry.map(entry => entry.width)}
          data={headerEntry.map(entry => entry.desc)}
      />
      {
        wines.map(wine => {
          const formattedWine = JSON.parse(JSON.stringify(wine));
          formattedWine.Timestamp = new Date(wine.Timestamp).toLocaleString('en-GB', { year: 'numeric', month: 'numeric', day: 'numeric' });
          
          return <Row
            key={formattedWine.RowKey}
            widthArr={headerEntry.map(entry => entry.width)}
            data={headerEntry.map(entry => formattedWine[entry.property])}
            onPress={() => props.history.push(`/edit-wine?key=${wine.RowKey}`)}
          />
        })
      }
    </Table>
  </View>
});

type HeaderEntry = { desc: string, property: keyof Wine, width: number }
const headerEntry: HeaderEntry[] = [
  { desc: 'Rating', property: 'rating', width: 50 },
  { desc: 'Color', property: 'color', width: 75 },
  { desc: 'Sweetness', property: 'sweetness', width: 100 },
  { desc: 'Date', property: 'Timestamp', width: 100 },
];
