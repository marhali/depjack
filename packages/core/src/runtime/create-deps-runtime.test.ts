import { describe, it, expect, vi } from 'vitest';
import { DepsDefinition } from '@depjack/core/definition/definition.ts';
import { DepsFactory } from '@depjack/core/factory.ts';
import { Logger } from '@depjack/core/supportive/logger.ts';
import DepsRuntimeImpl from '@depjack/core/runtime/deps-runtime-impl.ts';
import createDepsRuntime from '@depjack/core/runtime/create-deps-runtime.ts';

vi.mock('@depjack/core/runtime/deps-runtime-impl.ts');

describe('createDepsRuntime()', () => {
  type MyDeps = { sampleDep: string };

  const myDepsDefinition = {
    sampleDep: {
      lazy: true,
      needs: [],
      needsLazy: [],
    },
  } satisfies DepsDefinition<MyDeps>;

  const myDepsFactory = {
    sampleDep: () => Promise.resolve(''),
  } satisfies DepsFactory<MyDeps, typeof myDepsDefinition>;

  const logger = {
    log: () => {},
    info: () => {},
    debug: () => {},
    warn: () => {},
    error: () => {},
  } satisfies Logger;

  describe('with default options', () => {
    it('should return instanceof DepsRuntimeImpl and default console as logger', () => {
      const runtime = createDepsRuntime<MyDeps>(myDepsDefinition, myDepsFactory);

      expect(runtime).toBeInstanceOf(DepsRuntimeImpl);
      expect(DepsRuntimeImpl).toHaveBeenLastCalledWith(myDepsDefinition, myDepsFactory, console);
    });
  });
  describe('with custom options', () => {
    it('should return instanceof DepsRuntimeImpl with provided logger', () => {
      const runtime = createDepsRuntime(myDepsDefinition, myDepsFactory, { logger });

      expect(runtime).toBeInstanceOf(DepsRuntimeImpl);
      expect(DepsRuntimeImpl).toHaveBeenLastCalledWith(myDepsDefinition, myDepsFactory, logger);
    });
  });
});
