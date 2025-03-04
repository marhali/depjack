import type { DepsFactory } from '@depjack/core/factory';
import type { MyDeps } from '~/examples/standalone/bootstrap/my-deps';
import type myDepsDefinition from '~/examples/standalone/bootstrap/my-deps-definition';
import clientDepsFactory from '~/examples/standalone/client/client-deps-factory';
import repositoryDepsFactory from '~/examples/standalone/repository/repository-deps-factory';
import serviceDepsFactory from '~/examples/standalone/service/service-deps-factory';

const myDepsFactory = {
  ...clientDepsFactory,
  ...repositoryDepsFactory,
  ...serviceDepsFactory,
} satisfies DepsFactory<MyDeps, typeof myDepsDefinition>;

export default myDepsFactory;
