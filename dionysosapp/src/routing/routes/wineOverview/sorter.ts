import { Wine } from '../../../types/wine';
import { SortByState } from './filterView/filterViewTypes';
import { defaultContext as filterContext} from './filterView/FilterContext';

const keys = Object.keys(filterContext.sortByState);

// todo: unit tests
// todo: better type checking :D
export const sort = (wines: {[RowKey: string]: Wine}, sortByState: SortByState) => {
  return Object.values(wines).sort((w1, w2) => {
    for (let key of keys) {
      const isDescending = sortByState[key];

      if (isDescending) {
        if (w2[key] > w1[key])
          return 1;
        else if
          (w2[key] < w1[key])
          return -1;
      } else {
        if (w2[key] > w1[key])
          return -1;
        else if
          (w2[key] < w1[key])
          return 1;
      }
    }

    return 0;
  });
}
