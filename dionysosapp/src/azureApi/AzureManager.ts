import { ContainerClient } from '@azure/storage-blob';
import { Wine, WineDict } from '../types/wine';

export class AzureManager {
  constructor(
    private host: string,
    private sas: string,
    public imageContainerClient: ContainerClient,
    private logout: Function
  ) {}

  public static async login(username: string, pw: string, logout: Function) {
    const loginResponse = await fetch('https://dionysos-waiter.azurewebsites.net/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ username, pw }),
    });

    if (loginResponse.status !== 200)
      throw new Error(await loginResponse.text());
  
    const { imageBlobCredentials, wineTableCredentials } = await loginResponse.json();
    const cC = new ContainerClient(`${imageBlobCredentials.host}?${imageBlobCredentials.sas}`);

    return new AzureManager(wineTableCredentials.host, wineTableCredentials.sas, cC, logout);
  }

  public async getWines() {
    const response = await fetch(`${this.host}wines?${this.sas}`, {
      headers: {
        'Accept': 'application/json;odata=nometadata',
      },
    });
    
    if (response.status !== 200) { // todo better error handling for cases like timeout or whatever
      this.logout();
      throw new Error(await response.text());
    }

    const { value } = await response.json();
    const wines = value as Wine[];
    return wines.reduce((acc, wine) => {
      acc[wine.RowKey] = wine;
      return acc;
    }, {} as WineDict);
  }

  public async upsert(wine: Wine, originalWine: Wine): Promise<Wine> {
    if (wine.image !== originalWine.image) {
      console.log("have to change image");
    } else {
      console.log("no change image");
    }

    return wine;

    wine.PartitionKey = '1';
    if (wine.RowKey  === '-1')
      wine.RowKey  = String(new Date().getTime()); // npm's uuid is not supported by mobile devices, but this should be good enough

    const response = await fetch(`${this.host}wines(PartitionKey='${wine.PartitionKey}',RowKey='${wine.RowKey}')?${this.sas}`, {
      method: 'MERGE',
      headers: {
        'Accept': 'application/json;odata=nometadata',
        'Access-Control-Allow-Origin': this.host,
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(wine),
    });

    if (response.status !== 204) {
      this.logout();
      throw new Error(await response.text()); // todo better error handling for cases like timeout or whatever
    }

    return wine;
  }
}
