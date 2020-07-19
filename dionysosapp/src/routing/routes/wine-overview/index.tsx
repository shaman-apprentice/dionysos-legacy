import React from 'react';
import { View, ScrollView } from 'react-native';
import { Table, TableWrapper } from 'react-native-table-component';

import { wines } from './__mocks__/wines';
import WineTableHeader from './WineTableHeader';
import WineRows from './WineRows';

export default function WineOverview(props: any) {
  return <ScrollView horizontal={true}>
        <Table
          style={{ backgroundColor: '#f1f8ff' }}
          borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}
        >
          <WineTableHeader />
          <ScrollView>
            <WineRows wines={wines}/>
          </ScrollView>
        </Table>
  </ScrollView>
}

//         borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}
