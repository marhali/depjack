import fromModuleFactory from '@depjack/core/factory/from-module-factory';
import type { PartialDepsFactory } from '@depjack/core/factory';
import type { CoreDeps } from '~/examples/react/core/core-deps';
import type { RootDeps } from '~/examples/react/bootstrap/root-deps';
import type rootDepsDefinition from '~/examples/react/bootstrap/root-deps-definition';

const coreDepsFactory = {
  'core.environment': fromModuleFactory(() => import('~/examples/react/core/environment/environment-service-impl')),
  'core.authentication': fromModuleFactory(
    () => import('~/examples/react/core/authentication/authentication-service-impl'),
  ),
  'core.rest_client': fromModuleFactory(() => import('~/examples/react/core/rest-client/rest-client-service-impl')),
} satisfies PartialDepsFactory<RootDeps, typeof rootDepsDefinition, CoreDeps>;

export default coreDepsFactory;
