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
  [K in keyof TDeps]: (
    needs: Pick<TDeps, TDepsDefinition[K]['needs'][number]> &
      DepsLazyFunction<Pick<TDeps, TDepsDefinition[K]['needsLazy'][number]>>,
  ) => Promise<TDeps[K]>;
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

export type DepFactory<DEPS extends Deps, DEFINITION extends DepsDefinition<DEPS>, KEY extends keyof DEPS> = (
  needs: Pick<DEPS, DEFINITION[KEY]['needs'][number]> &
    DepsLazyFunction<Pick<DEPS, DEFINITION[KEY]['needsLazy'][number]>>,
) => Promise<DEPS[KEY]>;
