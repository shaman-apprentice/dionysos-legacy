export type Wine = {
  PartitionKey: string,
  RowKey: string,
  Timestamp: number,
  sweetness: 'dry' | 'medium dry' | 'medium sweet' | 'sweet',
  color: string,
  rating: number,
  area?: string,
  grape?: string,
  price?: string,
  brand?: string,
  comment?: string,
  image?: string, // href
}
