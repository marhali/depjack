import { Deps, DepsKey, DepsInstance, DepsLazyInstance } from '@depjack/core/definition/definition.ts';

/**
 * Represents the state of a deps runtime.
 */
export type DepsState<T extends Deps> = {
  /** Indicates whether this runtime has been initially initialized. */
  bootstrapped: boolean;

  /** Already initialized dependencies. */
  instances: DepsInstance<T>;

  /** Cached dependency instance promises. */
  resolvers: DepsLazyInstance<T>;

  /** Dependencies that are currently initializing. */
  initializing: DepsKey<T>[];
};
