import { Deps, DepsKey } from '@depjack/core/definition/definition';

/** Represents a dependency runtime that is capable of resolving and caching dependencies. */
export interface DepsRuntime<T extends Deps> {
  /**
   * Returns the requested dependency by either resolving it or using a cached version.
   * @param key Dependency identifier
   */
  getDep: <Key extends DepsKey<T>>(key: Key) => Promise<T[Key]>;

  /**
   * Returns the requested dependency synchronously from the cache.
   * This will throw an exception if the desired dependency is not initialized.
   * Make sure to check the initialization state before using this method.
   * @see isDepInitialized
   * @see getInitializedDeps
   * @param key Dependency identifier
   */
  getDepSync: <Key extends DepsKey<T>>(key: Key) => T[Key];

  /**
   * Returns a list of dependencies that are currently initializing.
   */
  getInitializingDeps: () => Set<DepsKey<T>>;

  /**
   * Returns a list of initialized dependencies.
   * These deps are safe for use for synchronous access.
   */
  getInitializedDeps: () => Set<DepsKey<T>>;

  /**
   * Checks whether a dependency is currently in the state of initializing.
   * @param key Dependency identifier
   */
  isDepInitializing: (key: DepsKey<T>) => boolean;

  /**
   * Checks whether a dependency is already initialized.
   * @param key Dependency identifier
   */
  isDepInitialized: (key: DepsKey<T>) => boolean;

  /**
   * Checks whether this runtime is initialized or not.
   */
  isInitialized: () => boolean;

  /**
   * Initializes this runtime and resolves all non-lazy dependencies.
   */
  initialize: () => Promise<void>;
}
