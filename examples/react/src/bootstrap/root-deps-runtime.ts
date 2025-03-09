import { createDepsRuntime } from '@depjack/core';
import type { RootDeps } from '~/react/bootstrap/root-deps';
import rootDepsDefinition from '~/react/bootstrap/root-deps-definition';
import rootDepsFactory from '~/react/bootstrap/root-deps-factory';

const rootDepsRuntime = createDepsRuntime<RootDeps>(rootDepsDefinition, rootDepsFactory);

export default rootDepsRuntime;
