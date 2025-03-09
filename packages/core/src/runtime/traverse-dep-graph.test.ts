import { describe, it, expect } from 'vitest';
import traverseDepGraph from '@/core/runtime/traverse-dep-graph';

describe('traverseDepGraph()', () => {
  describe('with zero descendants', () => {
    it('should return empty set', () => {
      const graph = traverseDepGraph('single', {
        single: { lazy: false, needs: [], needsLazy: [] },
        other: { lazy: false, needs: [], needsLazy: [] },
      });

      expect(graph).toStrictEqual(new Set());
    });
  });
  describe('with direct predecessors', () => {
    it('should return direct predecessors', () => {
      const graph = traverseDepGraph('self', {
        pre_1: { lazy: false, needs: [], needsLazy: [] },
        pre_2: { lazy: false, needs: [], needsLazy: [] },
        self: { lazy: false, needs: ['pre_1', 'pre_2'], needsLazy: [] },
        other: { lazy: false, needs: [], needsLazy: [] },
      });

      expect(graph).toStrictEqual(new Set(['pre_1', 'pre_2']));
    });
  });
  describe('with transitive predecessors', () => {
    it('should return direct and transitive predecessors', () => {
      const graph = traverseDepGraph('self', {
        pre_1_a: { lazy: false, needs: [], needsLazy: [] },
        pre_1: { lazy: false, needs: ['pre_1_a'], needsLazy: [] },
        pre_2_a: { lazy: false, needs: [], needsLazy: [] },
        pre_2: { lazy: false, needs: ['pre_2_a'], needsLazy: [] },
        self: { lazy: false, needs: ['pre_1', 'pre_2'], needsLazy: [] },
        other: { lazy: false, needs: [], needsLazy: [] },
      });

      expect(graph).toStrictEqual(new Set(['pre_1', 'pre_1_a', 'pre_2', 'pre_2_a']));
    });
  });
  describe('with circular predecessors', () => {
    it('should throw exception with occurring key', () => {
      expect(() =>
        traverseDepGraph('self', {
          self: { lazy: false, needs: ['other'], needsLazy: [] },
          other: { lazy: false, needs: ['self'], needsLazy: [] },
        }),
      ).toThrow('Detected circular dependency on "self".');
    });
  });
});
