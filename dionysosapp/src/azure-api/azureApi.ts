// import azStorage from 'azure-storage';
import { IAzureServices } from './IAzureServices';

export const createAzureServices = async (user: string, pw: string): Promise<IAzureServices> => {
  const response = await getAzureCredentials(user, pw); 
  if (response.status !== 200)
    throw new Error(await response.text());

  const { host, sas } = await response.json();
  return {
    tableService: null,  // azStorage.createTableServiceWithSas(host, sas),
    blobService: null,
  }
}

const getAzureCredentials = (user: string, pw: string) =>
  fetch('https://dionysos-waiter.azurewebsites.net/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ username: user, pw }),
  });
