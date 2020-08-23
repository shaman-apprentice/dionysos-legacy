export enum Sweetness {
  'dry' = 'dry',
  'medium dry' = 'medium dry',
  'medium sweet' = 'medium sweet',
  'sweet' = 'sweet',
};

export type Wine = {
  PartitionKey: string,
  RowKey: string,
  Timestamp: number,
  sweetness: Sweetness,
  color: string,
  rating: number,
  area?: string,
  grape?: string,
  price?: number,
  brand?: string,
  vintage?: number,
  comment?: string,
  image?: string, // href
}
