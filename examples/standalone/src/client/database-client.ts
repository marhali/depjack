export interface DatabaseClient {
  execute: <Payload, Response>(payload: Payload) => Promise<Response>;
}
