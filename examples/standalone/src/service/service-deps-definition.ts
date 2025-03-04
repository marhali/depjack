import type { PartialDepsDefinition } from '@depjack/core/definition';
import type { MyDeps } from '~/examples/standalone/bootstrap/my-deps';
import type { ServiceDeps } from '~/examples/standalone/service/service-deps';

const serviceDepsDefinition = {
  'service.employee': {
    lazy: true,
    needs: ['repository.employee'],
    needsLazy: [],
  },
  'service.department': {
    lazy: true,
    needs: ['repository.employee', 'repository.department'],
    needsLazy: [],
  },
} satisfies PartialDepsDefinition<MyDeps, ServiceDeps>;

export default serviceDepsDefinition;
