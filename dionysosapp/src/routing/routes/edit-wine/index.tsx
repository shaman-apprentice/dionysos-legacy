import React, { useContext } from 'react';
import { Text } from 'react-native';

import { useParams } from '../../router';
import { AzureContext } from '../../../azure-api/AzureContext';
import { Wine } from '../../../types/wine';

export default function EditWine() {
  const { wines } = useContext(AzureContext);

  const { RowKey } = useParams()
  console.log('RowKey:', RowKey);
  console.log('Wines:', wines[RowKey] );
  const wine: Wine = wines[RowKey] ?? {
    PartitionKey: '1',
    RowKey: '-1',
    Timestamp: new Date().getTime(),
    rating: -1,
    color: 'red',
    sweetness: 'medium dry',
  }

  return <Text>{JSON.stringify(wine, null, 2)}</Text>
}