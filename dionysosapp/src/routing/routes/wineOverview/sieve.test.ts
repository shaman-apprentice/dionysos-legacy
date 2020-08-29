import { Wine, Sweetness } from '../../../types/wine';
import { sort, filter } from './sieve';

const wines: {[RowKey: string]: Wine} = {
  '1': {
    PartitionKey: '1',
    RowKey: '1',
    price: 2,
    Timestamp: 1595059246710,
    color: 'white',
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

it('filters out by color', () => {
  const filtered = filter(wines, { area: '', color: 'red', sweetness: '', grape: '' });
  const remainingWines = Object.values(filtered)
  expect(remainingWines.length).toBe(1);
  expect(remainingWines[0].color).toBe('red');
});

it('filters case insensitive', () => {
  const filtered = filter(wines, { area: '', color: 'Red', sweetness: '', grape: '' });
  const remainingWines = Object.values(filtered)
  expect(remainingWines.length).toBe(1);
  expect(remainingWines[0].color).toBe('red');
});
