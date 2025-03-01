import type { DepFactory } from '@depjack/core/factory';
import type { AccountService } from '~/examples/react/modules/profile/account/account-service';
import type { RestClientService } from '~/examples/react/core/rest-client/rest-client-service';
import type { RootDeps } from '~/examples/react/bootstrap/root-deps';
import type rootDepsDefinition from '~/examples/react/bootstrap/root-deps-definition';

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
