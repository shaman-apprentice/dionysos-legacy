export interface IAzureContext {
  isLoggedIn: boolean,
  login: (user: string, pw: string) => Promise<void | string>, // string in error case with error msg
  // saveWine: (wine: Wine) => Promise<void | string> // todo use an error object like thing instead of `void | string`
}
