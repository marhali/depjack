import type { DepsFactory } from '@depjack/core/factory';
import type { RootDeps } from '~/examples/react/bootstrap/root-deps';
import type rootDepsDefinition from '~/examples/react/bootstrap/root-deps-definition';
import coreDepsFactory from '~/examples/react/core/core-deps-factory';
import profileDepsFactory from '~/examples/react/modules/profile/profile-deps-factory';

const rootDepsFactory = {
  ...coreDepsFactory,
  ...profileDepsFactory,
} satisfies DepsFactory<RootDeps, typeof rootDepsDefinition>;

export default rootDepsFactory;
