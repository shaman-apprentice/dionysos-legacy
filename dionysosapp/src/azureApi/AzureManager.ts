import { Wine, WineDict } from '../types/wine';

export class AzureManager {
  constructor(
    private tableHost: string,
    private tableSas: string,
    private imageHost: string,
    private imageSas: string,
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

    return new AzureManager(
      wineTableCredentials.host, wineTableCredentials.sas,
      imageBlobCredentials.host, imageBlobCredentials.sas,
      logout
    );
  }

  public async getWines() {
    const response = await fetch(`${this.tableHost}wines?${this.tableSas}`, {
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
    wine.PartitionKey = '1';
    if (wine.RowKey  === '-1')
      wine.RowKey  = String(new Date().getTime()); // npm's uuid is not supported by mobile devices, but this should be good enough

    if (wine.image && wine.image !== originalWine.image) {
      await this.uploadImage(wine.RowKey, wine.image);
      wine.image = wine.RowKey;
    } 

    const response = await fetch(`${this.tableHost}wines(PartitionKey='${wine.PartitionKey}',RowKey='${wine.RowKey}')?${this.tableSas}`, {
      method: 'MERGE',
      headers: {
        'Accept': 'application/json;odata=nometadata',
        'Access-Control-Allow-Origin': this.tableHost,
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

  public async downloadImage(name: string) {
    const response = await fetch(`${this.imageHost}/${name}?${this.imageSas}`);
    if (response.status !== 200)
      return ''

    const blob = await response.blob()

    return new Promise<string>(resolve => {
      const fr = new FileReader();
      fr.onloadend = () => {
        resolve(fr.result as string)
      }
      fr.readAsDataURL(blob)
    })
  }

  private async uploadImage(name: string, dataUri: string) {
    const blobImage = await (await fetch(dataUri)).blob()
    
    const response = await fetch(`${this.imageHost}/${name}?${this.imageSas}`, {
      method: 'PUT',
      headers: {
        'Content-Length': String(blobImage.size),
        'x-ms-blob-type': 'BlockBlob',
      },
      body: blobImage,
    });

  }
}
