import type { DepsRuntime } from '@/core/runtime/deps-runtime';
import type { Deps, DepsDefinition } from '@/core/definition';
import type { DepsFactory } from '@/core/factory';
import type { Logger } from '@/core/supportive/logger';
import DepsRuntimeImpl from '@/core/runtime/deps-runtime-impl';

type DepsRuntimeOptions = {
  /** Logger to use for the runtime. */
  logger: Logger;
};

const defaultRuntimeOptions: DepsRuntimeOptions = {
  logger: console,
};

/**
 * Creates a new runtime for the provided deps definition and factory.
 * @param depsDefinition Dependencies definition
 * @param depsFactory Dependencies factory
 * @param options Optional configuration for the runtime
 * @see DepsDefinition
 * @see DepsFactory
 * @example ```ts
 * const depsRuntime = createDepsRuntime<MyDeps>(myDepsDefinition, myDepsFactory);
 * ```
 */
function createDepsRuntime<TDeps extends Deps>(
  depsDefinition: DepsDefinition<TDeps>,
  depsFactory: DepsFactory<TDeps, DepsDefinition<TDeps>>,
  options: DepsRuntimeOptions = defaultRuntimeOptions,
): DepsRuntime<TDeps> {
  return new DepsRuntimeImpl(depsDefinition, depsFactory, options.logger);
}

export default createDepsRuntime;
