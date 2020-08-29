import { Wine } from '../../../types/wine';
import { SortBy, SortableWineProps } from './sieveView/sieveViewTypes';

const keys: SortableWineProps[] = [
  'Timestamp',
  'rating',
  'price',
];

export const sort = (wines: {[RowKey: string]: Wine}, sortByState: SortBy) => {
  return Object.values(wines).sort((w1, w2) => {
    for (let key of keys) {
      const isDescending = sortByState[key];

      if (w1[key] === undefined || w2[key] === undefined)
        continue;

      if (isDescending) {
        if (w2[key]! > w1[key]!)
          return 1;
        else if
          (w2[key]! < w1[key]!)
          return -1;
      } else {
        if (w2[key]! > w1[key]!)
          return -1;
        else if
          (w2[key]! < w1[key]!)
          return 1;
      }
    }

    return 0;
  });
}
