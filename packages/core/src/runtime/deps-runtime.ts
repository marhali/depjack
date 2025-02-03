import { Deps, DepsKey } from '@depjack/core/definition/definition';
import { DepsState } from '@depjack/core/runtime/deps-state.ts';

/** Represents a dependency runtime that is capable of resolving and caching dependencies. */
export interface DepsRuntime<T extends Deps> {
  /**
   * Returns the requested dependency by either resolving it or using a cached version.
   * @param key Dependency identifier
   */
  resolve: <Key extends DepsKey<T>>(key: Key) => Promise<T[Key]>;

  /**
   * Returns the requested dependency synchronously from the cache.
   * This will throw an exception if the desired dependency is not initialized.
   * Make sure to check the initialization state before using this method.
   * @see isDepInitialized
   * @see getInitializedDeps
   * @param key Dependency identifier
   */
  resolveSync: <Key extends DepsKey<T>>(key: Key) => T[Key];

  /**
   * Returns a list of dependencies that are currently initializing.
   */
  getInitializing: () => Readonly<DepsKey<T>[]>;

  /**
   * Returns a list of initialized dependencies.
   * These deps are safe for use for synchronous access.
   */
  getInitialized: () => Readonly<DepsKey<T>[]>;

  /**
   * Checks whether a dependency is currently in the state of initializing.
   * @param key Dependency identifier
   */
  isInitializing: (key: DepsKey<T>) => boolean;

  /**
   * Checks whether a dependency is already initialized.
   * @param key Dependency identifier
   */
  isInitialized: (key: DepsKey<T>) => boolean;

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
  subscribe: <Scope extends keyof DepsState<T>>(
    scope: Scope,
    listener: (payload: DepsState<T>[Scope]) => void,
  ) => () => void;
}
