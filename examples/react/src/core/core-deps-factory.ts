import { fromModuleFactory, type PartialDepsFactory } from '@depjack/core';
import type { CoreDeps } from '~/react/core/core-deps';
import type { RootDeps } from '~/react/bootstrap/root-deps';
import type rootDepsDefinition from '~/react/bootstrap/root-deps-definition';

const coreDepsFactory = {
  'core.environment': fromModuleFactory(() => import('~/react/core/environment/environment-service-impl')),
  'core.authentication': fromModuleFactory(() => import('~/react/core/authentication/authentication-service-impl')),
  'core.rest_client': fromModuleFactory(() => import('~/react/core/rest-client/rest-client-service-impl')),
} satisfies PartialDepsFactory<RootDeps, typeof rootDepsDefinition, CoreDeps>;

export default coreDepsFactory;
