import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';

import { Wine } from '../../../types/wine';

import { wines } from './__mocks__/wines';

export default function WineOverview() {
  return <View>
    <Text h2>Wines:</Text>
    <Table
      style={{ backgroundColor: '#f1f8ff' }}
      borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}
    >
      <Row
          textStyle={{ fontWeight: 'bold', textAlign: 'center' }}
          widthArr={headerEntry.map(entry => entry.width)}
          data={headerEntry.map(entry => entry.desc)}
      />
      <Rows 
        textStyle={{ marginLeft: 5, marginTop: 5, marginBottom: 5 }}
        widthArr={headerEntry.map(entry => entry.width)}
        data={wines.map(wine => {
          const formattedWine = JSON.parse(JSON.stringify(wine));
          formattedWine.Timestamp = new Date(wine.Timestamp).toLocaleString('en-GB', { year: 'numeric', month: 'numeric', day: 'numeric' });
          return headerEntry.map(entry => formattedWine[entry.property])
        })}
      />
    </Table>
  </View>
}

type HeaderEntry = { desc: string, property: keyof Wine, width: number }
const headerEntry: HeaderEntry[] = [
  { desc: 'Rating', property: 'rating', width: 50 },
  { desc: 'Color', property: 'color', width: 75 },
  { desc: 'Sweetness', property: 'sweetness', width: 100 },
  { desc: 'Date', property: 'Timestamp', width: 100 },
];
