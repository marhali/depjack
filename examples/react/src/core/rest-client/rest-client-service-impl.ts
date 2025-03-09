import type { DepFactory } from '@depjack/core';
import type { RestClientService } from '~/react/core/rest-client/rest-client-service';
import type { RootDeps } from '~/react/bootstrap/root-deps';
import type { EnvironmentService } from '~/react/core/environment/environment-service';
import type { AuthenticationService } from '~/react/core/authentication/authentication-service';
import type rootDepsDefinition from '~/react/bootstrap/root-deps-definition';
import sleep from '~/react/core/util/sleep';

export class RestClientServiceImpl implements RestClientService {
  constructor(
    private readonly environmentService: EnvironmentService,
    private readonly authenticationService: AuthenticationService,
  ) {}

  request(): Promise<unknown> {
    throw new Error('Method not implemented.');
  }
}

export const factory: DepFactory<RootDeps, typeof rootDepsDefinition, 'core.rest_client'> = async (needs) => {
  await sleep(3000);
  return new RestClientServiceImpl(needs['core.environment'], needs['core.authentication']);
};
