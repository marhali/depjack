import { DepsRuntime } from '@depjack/core/runtime/deps-runtime';
import { Deps, DepsDefinition } from '@depjack/core/definition/definition';
import { DepsFactory } from '@depjack/core/factory';
import { Logger } from '@depjack/core/supportive/logger.ts';
import DepsRuntimeImpl from '@depjack/core/runtime/deps-runtime-impl.ts';

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
 */
function createDepsRuntime<T extends Deps>(
  depsDefinition: DepsDefinition<T>,
  depsFactory: DepsFactory<T, DepsDefinition<T>>,
  options: DepsRuntimeOptions = defaultRuntimeOptions,
): DepsRuntime<T> {
  return new DepsRuntimeImpl(depsDefinition, depsFactory, options.logger);
}

export default createDepsRuntime;
