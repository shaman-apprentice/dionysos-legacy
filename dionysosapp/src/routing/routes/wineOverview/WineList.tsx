import React, { useContext, useMemo } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import { useHistory } from '../../router';
import { AzureContext } from '../../../azureApi/AzureContext'
import { Wine } from '../../../types/wine';
import WineRow from './WineRow';
import { FilterView } from './filterView/FilterView';
import { FilterContext } from './filterView/FilterContext';
import { sort } from './sorter';

export function WineList() {
  const { wines } = useContext(AzureContext);
  const { sortByState } = useContext(FilterContext);
  const history = useHistory();
  
  const wines2Display = useMemo(() => {
    return sort(wines, sortByState);
  }, [wines, sortByState])

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
