import { DepsRuntime } from '@depjack/core/runtime/deps-runtime';
import { Deps, DepsDefinition, DepsKey, DepsLazyFunction } from '@depjack/core/definition/definition';
import { DepsGraph } from '@depjack/core/definition/graph.ts';
import { DepsFactory } from '@depjack/core/factory.ts';
import { DepsState } from '@depjack/core/runtime/deps-state.ts';
import { Logger } from '@depjack/core/supportive/logger.ts';
import determineInitDeps from '@depjack/core/runtime/determine-init-deps.ts';
import determineDepsOrder from '@depjack/core/runtime/determine-deps-order.ts';
import createDepsGraph from '@depjack/core/runtime/create-deps-graph.ts';
import createReactiveState, { ReactiveState } from '@depjack/core/supportive/reactive-state.ts';

class DepsRuntimeImpl<T extends Deps> implements DepsRuntime<T> {
  private readonly depsGraph: DepsGraph<T>;
  private readonly state: ReactiveState<DepsState<T>>;

  constructor(
    private readonly depsDefinition: DepsDefinition<T>,
    private readonly depsFactory: DepsFactory<T, DepsDefinition<T>>,
    private readonly logger: Logger,
  ) {
    this.depsGraph = createDepsGraph(depsDefinition);
    this.logger.debug('Calculated dependencies graph', this.depsGraph);

    this.state = createReactiveState<DepsState<T>>({
      bootstrapPromise: undefined,
      bootstrapped: false,
      initializing: [],
      instances: {},
      resolvers: {},
    });
  }

  resolve = <Key extends DepsKey<T>>(key: Key): Promise<T[Key]> => {
    return this.internalResolveDep(key);
  };

  resolveSync = <Key extends DepsKey<T>>(key: Key): T[Key] => {
    const instance = this.state.get('instances')[key];

    if (!instance) {
      throw new Error(
        `Illegal access on non-initialized dependency "${String(key)}". Make sure to initialize dependencies before any synchronous access.`,
      );
    }

    return instance;
  };

  getInitializing = () => this.state.get('initializing');

  getInitialized = () => Object.keys(this.state.get('instances'));

  isInitializing = (key: DepsKey<T>) => this.state.get('initializing').includes(key);

  isInitialized = (key: DepsKey<T>) => key in this.state.get('instances');

  isBootstrapped = () => this.state.get('bootstrapped');

  bootstrap = () => {
    const existingBootstrapPromise = this.state.get('bootstrapPromise');

    if (existingBootstrapPromise) {
      return existingBootstrapPromise;
    }

    const initDeps = determineInitDeps(this.depsDefinition);
    this.logger.debug('Init dependencies (lazy=false)', initDeps);

    const initDepsOrder = determineDepsOrder(initDeps, this.depsGraph);
    this.logger.debug('Initialization order', initDepsOrder);

    const bootstrapPromise = new Promise<void>((resolve, reject) => {
      this.internalInitializeDeps(initDepsOrder)
        .then(() => {
          this.state.set('bootstrapped', true);
          resolve();
        })
        .catch(reject);
    });

    this.state.set('bootstrapPromise', bootstrapPromise);
    return bootstrapPromise;
  };

  subscribe = <Scope extends keyof DepsState<T>>(scope: Scope, listener: (payload: DepsState<T>[Scope]) => void) => {
    return this.state.subscribe(scope, listener);
  };

  private internalInitializeDeps = async <Keys extends DepsKey<T>[]>(keys: Keys): Promise<Pick<T, Keys[number]>> => {
    const result = {} as Pick<T, Keys[number]>;

    for (const key of keys) {
      const resolver = this.internalInitializeDep(key);
      this.state.set('resolvers', {
        ...this.state.get('resolvers'),
        [key]: resolver,
      });
      result[key] = await resolver;
    }

    return result;
  };

  private internalResolveDep = <Key extends DepsKey<T>>(key: Key): Promise<T[Key]> => {
    const instanceResolver = this.state.get('resolvers')[key];

    if (instanceResolver) {
      this.logger.debug(`Dependency "${String(key)}" already has a resolver. Skip resolve.`);
      return instanceResolver;
    }

    const initializeDepPromise = this.internalInitializeDep(key);

    this.state.set('resolvers', {
      ...this.state.get('resolvers'),
      [key]: initializeDepPromise,
    });

    return initializeDepPromise;
  };

  private internalInitializeDep = async <Key extends DepsKey<T>>(key: Key): Promise<T[Key]> => {
    this.state.set('initializing', [...this.state.get('initializing'), key]);

    const neededKeys = this.depsDefinition[key].needs;
    const neededLazyKeys = this.depsDefinition[key].needsLazy;
    this.logger.debug(
      `Initializing dependency "${String(key)}" with needs on (${neededKeys.join(', ')}) and lazy needs on (${neededLazyKeys.join(', ')})...`,
    );
    const neededInstances = {} as T;

    for (const neededKey of neededKeys) {
      const neededInstance = this.state.get('instances')[neededKey];

      if (!neededInstance) {
        throw new Error(
          `Missing needed dependency instance "${String(neededKey)}" whilst initializing dependency "${String(key)}".`,
        );
      }

      neededInstances[neededKey] = neededInstance;
    }

    const neededLazyInstances = {} as DepsLazyFunction<T>;

    for (const neededLazyKey of neededLazyKeys) {
      neededLazyInstances[neededLazyKey] = () => this.internalResolveDep(neededLazyKey);
    }

    this.logger.debug(`Resolved needed instances for dependency "${String(key)}"`, neededInstances);
    this.logger.debug(`Resolved lazy needed instances for dependency "${String(key)}"`, neededLazyInstances);

    const instance = await this.depsFactory[key]({ ...neededInstances, ...neededLazyInstances });

    this.logger.debug(`Dependency "${String(key)}" initialized`, instance);

    this.state.set('instances', {
      ...this.state.get('instances'),
      [key]: instance,
    });

    this.state.set(
      'initializing',
      this.state.get('initializing').filter((currentKey) => currentKey !== key),
    );

    return instance;
  };
}

export default DepsRuntimeImpl;
