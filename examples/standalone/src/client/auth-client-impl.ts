import type { DepFactory } from '@depjack/core';
import type { AuthClient } from '~/standalone/client/auth-client';
import type { MyDeps } from '~/standalone/bootstrap/my-deps';
import type myDepsDefinition from '~/standalone/bootstrap/my-deps-definition';

export class AuthClientImpl implements AuthClient {
  getAccessToken(): Promise<string> {
    throw new Error('Not implemented.');
  }
}

export const factory: DepFactory<MyDeps, typeof myDepsDefinition, 'client.auth'> = () => {
  return Promise.resolve(new AuthClientImpl());
};
