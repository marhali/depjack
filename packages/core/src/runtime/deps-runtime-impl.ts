import type { DepsRuntime } from '@/core/runtime/deps-runtime';
import type { Deps, DepsDefinition, DepsKey, DepsGraph, DepsLazyFunction } from '@/core/definition';
import type { DepsFactory } from '@/core/factory';
import type { DepsState } from '@/core/runtime/deps-state';
import type { Logger } from '@/core/supportive/logger';
import determineInitDeps from '@/core/runtime/determine-init-deps';
import determineDepsOrder from '@/core/runtime/determine-deps-order';
import createDepsGraph from '@/core/runtime/create-deps-graph';
import createReactiveState, { type ReactiveState } from '@/core/supportive/reactive-state';

/**
 * Reference implementation of a deps runtime.
 */
class DepsRuntimeImpl<TDeps extends Deps> implements DepsRuntime<TDeps> {
  private readonly depsGraph: DepsGraph<TDeps>;
  private readonly state: ReactiveState<DepsState<TDeps>>;

  constructor(
    private readonly depsDefinition: DepsDefinition<TDeps>,
    private readonly depsFactory: DepsFactory<TDeps, DepsDefinition<TDeps>>,
    private readonly logger: Logger,
  ) {
    this.depsGraph = createDepsGraph(depsDefinition);
    this.logger.debug('Calculated dependencies graph', this.depsGraph);

    this.state = createReactiveState<DepsState<TDeps>>({
      bootstrapPromise: undefined,
      bootstrapped: false,
      initializing: [],
      instances: {},
      resolvers: {},
    });
  }

  resolve = <TDepsKey extends DepsKey<TDeps>>(key: TDepsKey): Promise<TDeps[TDepsKey]> => {
    this.internalEnsureIsBootstrapped();
    return this.internalResolveDep(key);
  };

  resolveSync = <TDepsKey extends DepsKey<TDeps>>(key: TDepsKey): TDeps[TDepsKey] => {
    this.internalEnsureIsBootstrapped();

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

  isInitializing = (key: DepsKey<TDeps>) => this.state.get('initializing').includes(key);

  isInitialized = (key: DepsKey<TDeps>) => key in this.state.get('instances');

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

  subscribe = <TScope extends keyof DepsState<TDeps>>(
    scope: TScope,
    listener: (payload: DepsState<TDeps>[TScope]) => void,
  ) => {
    return this.state.subscribe(scope, listener);
  };

  private internalInitializeDeps = async <TDepsKeys extends DepsKey<TDeps>[]>(
    keys: TDepsKeys,
  ): Promise<Pick<TDeps, TDepsKeys[number]>> => {
    const result = {} as Pick<TDeps, TDepsKeys[number]>;

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

  private internalResolveDep = <TDepsKey extends DepsKey<TDeps>>(key: TDepsKey): Promise<TDeps[TDepsKey]> => {
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

  private internalInitializeDep = async <TDepsKey extends DepsKey<TDeps>>(key: TDepsKey): Promise<TDeps[TDepsKey]> => {
    this.state.set('initializing', [...this.state.get('initializing'), key]);

    const neededKeys = this.depsDefinition[key].needs;
    const neededLazyKeys = this.depsDefinition[key].needsLazy;
    this.logger.debug(
      `Initializing dependency "${String(key)}" with needs on (${neededKeys.join(', ')}) and lazy needs on (${neededLazyKeys.join(', ')})...`,
    );
    const neededInstances = {} as TDeps;

    for (const neededKey of neededKeys) {
      const neededInstance = this.state.get('instances')[neededKey];

      neededInstances[neededKey] =
        neededInstance === undefined ? await this.internalResolveDep(neededKey) : neededInstance;
    }

    const neededLazyInstances = {} as DepsLazyFunction<TDeps>;

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

  private internalEnsureIsBootstrapped = () => {
    if (!this.isBootstrapped()) {
      throw new Error('Illegal access on non-bootstrapped runtime. Please make sure to bootstrap this runtime first.');
    }
  };
}

export default DepsRuntimeImpl;
