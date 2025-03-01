import { describe, it, expect, vi, beforeEach } from 'vitest';
import createPubSub, { type PubSub } from '@depjack/core/supportive/pub-sub';

describe('pub-sub', () => {
  describe('createPubSub()', () => {
    type Type = { string: string; number: number; boolean: boolean };
    let pubSub: PubSub<Type>;
    beforeEach(() => {
      pubSub = createPubSub();
    });
    it('should call registered listener when publish function has been called', () => {
      const listener = vi.fn();
      pubSub.subscribe('string', listener);
      pubSub.publish('string', 'sample');
      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener).toHaveBeenLastCalledWith('sample');
    });
    it('should only listen on specified key (topic)', () => {
      const stringListener = vi.fn();
      const numberListener = vi.fn();
      pubSub.subscribe('string', stringListener);
      pubSub.subscribe('number', numberListener);

      pubSub.publish('string', 'any string');
      pubSub.publish('number', 10);

      expect(stringListener).toHaveBeenCalledTimes(1);
      expect(stringListener).toHaveBeenLastCalledWith('any string');
      expect(numberListener).toHaveBeenCalledTimes(1);
      expect(numberListener).toHaveBeenLastCalledWith(10);
    });
    it('should unregister listener when teardown function has been called', () => {
      const listener = vi.fn();
      const teardownFunction = pubSub.subscribe('number', listener);
      pubSub.publish('number', 1);
      expect(listener).toHaveBeenCalledTimes(1);
      teardownFunction();
      pubSub.publish('number', 2);
      expect(listener).toHaveBeenCalledTimes(1);
    });
  });
});
