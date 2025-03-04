import type { PartialDepsDefinition } from '@depjack/core/definition';
import type { MyDeps } from '~/examples/standalone/bootstrap/my-deps';
import type { ClientDeps } from '~/examples/standalone/client/client-deps';

const clientDepsDefinition = {
  'client.auth': {
    lazy: false,
    needs: [],
    needsLazy: [],
  },
  'client.database': {
    lazy: true,
    needs: ['client.auth'],
    needsLazy: [],
  },
} satisfies PartialDepsDefinition<MyDeps, ClientDeps>;

export default clientDepsDefinition;
