import type { PartialDepsDefinition } from '@depjack/core';
import type { RootDeps } from '~/react/bootstrap/root-deps';
import type { ProfileDeps } from '~/react/modules/profile/profile-deps';

const profileDepsDefinition = {
  'profile.account': {
    lazy: true,
    needs: ['core.rest_client'],
    needsLazy: [],
  },
} satisfies PartialDepsDefinition<RootDeps, ProfileDeps>;

export default profileDepsDefinition;
