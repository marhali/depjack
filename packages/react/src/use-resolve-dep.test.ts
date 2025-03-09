import { describe, it, expect, vi } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import type { DepsRuntime } from '@depjack/core';
import useResolveDep from '@/react/use-resolve-dep';
import SuspenseWrapper from '@/react/__tests__/suspense-wrapper';

describe('useResolveDep()', () => {
  it('should trigger suspense and return resolved dependency when ready', async () => {
    let resolvePromiseFunction: ((payload: string) => void) | undefined;
    const resolvePromise = new Promise<string>((resolve) => (resolvePromiseFunction = resolve));
    const depsRuntime: DepsRuntime<{ myDep: string }> = {
      resolve: vi.fn().mockReturnValue(resolvePromise),
    } as never;

    const { result } = await act(() =>
      renderHook(() => useResolveDep(depsRuntime, 'myDep'), { wrapper: SuspenseWrapper }),
    );

    expect(depsRuntime.resolve).toHaveBeenCalledWith('myDep');
    expect(result.current).toBeNull();

    act(() => {
      resolvePromiseFunction!('myResolvedDep');
    });

    await waitFor(() => expect(result.current).toBe('myResolvedDep'));
  });
});
