import type { PartialDepsFactory } from '@depjack/core/factory';
import type { MyDeps } from '~/examples/standalone/bootstrap/my-deps';
import type myDepsDefinition from '~/examples/standalone/bootstrap/my-deps-definition';
import type { ServiceDeps } from '~/examples/standalone/service/service-deps';
import fromModuleFactory from '@depjack/core/factory/from-module-factory';

const serviceDepsFactory = {
  'service.employee': fromModuleFactory(() => import('~/examples/standalone/service/employee-service-impl')),
  'service.department': fromModuleFactory(() => import('~/examples/standalone/service/department-service-impl')),
} satisfies PartialDepsFactory<MyDeps, typeof myDepsDefinition, ServiceDeps>;

export default serviceDepsFactory;
