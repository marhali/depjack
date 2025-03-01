import type { DepsDefinition } from '@depjack/core/definition';
import type { RootDeps } from '~/examples/react/bootstrap/root-deps';
import coreDepsDefinition from '~/examples/react/core/core-deps-definition';
import profileDepsDefinition from '~/examples/react/modules/profile/profile-deps-definition';

const rootDepsDefinition = {
  ...coreDepsDefinition,
  ...profileDepsDefinition,
} satisfies DepsDefinition<RootDeps>;

export default rootDepsDefinition;
