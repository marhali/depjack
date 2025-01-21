import { DepsRuntime } from '@depjack/core/runtime/deps-runtime';
import {
  Deps,
  DepsDefinition,
  DepsKey,
  DepsInstance,
  DepsLazyInstance,
  DepsLazy,
} from '@depjack/core/definition/definition';
import { DepsGraph } from '@depjack/core/definition/graph.ts';
import { DepsFactory } from '@depjack/core/factory.ts';
import { Logger } from '@depjack/core/supportive/logger.ts';
import determineInitDeps from '@depjack/core/runtime/determine-init-deps.ts';
import determineDepsOrder from '@depjack/core/runtime/determine-deps-order.ts';
import createDepsGraph from '@depjack/core/runtime/create-deps-graph.ts';

class DepsRuntimeImpl<T extends Deps> implements DepsRuntime<T> {
  private readonly depsGraph: DepsGraph<T>;
  private readonly initializePromise: Promise<void>;

  private initialized: boolean;
  private depsInitializing: Set<DepsKey<T>>;
  private depsInstance: DepsInstance<T>;
  private depsLazyInstance: DepsLazyInstance<T>;

  constructor(
    private readonly depsDefinition: DepsDefinition<T>,
    private readonly depsFactory: DepsFactory<T, DepsDefinition<T>>,
    private readonly logger: Logger,
  ) {
    this.initialized = false;
    this.depsInitializing = new Set();
    this.depsInstance = {};
    this.depsLazyInstance = {};
    this.depsGraph = createDepsGraph(depsDefinition);
    this.logger.debug('depsGraph', this.depsGraph);

    const initDeps = determineInitDeps(depsDefinition);
    console.log('initDeps (lazy=false)', initDeps);
    const initDepsOrder = determineDepsOrder(initDeps, this.depsGraph);
    this.logger.debug('initDepsOrder', initDepsOrder);
    this.logger.debug('---');
    this.initializePromise = new Promise((resolve, reject) => {
      this.internalInitializeDeps(initDepsOrder)
        .then(() => {
          this.initialized = true;
          resolve();
        })
        .catch(reject);
    });
  }

  getDep = <Key extends DepsKey<T>>(key: Key): Promise<T[Key]> => {
    return this.internalResolveDep(key);
  };

  getDepSync = <Key extends DepsKey<T>>(key: Key): T[Key] => {
    if (!this.depsInstance[key]) {
      throw new Error(`Initialize dep "${String(key)}" before synchronous access.`);
    }

    return this.depsInstance[key];
  };

  getInitializingDeps = () => this.depsInitializing;

  getInitializedDeps = () => new Set(Object.keys(this.depsInstance));

  isDepInitializing = (key: DepsKey<T>) => this.depsInitializing.has(key);

  isDepInitialized = (key: DepsKey<T>) => key in this.depsInstance;

  isInitialized = () => this.initialized;

  initialize = () => this.initializePromise;

  private internalInitializeDeps = async <Keys extends DepsKey<T>[]>(keys: Keys): Promise<Pick<T, Keys[number]>> => {
    const result = {} as Pick<T, Keys[number]>;

    for (const key of keys) {
      result[key] = await this.internalInitializeDep(key);
    }

    return result;
  };

  private internalResolveDep = async <Key extends DepsKey<T>>(key: Key): Promise<T[Key]> => {
    if (this.depsInstance[key]) {
      this.logger.debug(`${String(key)} is already initialized`);
      return this.depsInstance[key];
    }

    if (this.depsLazyInstance[key]) {
      this.logger.debug(`${String(key)} is already a promisified`);
      return this.depsLazyInstance[key] as T[Key];
    }

    const initializeDepPromise = this.internalInitializeDep(key);

    this.depsLazyInstance[key] = initializeDepPromise;

    return initializeDepPromise;
  };

  private internalInitializeDep = async <Key extends DepsKey<T>>(key: Key): Promise<T[Key]> => {
    this.depsInitializing.add(key);

    const neededKeys = this.depsDefinition[key].needs;
    const neededLazyKeys = this.depsDefinition[key].needsLazy;
    this.logger.debug(
      `Initializing "${String(key)}" with needs on (${neededKeys.join(', ')}) and lazy needs on (${neededLazyKeys.join(', ')})...`,
    );
    const neededInstances = {} as T;

    for (const neededKey of neededKeys) {
      if (!this.depsInstance[neededKey]) {
        throw new Error(`Missing needed instance "${String(neededKey)}" whilst initializing "${String(key)}".`);
      }

      neededInstances[neededKey] = this.depsInstance[neededKey];
    }

    const neededLazyInstances = {} as DepsLazy<T>;

    for (const neededLazyKey of neededLazyKeys) {
      neededLazyInstances[neededLazyKey] = this.internalResolveDep(neededLazyKey);
    }

    this.logger.debug(`Resolved needed instances for ${String(key)}:`, neededInstances);

    const instance = await this.depsFactory[key]({ ...neededInstances, ...neededLazyInstances });

    this.logger.debug(`Factory of "${String(key)}" returned:`, instance);

    this.depsInstance[key] = instance;
    this.depsInitializing.delete(key);

    return instance;
  };
}

export default DepsRuntimeImpl;
