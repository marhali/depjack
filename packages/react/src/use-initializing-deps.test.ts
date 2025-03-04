import { describe, it, expect, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import type { DepsRuntime } from '@depjack/core/runtime/deps-runtime';
import useInitializingDeps from '@depjack/react/use-initializing-deps';

describe('useInitializingDeps()', () => {
  it('should return reactive list of dependencies that are in the process of initialization', () => {
    let subscribeListener: (() => void) | undefined;
    const depsRuntime: DepsRuntime<never> = {
      getInitializing: vi.fn(),
      subscribe: vi.fn((_, listener: (payload: never) => void) => (subscribeListener = listener as never)),
    } as never;

    const initialDeps = ['a', 'b', 'c'];
    vi.spyOn(depsRuntime, 'getInitializing').mockReturnValue(initialDeps);

    const { result } = renderHook(() => useInitializingDeps(depsRuntime));
    expect(result.current).toStrictEqual(initialDeps);
    expect(depsRuntime.subscribe).toHaveBeenLastCalledWith('initializing', subscribeListener);

    const updatedDeps = ['b', 'c', 'd'];
    act(() => {
      vi.spyOn(depsRuntime, 'getInitializing').mockReturnValue(updatedDeps);
      subscribeListener!();
    });

    expect(result.current).toStrictEqual(updatedDeps);
  });
});
