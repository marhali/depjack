import { describe, it, expect, vi } from 'vitest';
import type { DepsDefinition } from '@/core/definition';
import type { DepsFactory } from '@/core/factory';
import type { Logger } from '@/core/supportive/logger';
import DepsRuntimeImpl from '@/core/runtime/deps-runtime-impl';
import createDepsRuntime from '@/core/runtime/create-deps-runtime';

vi.mock('@/core/runtime/deps-runtime-impl');

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
