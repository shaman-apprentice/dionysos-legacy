import React, { useContext } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import { useHistory } from '../../router';
import { AzureContext } from '../../../azureApi/AzureContext'
import WineRow from './WineRow';
import { Wine } from '../../../types/wine';

export default function WineOverview() {
  const { wines } = useContext(AzureContext);
  const history = useHistory();

  return <View style={styles.container}>
    <FlatList
      data={Object.values(wines)}
      keyExtractor={(wine: Wine) => wine.RowKey}
      renderItem={item => <WineRow
        item={item.item}
        pushHistory={history.push}
      />}
    />
  </View>
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30 },
});
