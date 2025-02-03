/**
 * Represents an instance of the publish-subscribe pattern using keys as channel topics.
 */
export type PubSub<T> = {
  /** Publishes a new message to all subscribed listeners by key (topic). */
  publish: <Key extends keyof T>(key: Key, payload: T[Key]) => void;

  /**
   * Registers a new subscriber for the specified key (topic).
   * Returns a teardown function which will unregister this listener if called.
   */
  subscribe: <Key extends keyof T>(key: Key, listener: (payload: T[Key]) => void) => () => void;
};

/**
 * Creates a new publish-subscribe instance.
 * @see PubSub
 */
function createPubSub<T>(): PubSub<T> {
  const listeners: Map<keyof T, ((payload: T[keyof T]) => void)[]> = new Map();
  return {
    publish: (key, payload) => {
      for (const listener of listeners.get(key) ?? []) {
        listener(payload);
      }
    },
    subscribe: (key, listener) => {
      const listenersByKey = listeners.get(key) ?? [];
      listenersByKey.push(listener as (payload: T[keyof T]) => void);
      listeners.set(key, listenersByKey);

      return () => {
        const filteredListenersByKey = listeners.get(key)?.filter((currentListener) => currentListener !== listener);
        if (!filteredListenersByKey || filteredListenersByKey.length === 0) {
          listeners.delete(key);
        } else {
          listeners.set(key, filteredListenersByKey);
        }
      };
    },
  };
}

export default createPubSub;
