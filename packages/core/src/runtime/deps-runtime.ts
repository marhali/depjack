import { Deps, DepsKey, DepsLazy } from '@depjack/core/definition/definition';

export type DepsRuntimeStateStatus = 'UNINITIALIZED' | 'INITIALIZING' | 'IDLE';

export type DepsRuntimeState<T extends Deps> = {
  status: DepsRuntimeStateStatus;
  initialized: DepsKey<T>[];
  initializing: DepsKey<T>[];
};

export interface DepsRuntime<T extends Deps> {
  getState: () => Readonly<DepsRuntimeState<T>>;
  getDeps: <Keys extends DepsKey<T>[]>(...keys: Keys) => Promise<Pick<T, Keys[number]>>;
  getDepsLazy: <Keys extends DepsKey<T>[]>(...keys: Keys) => Promise<DepsLazy<Pick<T, Keys[number]>>>;
  getDepsSync: <Keys extends DepsKey<T>[]>(...keys: Keys) => Pick<T, Keys[number]>;
  isDepInitialized: (key: DepsKey<T>) => boolean;
  isInitialized: () => boolean;
  initialize: () => Promise<void>;
}
