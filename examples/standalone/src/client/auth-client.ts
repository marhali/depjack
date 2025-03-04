export interface AuthClient {
  getAccessToken: () => Promise<string>;
}
