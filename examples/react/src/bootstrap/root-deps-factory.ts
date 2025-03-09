import type { DepsFactory } from '@depjack/core';
import type { RootDeps } from '~/react/bootstrap/root-deps';
import type rootDepsDefinition from '~/react/bootstrap/root-deps-definition';
import coreDepsFactory from '~/react/core/core-deps-factory';
import profileDepsFactory from '~/react/modules/profile/profile-deps-factory';

const rootDepsFactory = {
  ...coreDepsFactory,
  ...profileDepsFactory,
} satisfies DepsFactory<RootDeps, typeof rootDepsDefinition>;

export default rootDepsFactory;
