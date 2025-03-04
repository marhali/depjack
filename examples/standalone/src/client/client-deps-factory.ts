import type { PartialDepsFactory } from '@depjack/core/factory';
import fromModuleFactory from '@depjack/core/factory/from-module-factory';
import type { MyDeps } from '~/examples/standalone/bootstrap/my-deps';
import type myDepsDefinition from '~/examples/standalone/bootstrap/my-deps-definition';
import type { ClientDeps } from '~/examples/standalone/client/client-deps';

const clientDepsFactory = {
  'client.auth': fromModuleFactory(() => import('~/examples/standalone/client/auth-client-impl')),
  'client.database': fromModuleFactory(() => import('~/examples/standalone/client/database-client-impl')),
} satisfies PartialDepsFactory<MyDeps, typeof myDepsDefinition, ClientDeps>;

export default clientDepsFactory;
