import type { PartialDepsDefinition } from '@depjack/core';
import type { RootDeps } from '~/react/bootstrap/root-deps';
import type { CoreDeps } from '~/react/core/core-deps';

const coreDepsDefinition = {
  'core.environment': {
    lazy: false,
    needs: [],
    needsLazy: [],
  },
  'core.authentication': {
    lazy: false,
    needs: ['core.environment'],
    needsLazy: [],
  },
  'core.rest_client': {
    lazy: false,
    needs: ['core.environment', 'core.authentication'],
    needsLazy: [],
  },
} satisfies PartialDepsDefinition<RootDeps, CoreDeps>;

export default coreDepsDefinition;
