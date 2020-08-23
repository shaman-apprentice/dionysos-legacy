import { Wine, Sweetness } from '../../../types/wine';
import { sort } from './sorter';

const wines: {[RowKey: string]: Wine} = {
  '1': {
    PartitionKey: '1',
    RowKey: '1',
    price: 2,
    Timestamp: 1595059246710,
    color: 'red',
    sweetness: Sweetness.dry,
    rating: 5,
  },
  '2': {
    PartitionKey: '1',
    RowKey: '2',
    price: 12,
    Timestamp: 1595059246710,
    color: 'red',
    sweetness: Sweetness.dry,
    rating: 5,
  },
}

it('sorts one digit price before 2 digit price', () => {
  const sorted = sort(wines, {Timestamp: true,price: true, rating: true});
  expect(sorted[0].RowKey).toBe('2');
  expect(sorted[1].RowKey).toBe('1');
});
