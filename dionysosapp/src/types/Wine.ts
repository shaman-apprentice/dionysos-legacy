export type Sweetness = 'dry' | 'medium dry' | 'medium sweet' | 'sweet';

export type Wine = {
  PartitionKey: string,
  RowKey: string,
  Timestamp: number,
  sweetness: Sweetness,
  color: string,
  rating: number,
  area?: string,
  grape?: string,
  price?: string,
  brand?: string,
  comment?: string,
  image?: string, // href
}
