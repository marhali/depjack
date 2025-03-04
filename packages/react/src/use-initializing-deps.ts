import { useSyncExternalStore } from 'react';
import type { Deps, DepsKey } from '@depjack/core/definition';
import type { DepsRuntime } from '@depjack/core/runtime/deps-runtime';

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
