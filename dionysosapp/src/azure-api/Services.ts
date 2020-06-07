import azStorage from 'azure-storage';

export interface IServices {
  tableService: azStorage.TableService | null,
  blobService: azStorage.BlobService | null,
}

export const createServices = (host: string, tableSAS: string): IServices => ({
  tableService: azStorage.createTableServiceWithSas(host, tableSAS),
  blobService: null,
});
