import type { Deps, DepsKey, DepsInstance, DepsLazyInstance } from '@/core/definition';

/**
 * Represents the state of a deps runtime.
 */
export type DepsState<TDeps extends Deps> = {
  /** Cached initialization promise to startup the runtime. */
  bootstrapPromise: Promise<void> | undefined;

  /** Indicates whether this runtime has been initially initialized. */
  bootstrapped: boolean;

  /** Already initialized dependencies. */
  instances: DepsInstance<TDeps>;

  /** Cached dependency instance promises. */
  resolvers: DepsLazyInstance<TDeps>;

  /** Dependencies that are currently initializing. */
  initializing: DepsKey<TDeps>[];
};
