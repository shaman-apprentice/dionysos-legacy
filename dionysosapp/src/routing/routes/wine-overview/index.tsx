import React, { useContext } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import { withRouter, RouteComponentProps } from '../../router';
import { AzureContext } from '../../../azure-api/AzureContext'
import WineRow from './WineRow';
import { Wine } from '../../../types/wine';

export default withRouter(function WineOverview(props: RouteComponentProps) {
  const { wines } = useContext(AzureContext);

  return <View style={styles.container}>
    <FlatList
      data={Object.values(wines)}
      keyExtractor={(wine: Wine) => wine.RowKey}
      renderItem={item => <WineRow
        item={item.item}
        pushHistory={props.history.push}
      />}
    />
  </View>
});

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30 },
});
