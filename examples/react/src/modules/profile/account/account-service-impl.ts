import type { DepFactory } from '@depjack/core';
import type { AccountService } from '~/react/modules/profile/account/account-service';
import type { RestClientService } from '~/react/core/rest-client/rest-client-service';
import type { RootDeps } from '~/react/bootstrap/root-deps';
import type rootDepsDefinition from '~/react/bootstrap/root-deps-definition';

export class AccountServiceImpl implements AccountService {
  constructor(private readonly restClientService: RestClientService) {}

  getDisplayName(): Promise<string> {
    throw new Error('Method not implemented.');
  }

  getUsername(): Promise<string> {
    throw new Error('Method not implemented.');
  }

  setDisplayName(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export const factory: DepFactory<RootDeps, typeof rootDepsDefinition, 'profile.account'> = (needs) => {
  return Promise.resolve(new AccountServiceImpl(needs['core.rest_client']));
};
