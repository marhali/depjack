import type { PartialDepsFactory } from '@depjack/core/factory';
import type { MyDeps } from '~/examples/standalone/bootstrap/my-deps';
import type myDepsDefinition from '~/examples/standalone/bootstrap/my-deps-definition';
import type { RepositoryDeps } from '~/examples/standalone/repository/repository-deps';
import fromModuleFactory from '@depjack/core/factory/from-module-factory';

const repositoryDepsFactory = {
  'repository.employee': fromModuleFactory(() => import('~/examples/standalone/repository/employee-repository-impl')),
  'repository.department': fromModuleFactory(
    () => import('~/examples/standalone/repository/department-repository-impl'),
  ),
} satisfies PartialDepsFactory<MyDeps, typeof myDepsDefinition, RepositoryDeps>;

export default repositoryDepsFactory;
