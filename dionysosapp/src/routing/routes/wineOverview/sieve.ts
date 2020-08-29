import { Wine } from '../../../types/wine';
import { SortBy, SortableWineProps, FilterableWineProps, FilterBy } from './sieveView/sieveViewTypes';

const sortKeys: SortableWineProps[] = [ 'Timestamp','rating', 'price' ];
const filterKeys: FilterableWineProps[] = [ 'color', 'sweetness', 'area', 'grape' ];

export const sort = (wines: {[RowKey: string]: Wine}, sortBy: SortBy) =>
  Object.values(wines).sort((w1, w2) => {
    for (let key of sortKeys) {
      const isDescending = sortBy[key];

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
  })

export const filter = (wines: {[RowKey: string]: Wine}, filterBy: FilterBy) => 
  Object.keys(wines).reduce((acc, key) => {
    const wine = wines[key];
    for (let wineField of filterKeys) {
      const filterValue = filterBy[wineField].trim();
      if (filterValue !== '' && wine[wineField] !== filterValue.toLowerCase())
        return acc;
    }

    acc[key] = wine;
    return acc;
  }, {} as {[RowKey: string]: Wine});
