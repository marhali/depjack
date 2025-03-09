import type { DepFactory } from '@depjack/core';
import type { EnvironmentService } from '~/react/core/environment/environment-service';
import type { RootDeps } from '~/react/bootstrap/root-deps';
import type rootDepsDefinition from '~/react/bootstrap/root-deps-definition';
import sleep from '~/react/core/util/sleep';

export class EnvironmentServiceImpl implements EnvironmentService {
  resolveVariable(): Promise<string> {
    throw new Error('Method not implemented.');
  }
}

export const factory: DepFactory<RootDeps, typeof rootDepsDefinition, 'core.environment'> = async () => {
  await sleep(1000);
  return new EnvironmentServiceImpl();
};
