import { use } from 'react';
import type { DepsRuntime } from '@depjack/core/runtime/deps-runtime';
import type { Deps } from '@depjack/core/definition';

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
