import createDepsRuntime from '@depjack/core/runtime/create-deps-runtime';
import type { MyDeps } from '~/examples/standalone/bootstrap/my-deps';
import myDepsDefinition from '~/examples/standalone/bootstrap/my-deps-definition';
import myDepsFactory from '~/examples/standalone/bootstrap/my-deps-factory';

const myDepsRuntime = createDepsRuntime<MyDeps>(myDepsDefinition, myDepsFactory);

export default myDepsRuntime;
