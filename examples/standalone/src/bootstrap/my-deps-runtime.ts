import { createDepsRuntime } from '@depjack/core';
import type { MyDeps } from '~/standalone/bootstrap/my-deps';
import myDepsDefinition from '~/standalone/bootstrap/my-deps-definition';
import myDepsFactory from '~/standalone/bootstrap/my-deps-factory';

const myDepsRuntime = createDepsRuntime<MyDeps>(myDepsDefinition, myDepsFactory);

export default myDepsRuntime;
