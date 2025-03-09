import { use } from 'react';
import type { Deps, DepsRuntime } from '@depjack/core';

/**
 * Hook to initialize the provided runtime.
 * This will trigger the nearest suspense if the initialization promise from the runtime has not been fulfilled yet.
 * @param depsRuntime Deps Runtime to bootstrap
 * @see DepsRuntime#bootstrap
 * @see https://react.dev/reference/react/Suspense
 * @example ```ts
 * function MyComponent({ children }: PropsWithChildren) {
 *   useBootstrapDepsRuntime(myRuntime);
 *   return children;
 * }
 * ```
 */
function useBootstrapDepsRuntime<TDeps extends Deps>(depsRuntime: DepsRuntime<TDeps>) {
  use(depsRuntime.bootstrap());
}

export default useBootstrapDepsRuntime;
