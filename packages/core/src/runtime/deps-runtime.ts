import type { Deps, DepsKey } from '@/core/definition';
import type { DepsState } from '@/core/runtime/deps-state';

/** Represents a dependency runtime that is capable of resolving and caching dependencies. */
export interface DepsRuntime<TDeps extends Deps> {
  /**
   * Returns the requested dependency by either resolving it or using a cached version.
   * @param key Dependency identifier
   */
  resolve: <TDepsKey extends DepsKey<TDeps>>(key: TDepsKey) => Promise<TDeps[TDepsKey]>;

  /**
   * Returns the requested dependency synchronously from the cache.
   * This will throw an exception if the desired dependency is not initialized.
   * Make sure to check the initialization state before using this method.
   * @see isDepInitialized
   * @see getInitializedDeps
   * @param key Dependency identifier
   */
  resolveSync: <TDepsKey extends DepsKey<TDeps>>(key: TDepsKey) => TDeps[TDepsKey];

  /**
   * Returns a list of dependencies that are currently initializing.
   */
  getInitializing: () => Readonly<DepsKey<TDeps>[]>;

  /**
   * Returns a list of initialized dependencies.
   * These deps are safe for use for synchronous access.
   */
  getInitialized: () => Readonly<DepsKey<TDeps>[]>;

  /**
   * Checks whether a dependency is currently in the state of initializing.
   * @param key Dependency identifier
   */
  isInitializing: (key: DepsKey<TDeps>) => boolean;

  /**
   * Checks whether a dependency is already initialized.
   * @param key Dependency identifier
   */
  isInitialized: (key: DepsKey<TDeps>) => boolean;

  /**
   * Checks whether this runtime is initialized or not.
   */
  isBootstrapped: () => boolean;

  /**
   * Initializes this runtime and resolves all non-lazy dependencies.
   */
  bootstrap: () => Promise<void>;

  /**
   * Registers the provided listener. The listener is called when changes occur in the specified scope.
   * Returns a teardown function that will unregister this listener if called.
   */
  subscribe: <TScope extends keyof DepsState<TDeps>>(
    scope: TScope,
    listener: (payload: DepsState<TDeps>[TScope]) => void,
  ) => () => void;
}
