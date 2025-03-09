import { type PartialDepsFactory, fromModuleFactory } from '@depjack/core';
import type { MyDeps } from '~/standalone/bootstrap/my-deps';
import type myDepsDefinition from '~/standalone/bootstrap/my-deps-definition';
import type { ClientDeps } from '~/standalone/client/client-deps';

const clientDepsFactory = {
  'client.auth': fromModuleFactory(() => import('~/standalone/client/auth-client-impl')),
  'client.database': fromModuleFactory(() => import('~/standalone/client/database-client-impl')),
} satisfies PartialDepsFactory<MyDeps, typeof myDepsDefinition, ClientDeps>;

export default clientDepsFactory;
