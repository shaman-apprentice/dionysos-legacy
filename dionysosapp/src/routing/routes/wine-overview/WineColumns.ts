import { Wine } from '../../../types/wine';

type ColumnDesc =  {
  displayDesc: string,
  property: keyof Wine,
  width: number
}

export const columnsDescs: ColumnDesc[] = [
  { displayDesc: 'Rating', property: 'rating', width: 50 },
  { displayDesc: 'Color', property: 'color', width: 75 },
  { displayDesc: 'Sweetness', property: 'sweetness', width: 100 },
  { displayDesc: 'Date', property: 'Timestamp', width: 150 },
];
