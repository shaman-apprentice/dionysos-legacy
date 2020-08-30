import { Wine } from '../types/wine';

export class AzureManager {
  constructor(
    private host: string,
    private sas: string,
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
  
    const { host, sas } = await loginResponse.json();
    return new AzureManager(host, sas, logout);
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
    }, {} as {[RowKey: string]: Wine});
  }

  public async insertWine(wine: Wine): Promise<Wine> {
    wine.PartitionKey = '1';
    wine.RowKey = String(new Date().getTime()); // npm's uuid is not supported by mobile devices, but this should be good enough
    const response = await fetch(`${this.host}wines?${this.sas}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json;odata=nometadata',
        'Access-Control-Allow-Origin': this.host,
        'Preference-Applied': 'return-content',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(wine),
    });

    if (response.status !== 201)
      throw new Error(await response.text());

    return await response.json();
  }
}
