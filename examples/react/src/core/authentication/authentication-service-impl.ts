import type { DepFactory } from '@depjack/core/factory';
import type { AuthenticationService } from '~/examples/react/core/authentication/authentication-service';
import type { EnvironmentService } from '~/examples/react/core/environment/environment-service';
import type { RootDeps } from '~/examples/react/bootstrap/root-deps';
import type rootDepsDefinition from '~/examples/react/bootstrap/root-deps-definition';
import sleep from '~/examples/react/core/util/sleep';

export class AuthenticationServiceImpl implements AuthenticationService {
  constructor(private readonly environmentService: EnvironmentService) {}

  login(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  logout(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export const factory: DepFactory<RootDeps, typeof rootDepsDefinition, 'core.authentication'> = async (needs) => {
  await sleep(3000);
  return new AuthenticationServiceImpl(needs['core.environment']);
};
