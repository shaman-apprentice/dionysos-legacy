import azStorage from 'azure-storage';

export interface IServices {
  tableService: azStorage.TableService | null | 'todo',
  blobService: azStorage.BlobService | null,
}

// todo see https://github.com/Azure/azure-storage-node/issues/646
export const createServices = (host: string, tableSAS: string): IServices => ({
  tableService: 'todo', // azStorage.createTableServiceWithSas(host, tableSAS),
  blobService: null,
});
