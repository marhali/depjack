import type { DepFactory } from '@depjack/core/factory';
import type { EnvironmentService } from '~/examples/react/core/environment/environment-service';
import type { RootDeps } from '~/examples/react/bootstrap/root-deps';
import type rootDepsDefinition from '~/examples/react/bootstrap/root-deps-definition';
import sleep from '~/examples/react/core/util/sleep';

export class EnvironmentServiceImpl implements EnvironmentService {
  resolveVariable(): Promise<string> {
    throw new Error('Method not implemented.');
  }
}

export const factory: DepFactory<RootDeps, typeof rootDepsDefinition, 'core.environment'> = async () => {
  await sleep(1000);
  return new EnvironmentServiceImpl();
};
