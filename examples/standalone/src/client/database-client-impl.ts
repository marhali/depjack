import type { DatabaseClient } from '~/examples/standalone/client/database-client';
import type { AuthClient } from '~/examples/standalone/client/auth-client';
import type { DepFactory } from '@depjack/core/factory';
import type { MyDeps } from '~/examples/standalone/bootstrap/my-deps';
import type myDepsDefinition from '~/examples/standalone/bootstrap/my-deps-definition';

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
