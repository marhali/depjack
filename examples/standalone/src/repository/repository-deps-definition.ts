import type { PartialDepsDefinition } from '@depjack/core/definition';
import type { MyDeps } from '~/examples/standalone/bootstrap/my-deps';
import type { RepositoryDeps } from '~/examples/standalone/repository/repository-deps';

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
