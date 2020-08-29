import React, { useContext, useMemo } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import { useHistory } from '../../router';
import { AzureContext } from '../../../azureApi/AzureContext'
import { Wine } from '../../../types/wine';
import WineRow from './WineRow';
import { SieveView } from './sieveView/SieveView';
import { SieveContext } from './sieveView/SieveContext';
import { sort, filter } from './sieve';

export function WineList() {
  const { wines } = useContext(AzureContext);
  const { sortBy, filterBy } = useContext(SieveContext);
  const history = useHistory();
  
  const wines2Display = useMemo(() => {
    const filteredWines = filter(wines, filterBy);
    return sort(filteredWines, sortBy);
  }, [wines, sortBy, filterBy])

  return <View style={styles.container}>
    <FlatList
      ListHeaderComponent={SieveView}
      data={wines2Display}
      keyExtractor={(wine: Wine) => wine.RowKey}
      renderItem={item => <WineRow
        item={item.item}
        pushHistory={history.push}
      />}
    />
  </View>
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
