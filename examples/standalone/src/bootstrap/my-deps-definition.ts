import type { DepsDefinition } from '@depjack/core';
import type { MyDeps } from '~/standalone/bootstrap/my-deps';
import clientDepsDefinition from '~/standalone/client/client-deps-definition';
import repositoryDepsDefinition from '~/standalone/repository/repository-deps-definition';
import serviceDepsDefinition from '~/standalone/service/service-deps-definition';

const myDepsDefinition = {
  ...clientDepsDefinition,
  ...repositoryDepsDefinition,
  ...serviceDepsDefinition,
} satisfies DepsDefinition<MyDeps>;

export default myDepsDefinition;
