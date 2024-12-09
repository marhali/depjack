import { Deps } from '@depjack/core/definition/definition.ts';

/**
 * Represents a record of instantiated dependency instances.
 */
export type DepsInstance<T extends Deps> = {
  [K in keyof T]?: T[K];
};
