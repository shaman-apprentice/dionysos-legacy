import React, { useContext, useMemo, useState, useCallback } from 'react';
import { StyleSheet, View, FlatList, Platform } from 'react-native';

import { useHistory } from '../../router';
import { AzureContext } from '../../../azureApi/AzureContext'
import { Wine } from '../../../types/wine';
import WineRow from './WineRow';
import { SieveView } from './sieveView/SieveView';
import { SieveContext } from './sieveView/SieveContext';
import { sort, filter } from './sieve';
import { Button } from 'react-native-elements';

export function WineList() {
  const { wines, getWines } = useContext(AzureContext);
  const { sortBy, filterBy } = useContext(SieveContext);
  const [ isRefreshing, setIsRefreshing ] = useState(false);
  const history = useHistory();

  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    await getWines(); // todo: should be cancelable in case of site navigation
    setIsRefreshing(true);
  }, [getWines, setIsRefreshing]);
  
  const wines2Display = useMemo(() => {
    const filteredWines = filter(wines, filterBy);
    return sort(filteredWines, sortBy);
  }, [wines, sortBy, filterBy])

  return <View style={styles.container}>
    { Platform.OS === 'web' && <Button
      style={{ marginBottom: 4 }}
      disabled={isRefreshing}
      title="Refresh"
      onPress={refresh}
    />}
    <FlatList
      ListHeaderComponent={SieveView}
      data={wines2Display}
      keyExtractor={(wine: Wine) => wine.RowKey}
      renderItem={item => <WineRow
        item={item.item}
        pushHistory={history.push}
      />}
      refreshing={isRefreshing}
      onRefresh={refresh}
    />
  </View>
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
