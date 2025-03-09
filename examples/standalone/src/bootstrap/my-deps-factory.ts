import type { DepsFactory } from '@depjack/core';
import type { MyDeps } from '~/standalone/bootstrap/my-deps';
import type myDepsDefinition from '~/standalone/bootstrap/my-deps-definition';
import clientDepsFactory from '~/standalone/client/client-deps-factory';
import repositoryDepsFactory from '~/standalone/repository/repository-deps-factory';
import serviceDepsFactory from '~/standalone/service/service-deps-factory';

const myDepsFactory = {
  ...clientDepsFactory,
  ...repositoryDepsFactory,
  ...serviceDepsFactory,
} satisfies DepsFactory<MyDeps, typeof myDepsDefinition>;

export default myDepsFactory;
