import { Wine } from '../../../../types/wine';

export const wines: Wine[] = [
  {
    PartitionKey: '1',
    RowKey: '1',
    Timestamp: 1595059246710,
    rating: 5,
    color: 'red',
    sweetness: 'dry',
  },
  {
    PartitionKey: '1',
    RowKey: '2',
    Timestamp: 1595059246710,
    rating: 5,
    color: 'white',
    sweetness: 'medium sweet',
  },
]; 