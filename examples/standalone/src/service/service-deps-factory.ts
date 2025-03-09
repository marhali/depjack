import { type PartialDepsFactory, fromModuleFactory } from '@depjack/core';
import type { MyDeps } from '~/standalone/bootstrap/my-deps';
import type myDepsDefinition from '~/standalone/bootstrap/my-deps-definition';
import type { ServiceDeps } from '~/standalone/service/service-deps';

const serviceDepsFactory = {
  'service.employee': fromModuleFactory(() => import('~/standalone/service/employee-service-impl')),
  'service.department': fromModuleFactory(() => import('~/standalone/service/department-service-impl')),
} satisfies PartialDepsFactory<MyDeps, typeof myDepsDefinition, ServiceDeps>;

export default serviceDepsFactory;
