import { Wine } from '../types/wine';

export interface IAzureContext {
  isLoggedIn: boolean;
  login: (user: string, pw: string) => Promise<void | string>; // string in error case with error msg
  wines: {[RowKey: string]: Wine};
  saveWine: (wine: Wine) => Promise<void>;
}
