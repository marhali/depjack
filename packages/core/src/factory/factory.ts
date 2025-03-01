import type { Deps, DepsDefinition, DepsLazyFunction } from '@depjack/core/definition';

/**
 * Defines the factory function for each dependency.
 */
export type DepsFactory<T extends Deps, D extends DepsDefinition<T>> = {
  /**
   * Initialization function that is called to initialize this dependency.
   * This function is only called once per runtime environment.
   */
  [K in keyof T]: (
    needs: Pick<T, D[K]['needs'][number]> & DepsLazyFunction<Pick<T, D[K]['needsLazy'][number]>>,
  ) => Promise<T[K]>;
};

export type PartialDepsFactory<
  DEPS extends Deps,
  DEFINITION extends DepsDefinition<DEPS>,
  PARTIAL extends Partial<DEPS>,
> = Pick<DepsFactory<DEPS, DEFINITION>, Extract<keyof PARTIAL, keyof DEPS>>;

export type DepFactory<DEPS extends Deps, DEFINITION extends DepsDefinition<DEPS>, KEY extends keyof DEPS> = (
  needs: Pick<DEPS, DEFINITION[KEY]['needs'][number]> &
    DepsLazyFunction<Pick<DEPS, DEFINITION[KEY]['needsLazy'][number]>>,
) => Promise<DEPS[KEY]>;
