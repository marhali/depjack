import type { DepsDefinition } from '@depjack/core/definition';
import type { MyDeps } from '~/examples/standalone/bootstrap/my-deps';
import clientDepsDefinition from '~/examples/standalone/client/client-deps-definition';
import repositoryDepsDefinition from '~/examples/standalone/repository/repository-deps-definition';
import serviceDepsDefinition from '~/examples/standalone/service/service-deps-definition';

const myDepsDefinition = {
  ...clientDepsDefinition,
  ...repositoryDepsDefinition,
  ...serviceDepsDefinition,
} satisfies DepsDefinition<MyDeps>;

export default myDepsDefinition;
