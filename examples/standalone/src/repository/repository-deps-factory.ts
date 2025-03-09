import { type PartialDepsFactory, fromModuleFactory } from '@depjack/core';
import type { MyDeps } from '~/standalone/bootstrap/my-deps';
import type myDepsDefinition from '~/standalone/bootstrap/my-deps-definition';
import type { RepositoryDeps } from '~/standalone/repository/repository-deps';

const repositoryDepsFactory = {
  'repository.employee': fromModuleFactory(() => import('~/standalone/repository/employee-repository-impl')),
  'repository.department': fromModuleFactory(() => import('~/standalone/repository/department-repository-impl')),
} satisfies PartialDepsFactory<MyDeps, typeof myDepsDefinition, RepositoryDeps>;

export default repositoryDepsFactory;
