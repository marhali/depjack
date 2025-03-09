import createPubSub from '@/core/supportive/pub-sub';

/**
 * Represents a tracked state of key / value pairs.
 */
export type ReactiveState<T> = {
  /** Returns state value by key. */
  get: <Key extends keyof T>(key: Key) => Readonly<T[Key]>;

  /** Overrides a specified state value by key. */
  set: <Key extends keyof T, Value extends T[Key]>(key: Key, value: Value) => void;

  /** Registers a new listener that listens on the specified state key. */
  subscribe: <Key extends keyof T>(key: Key, listener: (payload: T[Key]) => void) => () => void;
};

/**
 * Creates a new tracked state instance.
 * @param initialState Initial state to apply
 */
function createReactiveState<T>(initialState: T): ReactiveState<T> {
  const state: T = initialState;
  const pubSub = createPubSub<T>();

  return {
    get: (key) => state[key],
    set: (key, value) => {
      state[key] = value;
      pubSub.publish(key, value);
    },
    subscribe: (key, listener) => pubSub.subscribe(key, listener),
  };
}

export default createReactiveState;
