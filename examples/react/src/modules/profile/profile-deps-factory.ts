import fromModuleFactory from '@depjack/core/factory/from-module-factory';
import type { PartialDepsFactory } from '@depjack/core/factory';
import type { RootDeps } from '~/examples/react/bootstrap/root-deps';
import type { ProfileDeps } from '~/examples/react/modules/profile/profile-deps';
import type rootDepsDefinition from '~/examples/react/bootstrap/root-deps-definition';

const profileDepsFactory = {
  'profile.account': fromModuleFactory(() => import('~/examples/react/modules/profile/account/account-service-impl')),
} satisfies PartialDepsFactory<RootDeps, typeof rootDepsDefinition, ProfileDeps>;

export default profileDepsFactory;
