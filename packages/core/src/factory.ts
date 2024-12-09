import { Deps, DepsLazy, DepsDefinition } from '@depjack/core/definition/definition';

/**
 * Defines the factory function for each dependency.
 */
export type DepsFactory<T extends Deps, D extends DepsDefinition<T>> = {
  /**
   * Initialization function that is called to initialize this dependency.
   * This function is only called once per runtime environment.
   */
  [K in keyof T]: (
    needs: Pick<T, D[K]['needs'][number]> & DepsLazy<Pick<T, D[K]['needsLazy'][number]>>,
  ) => Promise<T[K]>;
};
