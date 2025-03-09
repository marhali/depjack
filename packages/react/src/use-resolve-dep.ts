import { use } from 'react';
import type { Deps, DepsKey, DepsRuntime } from '@depjack/core';

/**
 * Hook to resolve a dependency from the runtime.
 * This will trigger the nearest suspense if the requested dependency is not initialized yet.
 * @param depsRuntime The deps runtime
 * @param key Requested dependency by key identifier
 * @see DepsRuntime#resolve
 * @see https://react.dev/reference/react/Suspense
 * @example ```ts
 * function MyComponent() {
 *   const myDep = useResolveDep(myDepsRuntime, 'myDep');
 *   // ...
 * }
 * ```
 */
function useResolveDep<TDeps extends Deps, TKey extends DepsKey<TDeps>>(
  depsRuntime: DepsRuntime<TDeps>,
  key: TKey,
): TDeps[TKey] {
  return use(depsRuntime.resolve(key));
}

export default useResolveDep;
