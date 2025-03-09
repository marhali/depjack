import { fromModuleFactory, type PartialDepsFactory } from '@depjack/core';
import type { RootDeps } from '~/react/bootstrap/root-deps';
import type { ProfileDeps } from '~/react/modules/profile/profile-deps';
import type rootDepsDefinition from '~/react/bootstrap/root-deps-definition';

const profileDepsFactory = {
  'profile.account': fromModuleFactory(() => import('~/react/modules/profile/account/account-service-impl')),
} satisfies PartialDepsFactory<RootDeps, typeof rootDepsDefinition, ProfileDeps>;

export default profileDepsFactory;
