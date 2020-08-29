import React, { useContext, useMemo } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import { useHistory } from '../../router';
import { AzureContext } from '../../../azureApi/AzureContext'
import { Wine } from '../../../types/wine';
import WineRow from './WineRow';
import { FilterView } from './sieveView/FilterView';
import { SieveContext } from './sieveView/SieveContext';
import { sort } from './sorter';

export function WineList() {
  const { wines } = useContext(AzureContext);
  const { sortBy } = useContext(SieveContext);
  const history = useHistory();
  
  const wines2Display = useMemo(() => {
    return sort(wines, sortBy);
  }, [wines, sortBy])

  return <View style={styles.container}>
    <FlatList
      ListHeaderComponent={FilterView}
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
