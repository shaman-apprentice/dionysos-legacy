import React, { useContext } from 'react';
import { Text } from 'react-native';

import { useParams } from '../../router';
import { AzureContext } from '../../../azure-api/AzureContext';
import { Wine } from '../../../types/wine';
import { WineForm } from './WineForm';

export default function EditWine() {
  const { wines } = useContext(AzureContext);

  const { RowKey } = useParams()

  const wine: Wine = wines[RowKey] ?? {
    PartitionKey: '1',
    RowKey: '-1',
    Timestamp: new Date().getTime(),
    rating: -1,
    color: 'red',
    sweetness: 'medium dry',
  }

  return <WineForm wine={wine} />
}