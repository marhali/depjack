import { Deps } from '@depjack/core/definition/definition';

export type DepsGraph<T extends Deps> = Record<keyof T, Set<keyof T>>;
