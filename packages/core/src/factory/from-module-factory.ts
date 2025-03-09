/**
 * Dependency factory method that resolves the provided module dynamically.
 * Expects the provided module to have an exported function named "factory"
 * which will create an instance of the requested dependency.
 * @example ```ts
 * // mymodule.ts
 * class MyModule {
 *   // ...
 * }
 *
 * export const factory: DepFactory<MyDeps, typeof myDepsDefinition, 'myModule'> = async (needs) => {
 *   return new MyModule(needs);
 * }
 *
 * // factory.ts
 * const myFactories = {
 *   myModule: fromModuleFactory(() => import('mymodule.ts')),
 * } satisfies DepsFactory<MyDeps, typeof myDepsDefinition>;
 * ```
 * @param moduleLoader Callback function that resolves to the target module
 */
function fromModuleFactory<TNeeds, TResult>(
  moduleLoader: () => Promise<{ factory: (needs: TNeeds) => Promise<TResult> }>,
) {
  return async (needs: TNeeds) => {
    const module = await moduleLoader();
    return module.factory(needs);
  };
}

export default fromModuleFactory;
