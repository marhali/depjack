import { describe, it, expect, vi, beforeEach } from 'vitest';
import createReactiveState, { type ReactiveState } from '@/core/supportive/reactive-state';

describe('reactive-state', () => {
  describe('createReactiveState()', () => {
    type Type = { string: string; number: number; boolean: boolean };
    let initialState: Type;
    let state: ReactiveState<Type>;
    beforeEach(() => {
      initialState = { string: 'myInitialString', number: 0, boolean: false };
      state = createReactiveState<Type>(initialState);
    });
    it('should set first state by provided initialState param', () => {
      expect(state.get('string')).toBe(initialState.string);
      expect(state.get('number')).toBe(initialState.number);
      expect(state.get('boolean')).toBe(initialState.boolean);
    });
    it('should override property by set() function and notify any registered listeners on this key', () => {
      const listener = vi.fn();
      state.subscribe('string', listener);
      expect(state.get('string')).toBe(initialState.string);
      state.set('string', 'myNewValue');
      expect(state.get('string')).toBe('myNewValue');
      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener).toHaveBeenLastCalledWith('myNewValue');
    });
    it('should return teardown function on subscribe function to unregister the listener', () => {
      const listener = vi.fn();
      const teardownFunction = state.subscribe('number', listener);
      state.set('number', 1);
      teardownFunction();
      state.set('number', 2);
      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener).toHaveBeenLastCalledWith(1);
    });
  });
});
