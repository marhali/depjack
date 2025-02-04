import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { Logger } from '@depjack/core/supportive/logger.ts';
import { DepsDefinition, DepsKey } from '@depjack/core/definition/definition.ts';
import { DepsFactory } from '@depjack/core/factory.ts';
import DepsRuntimeImpl from '@depjack/core/runtime/deps-runtime-impl.ts';
import createDepsGraph from '@depjack/core/runtime/create-deps-graph.ts';
import determineInitDeps from '@depjack/core/runtime/determine-init-deps.ts';
import determineDepsOrder from '@depjack/core/runtime/determine-deps-order.ts';

describe('DepsRuntimeImpl', () => {
  type Type = {
    alpha: string;
    bravo: string;
    charlie: string;
    lazyDelta: string;
    lazyEcho: string;
  };
  let depsDefinition: DepsDefinition<Type>;
  let depsInstance: Type;
  let depsFactory: DepsFactory<Type, DepsDefinition<Type>>;
  let logger: Logger;
  let runtime: DepsRuntimeImpl<Type>;
  beforeEach(() => {
    depsDefinition = {
      alpha: {
        lazy: false,
        needs: ['bravo', 'charlie'],
        needsLazy: [],
      },
      bravo: {
        lazy: false,
        needs: ['charlie'],
        needsLazy: [],
      },
      charlie: {
        lazy: false,
        needs: [],
        needsLazy: [],
      },
      lazyDelta: {
        lazy: true,
        needs: ['alpha', 'bravo', 'charlie'],
        needsLazy: ['lazyEcho'],
      },
      lazyEcho: {
        lazy: true,
        needs: [],
        needsLazy: [],
      },
    };
    depsInstance = {
      alpha: 'alphaInstance',
      bravo: 'bravoInstance',
      charlie: 'charlieInstance',
      lazyEcho: 'lazyEchoInstance',
      lazyDelta: 'lazyDeltaInstance',
    };
    depsFactory = {
      alpha: vi.fn().mockResolvedValue(depsInstance.alpha),
      bravo: vi.fn().mockResolvedValue(depsInstance.bravo),
      charlie: vi.fn().mockResolvedValue(depsInstance.charlie),
      lazyDelta: vi.fn().mockResolvedValue(depsInstance.lazyDelta),
      lazyEcho: vi.fn().mockResolvedValue(depsInstance.lazyEcho),
    };
    logger = {
      log: vi.fn(),
      info: vi.fn(),
      debug: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    };

    runtime = new DepsRuntimeImpl(depsDefinition, depsFactory, logger);
  });
  describe('constructor', () => {
    it('should create and debug log dependencies graph', () => {
      expect(logger.debug).toHaveBeenCalledWith('Calculated dependencies graph', createDepsGraph(depsDefinition));
    });
    it('should set initial state of bootstrapped to false', () => {
      expect(runtime.isBootstrapped()).toBeFalsy();
    });
    it('should set initial state of initializing to empty array', () => {
      expect(runtime.getInitializing()).toStrictEqual([]);
    });
    it('should set initial state of instances to empty array', () => {
      expect(runtime.getInitialized()).toStrictEqual([]);
    });
  });
  describe('bootstrap', () => {
    let initializingListener: Mock;
    let instancesListener: Mock;
    let bootstrappedListener: Mock;
    let bootstrapPromiseListener: Mock;
    beforeEach(async () => {
      initializingListener = vi.fn();
      instancesListener = vi.fn();
      bootstrappedListener = vi.fn();
      bootstrapPromiseListener = vi.fn();

      runtime.subscribe('initializing', initializingListener);
      runtime.subscribe('instances', instancesListener);
      runtime.subscribe('bootstrapped', bootstrappedListener);
      runtime.subscribe('bootstrapPromise', bootstrapPromiseListener);

      await runtime.bootstrap();
    });
    it('should determine and debug log init dependencies', () => {
      expect(logger.debug).toHaveBeenCalledWith('Init dependencies (lazy=false)', determineInitDeps(depsDefinition));
    });
    it('should determine and debug log init order', () => {
      expect(logger.debug).toHaveBeenCalledWith(
        'Initialization order',
        determineDepsOrder(determineInitDeps(depsDefinition), createDepsGraph(depsDefinition)),
      );
    });
    it('should publish initializing dependencies to listener', () => {
      expect(initializingListener).toHaveBeenCalledWith(['charlie']);
      expect(initializingListener).toHaveBeenCalledWith(['bravo']);
      expect(initializingListener).toHaveBeenCalledWith(['alpha']);
      expect(initializingListener).toHaveBeenLastCalledWith([]);
    });
    it('should publish initialized dependencies (instances) to listener', () => {
      expect(instancesListener).toHaveBeenCalledWith({
        charlie: depsInstance.charlie,
      });
      expect(instancesListener).toHaveBeenCalledWith({
        charlie: depsInstance.charlie,
        bravo: depsInstance.bravo,
      });
      expect(instancesListener).toHaveBeenLastCalledWith({
        charlie: depsInstance.charlie,
        bravo: depsInstance.bravo,
        alpha: depsInstance.alpha,
      });
    });
    it('should call factory methods of "charlie", "bravo" and "alpha" with needed dependencies', () => {
      expect(depsFactory.charlie).toHaveBeenCalledTimes(1);
      expect(depsFactory.charlie).toHaveBeenLastCalledWith({});

      expect(depsFactory.bravo).toHaveBeenCalledTimes(1);
      expect(depsFactory.bravo).toHaveBeenLastCalledWith({ charlie: depsInstance.charlie });

      expect(depsFactory.alpha).toHaveBeenCalledTimes(1);
      expect(depsFactory.alpha).toHaveBeenLastCalledWith({
        charlie: depsInstance.charlie,
        bravo: depsInstance.bravo,
      });
    });
    it('should return stable (the same) promise when bootstrap() function is called again', () => {
      const promiseA = runtime.bootstrap();
      const promiseB = runtime.bootstrap();
      expect(promiseA === promiseB).toBeTruthy();
    });
  });
  describe('after bootstrap', () => {
    beforeEach(async () => {
      await runtime.bootstrap();
    });
    describe('resolve()', () => {
      describe('resolve already initialized dependency "alpha"', () => {
        it('should return cached resolver', async () => {
          const dependency = await runtime.resolve('alpha');
          expect(dependency).toStrictEqual(depsInstance.alpha);
          expect(logger.debug).toHaveBeenLastCalledWith('Dependency "alpha" already has a resolver. Skip resolve.');
        });
        it('should return stable (the same) resolver promise', () => {
          runtime.subscribe('resolvers', console.log);
          const promiseA = runtime.resolve('alpha');
          const promiseB = runtime.resolve('alpha');
          expect(promiseA === promiseB).toBeTruthy();
        });
      });
      describe('resolve uninitialized dependency "lazyDelta"', () => {
        it('should initialize dependency and update state accordingly', async () => {
          const initializingListener = vi.fn();
          const instancesListener = vi.fn();
          const resolversListener = vi.fn();

          runtime.subscribe('initializing', initializingListener);
          runtime.subscribe('instances', instancesListener);
          runtime.subscribe('resolvers', resolversListener);

          const initPromise = runtime.resolve('lazyDelta');

          expect(initializingListener).toHaveBeenCalledTimes(1);
          expect(initializingListener).toHaveBeenLastCalledWith(['lazyDelta']);
          expect(runtime.getInitializing()).toStrictEqual(['lazyDelta']);
          expect(logger.debug).toHaveBeenCalledWith(
            `Initializing dependency "lazyDelta" with needs on (${depsDefinition.lazyDelta.needs.join(', ')}) and lazy needs on (${depsDefinition.lazyDelta.needsLazy.join(', ')})...`,
          );
          expect(logger.debug).toHaveBeenCalledWith('Resolved needed instances for dependency "lazyDelta"', {
            alpha: depsInstance.alpha,
            bravo: depsInstance.bravo,
            charlie: depsInstance.charlie,
          });
          expect(logger.debug).toHaveBeenCalledWith('Resolved lazy needed instances for dependency "lazyDelta"', {
            lazyEcho: expect.any(Function) as never,
          });

          const instance = await initPromise;

          expect(logger.debug).toHaveBeenCalledWith('Dependency "lazyDelta" initialized', depsInstance.lazyDelta);
          expect(instancesListener).toHaveBeenCalledTimes(1);
          expect(instancesListener).toHaveBeenLastCalledWith({
            charlie: depsInstance.charlie,
            bravo: depsInstance.bravo,
            alpha: depsInstance.alpha,
            lazyDelta: depsInstance.lazyDelta,
          });
          expect(initializingListener).toHaveBeenCalledTimes(2);
          expect(initializingListener).toHaveBeenLastCalledWith([]);
          expect(resolversListener).toHaveBeenCalledTimes(1);
          expect(resolversListener).toHaveBeenLastCalledWith({
            charlie: expect.any(Promise) as Promise<Type['charlie']>,
            bravo: expect.any(Promise) as Promise<Type['bravo']>,
            alpha: expect.any(Promise) as Promise<Type['alpha']>,
            lazyDelta: expect.any(Promise) as Promise<Type['lazyDelta']>,
          });
          expect(instance).toStrictEqual(depsInstance.lazyDelta);
        });
      });
    });
    describe('resolveSync()', () => {
      it('should throw exception if non-initialized dependency is accessed', () => {
        expect(() => runtime.resolveSync('lazyEcho')).toThrowError(
          'Illegal access on non-initialized dependency "lazyEcho". Make sure to initialize dependencies before any synchronous access.',
        );
      });
      it('should return cached instance of requested dependency', () => {
        expect(runtime.resolveSync('charlie')).toStrictEqual(depsInstance.charlie);
      });
    });
    describe('getInitializing()', () => {
      it('should return empty array', () => {
        expect(runtime.getInitializing()).toStrictEqual([]);
      });
    });
    describe('getInitialized()', () => {
      it('should return ["charlie", "bravo", "alpha"]', () => {
        expect(runtime.getInitialized()).toStrictEqual(['charlie', 'bravo', 'alpha']);
      });
    });
    describe('isBootstrapped()', () => {
      it('should return true', () => {
        expect(runtime.isBootstrapped()).toBeTruthy();
      });
    });
    describe('internalInitializeDep()', () => {
      it('should throw exception if required (needs) dependency is missing', async () => {
        // Assert unexpected needed dependency on "lazyEcho"
        runtime['depsDefinition']['lazyEcho'].needs = ['myUnknownKey' as DepsKey<Type>];

        await expect(() => runtime['internalInitializeDep']('lazyEcho')).rejects.toThrowError(
          'Missing needed dependency instance "myUnknownKey" whilst initializing dependency "lazyEcho".',
        );
      });
    });
  });
});
