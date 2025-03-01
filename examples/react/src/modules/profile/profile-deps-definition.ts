import type { PartialDepsDefinition } from '@depjack/core/definition';
import type { RootDeps } from '~/examples/react/bootstrap/root-deps';
import type { ProfileDeps } from '~/examples/react/modules/profile/profile-deps';

const profileDepsDefinition = {
  'profile.account': {
    lazy: true,
    needs: ['core.rest_client'],
    needsLazy: [],
  },
} satisfies PartialDepsDefinition<RootDeps, ProfileDeps>;

export default profileDepsDefinition;
