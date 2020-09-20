import { Wine, WineDict } from '../types/wine';
import { AzureManager } from './AzureManager';

export interface IAzureContext {
  isLoggedIn: boolean,
  login: (username: string, pw: string) => Promise<void>,
  manager: AzureManager | null;
  wines: WineDict;
  getWines: () => void;
  upsertWine: (wine: Wine, originalWine: Wine) => Promise<Wine>;
}
