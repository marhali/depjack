import { describe, it, vi, expect } from 'vitest';
import createDepsGraph from '@depjack/core/runtime/create-deps-graph';
import traverseDepGraph from '@depjack/core/runtime/traverse-dep-graph';
import { mockedTraverseDepGraph } from '@depjack/core/runtime/__mocks__/traverse-dep-graph';
import type { DepsDefinition } from '@depjack/core/definition';

vi.mock('@depjack/core/runtime/traverse-dep-graph');

describe('createDepsGraph()', () => {
  describe('with empty deps definition', () => {
    it('should return empty graph', () => {
      expect(createDepsGraph({})).toStrictEqual({});
    });
  });
  describe('with non empty deps definition', () => {
    it('should return graph for each dependency', () => {
      const depsDefinition = {
        a: { lazy: false, needs: [], needsLazy: [] },
        b: { lazy: true, needs: [], needsLazy: [] },
      } satisfies DepsDefinition<{ a: unknown; b: unknown }>;

      const depsGraph = createDepsGraph(depsDefinition);

      expect(depsGraph).toStrictEqual({
        a: mockedTraverseDepGraph,
        b: mockedTraverseDepGraph,
      });

      expect(traverseDepGraph).toHaveBeenCalledWith('a', depsDefinition);
      expect(traverseDepGraph).toHaveBeenCalledWith('b', depsDefinition);
    });
  });
});
