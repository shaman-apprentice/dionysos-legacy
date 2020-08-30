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
        'Accept': 'application/json;odata=nometadata'
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
}
