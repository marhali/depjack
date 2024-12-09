import { describe, it, expect } from 'vitest';
import determineDepsOrder from '@depjack/core/runtime/determine-deps-order.ts';

describe('determineDepsOrder()', () => {
  describe('with zero deps', () => {
    it('should return empty array', () => {
      expect(determineDepsOrder(new Set<string>(), {})).toStrictEqual([]);
    });
  });
  describe('with one deps', () => {
    it('should return only self key', () => {
      expect(determineDepsOrder<{ self: unknown }>(new Set(['self']), { self: new Set() })).toStrictEqual(['self']);
    });
  });
  describe('with direct predecessors', () => {
    it('should return all predecessors and self as last key', () => {
      const order = determineDepsOrder<{ pre_1: unknown; pre_2: unknown; self: unknown; other: unknown }>(
        new Set(['self']),
        {
          pre_1: new Set(),
          pre_2: new Set(),
          self: new Set(['pre_1', 'pre_2']),
          other: new Set(),
        },
      );

      expect(order).toStrictEqual(['pre_1', 'pre_2', 'self']);
    });
  });
  describe('with transitive predecessors', () => {
    const order = determineDepsOrder<{
      pre_1_a: unknown;
      pre_1: unknown;
      pre_2_a: unknown;
      pre_2: unknown;
      self: unknown;
      other: unknown;
    }>(new Set(['self']), {
      pre_1_a: new Set(),
      pre_1: new Set(['pre_1_a']),
      pre_2_a: new Set(),
      pre_2: new Set(['pre_2_a']),
      self: new Set(['pre_1', 'pre_2']),
      other: new Set(),
    });

    expect(order).toStrictEqual(['pre_1_a', 'pre_1', 'pre_2_a', 'pre_2', 'self']);
  });
  describe('with circular predecessors', () => {
    it('should throw exception with occurring key', () => {
      expect(() =>
        determineDepsOrder<{ a: unknown; b: unknown }>(new Set(['a', 'b']), { a: new Set(['b']), b: new Set(['a']) }),
      ).toThrow('Detected circular dependency on "a".');
    });
  });
});
