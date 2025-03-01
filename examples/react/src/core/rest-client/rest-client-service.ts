export interface RestClientService {
  request: (method: string, url: string, body?: unknown) => Promise<unknown>;
}
