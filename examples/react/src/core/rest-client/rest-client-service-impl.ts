import type { DepFactory } from '@depjack/core/factory';
import type { RestClientService } from '~/examples/react/core/rest-client/rest-client-service';
import type { RootDeps } from '~/examples/react/bootstrap/root-deps';
import type { EnvironmentService } from '~/examples/react/core/environment/environment-service';
import type { AuthenticationService } from '~/examples/react/core/authentication/authentication-service';
import type rootDepsDefinition from '~/examples/react/bootstrap/root-deps-definition';
import sleep from '~/examples/react/core/util/sleep';

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
