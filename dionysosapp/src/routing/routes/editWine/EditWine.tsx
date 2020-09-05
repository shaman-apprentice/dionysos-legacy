import React, { useContext } from 'react';

import { useParams } from '../../router';
import { AzureContext } from '../../../azureApi/AzureContext';
import { Wine, Sweetness } from '../../../types/Wine';
import { WineForm } from './WineForm';

export default function EditWine() {
  const { wines } = useContext(AzureContext);

  const { RowKey } = useParams()

  const wine: Wine = wines[RowKey] || {
    RowKey: '-1',
    date: new Date().getTime(),
    rating: -1,
    color: 'red',
    sweetness: Sweetness['medium dry'],
  }

  return <WineForm wine={wine} />
}
