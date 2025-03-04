import type { Deps, DepsDefinition, DepsLazyFunction } from '@depjack/core/definition';

/**
 * Defines the factory function for each dependency.
 * @see Deps
 * @see DepsDefintion
 * @example ```ts
 * type MyDeps = {
 *   myModuleA: MyModuleA,
 * };
 *
 * const myDepsDefinition = {
 *   // ...
 * } satisfies DepsDefinition<MyDeps>;
 *
 * const myDepsFactory = {
 *   // ...
 * } satisfies DepsFactory<MyDeps, typeof myDepsDefinition>;
 * ```
 */
export type DepsFactory<TDeps extends Deps, TDepsDefinition extends DepsDefinition<TDeps>> = {
  /**
   * Initialization function that is called to initialize this dependency.
   * This function is only called once per runtime environment.
   */
  [TDepsKey in keyof TDeps]: (
    needs: Pick<TDeps, TDepsDefinition[TDepsKey]['needs'][number]> &
      DepsLazyFunction<Pick<TDeps, TDepsDefinition[TDepsKey]['needsLazy'][number]>>,
  ) => Promise<TDeps[TDepsKey]>;
};

/**
 * Type helper to define only a partial part of the deps' factory.
 * @see DepsFactory
 * @example ```ts
 * const myPartialDepsFactory = {
 *   // ...
 * } satisfies PartialDepsFactory<MyDeps, typeof myDepsDefinition, MyPartialDeps>;
 * ```
 */
export type PartialDepsFactory<
  TDeps extends Deps,
  TDepsDefinition extends DepsDefinition<TDeps>,
  TPartialDeps extends Partial<TDeps>,
> = Pick<DepsFactory<TDeps, TDepsDefinition>, Extract<keyof TPartialDeps, keyof TDeps>>;

/**
 * Type helper to define a single dependency factory.
 * @see DepsDefinition
 * @example ```ts
 * export class MyModule {
 *  // ...
 * }
 *
 * export const factory: DepFactory<MyDeps, typeof myDepsDefinition, 'myModule'> = (needs) => {
 *   return Promise.resolve(new MyModule(needs['myRequiredService']));
 * };
 * ```
 */
export type DepFactory<
  TDeps extends Deps,
  TDepsDefinition extends DepsDefinition<TDeps>,
  TDepsKey extends keyof TDeps,
> = (
  needs: Pick<TDeps, TDepsDefinition[TDepsKey]['needs'][number]> &
    DepsLazyFunction<Pick<TDeps, TDepsDefinition[TDepsKey]['needsLazy'][number]>>,
) => Promise<TDeps[TDepsKey]>;
