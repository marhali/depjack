import type { AuthClient } from '~/examples/standalone/client/auth-client';
import type { DepFactory } from '@depjack/core/factory';
import type { MyDeps } from '~/examples/standalone/bootstrap/my-deps';
import type myDepsDefinition from '~/examples/standalone/bootstrap/my-deps-definition';

export class AuthClientImpl implements AuthClient {
  getAccessToken(): Promise<string> {
    throw new Error('Not implemented.');
  }
}

export const factory: DepFactory<MyDeps, typeof myDepsDefinition, 'client.auth'> = () => {
  return Promise.resolve(new AuthClientImpl());
};
