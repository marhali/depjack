import type { PartialDepsDefinition } from '@depjack/core';
import type { MyDeps } from '~/standalone/bootstrap/my-deps';
import type { RepositoryDeps } from '~/standalone/repository/repository-deps';

const repositoryDepsDefinition = {
  'repository.employee': {
    lazy: true,
    needs: ['client.database'],
    needsLazy: [],
  },
  'repository.department': {
    lazy: true,
    needs: ['client.database'],
    needsLazy: [],
  },
} satisfies PartialDepsDefinition<MyDeps, RepositoryDeps>;

export default repositoryDepsDefinition;
