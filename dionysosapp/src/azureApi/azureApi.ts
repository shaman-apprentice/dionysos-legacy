import { IAzureServices } from './IAzureServices';
import { Wine } from '../types/wine';
import { wines } from './wines';

export const createAzureServices = async (user: string, pw: string): Promise<IAzureServices> => {
  const response = await getAzureCredentials(user, pw); 
  if (response.status !== 200)
    throw new Error(await response.text());

  const { host, sas } = await response.json();
  return {
    tableService: null,  
    blobService: null,
  }
}

export const saveWine = async (azureServices: any, wine: Wine) => {
  return wine;
}

export const loadWines = async (createAzureServices: any) => {
  console.log(wines)
  return wines;
}

const getAzureCredentials = (user: string, pw: string) =>
  fetch('https://dionysos-waiter.azurewebsites.net/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ username: user, pw }),
  });
