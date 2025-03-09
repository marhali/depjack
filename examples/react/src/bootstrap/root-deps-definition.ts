import type { DepsDefinition } from '@depjack/core';
import type { RootDeps } from '~/react/bootstrap/root-deps';
import coreDepsDefinition from '~/react/core/core-deps-definition';
import profileDepsDefinition from '~/react/modules/profile/profile-deps-definition';

const rootDepsDefinition = {
  ...coreDepsDefinition,
  ...profileDepsDefinition,
} satisfies DepsDefinition<RootDeps>;

export default rootDepsDefinition;
