/**
 * Dependency factory method that resolves the provided module dynamically.
 * Expects the provided module to have an exported function named "factory"
 * which will create an instance of the requested dependency.
 * @example ```ts
 * // mymodule.ts
 * class MyModule {}
 *
 * export const factory: DepFactory<MyDeps, typeof myDepsDefinition, 'myModule'> = async (needs) => {
 *   return new MyModule(needs);
 * }
 *
 * // factory definition
 * const myFactories = {
 *   myModule: fromModuleFactory(() => import('mymodule.ts')),
 * };
 * ```
 * @param moduleLoader Callback function that resolves to the target module
 */
function fromModuleFactory<Needs, Result>(moduleLoader: () => Promise<{ factory: (needs: Needs) => Promise<Result> }>) {
  return async (needs: Needs) => {
    const module = await moduleLoader();
    return module.factory(needs);
  };
}

export default fromModuleFactory;
