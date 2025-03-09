import type { DepFactory } from '@depjack/core';
import type { DatabaseClient } from '~/standalone/client/database-client';
import type { AuthClient } from '~/standalone/client/auth-client';
import type { MyDeps } from '~/standalone/bootstrap/my-deps';
import type myDepsDefinition from '~/standalone/bootstrap/my-deps-definition';

export class DatabaseClientImpl implements DatabaseClient {
  constructor(private readonly authClient: AuthClient) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  execute<Payload, Response>(payload: Payload): Promise<Response> {
    throw new Error('Method not implemented.');
  }
}

export const factory: DepFactory<MyDeps, typeof myDepsDefinition, 'client.database'> = (needs) => {
  return Promise.resolve(new DatabaseClientImpl(needs['client.auth']));
};
