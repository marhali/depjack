import { useSyncExternalStore } from 'react';
import type { Deps, DepsKey, DepsRuntime } from '@depjack/core';

/**
 * Hook to resolve all dependencies, that are currently in the process of initialization.
 * @param depsRuntime The deps runtime
 * @see DepsRuntime#getInitializing
 * @example ```ts
 * function MyFallbackComponent() {
 *   const initializingDeps = useInitializingDeps(myRuntime);
 *   return initializingDeps.join(', ');
 * }
 * ```
 */
function useInitializingDeps<TDeps extends Deps>(depsRuntime: DepsRuntime<TDeps>): Readonly<DepsKey<TDeps>[]> {
  return useSyncExternalStore(
    (onStoreChange) => depsRuntime.subscribe('initializing', onStoreChange),
    () => depsRuntime.getInitializing(),
  );
}

export default useInitializingDeps;
