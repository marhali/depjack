import createDepsRuntime from '@depjack/core/runtime/create-deps-runtime';
import type { RootDeps } from '~/examples/react/bootstrap/root-deps';
import rootDepsDefinition from '~/examples/react/bootstrap/root-deps-definition';
import rootDepsFactory from '~/examples/react/bootstrap/root-deps-factory';

const rootDepsRuntime = createDepsRuntime<RootDeps>(rootDepsDefinition, rootDepsFactory);

export default rootDepsRuntime;
