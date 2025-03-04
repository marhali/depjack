import { describe, it, expect, vi } from 'vitest';
import type { DepsRuntime } from '@depjack/core/runtime/deps-runtime';
import { act, renderHook } from '@testing-library/react';
import useBootstrapDepsRuntime from '@depjack/react/use-bootstrap-deps-runtime';
import SuspenseWrapper from '@depjack/react/__tests__/suspense-wrapper';

describe('useBootstrapDepsRuntime()', () => {
  it('should should trigger suspense and resolve bootstrap promise', async () => {
    let bootstrapPromiseFunction: (() => void) | undefined;
    const bootstrapPromise = new Promise<void>((resolve) => (bootstrapPromiseFunction = resolve));
    const depsRuntime: DepsRuntime<never> = {
      bootstrap: vi.fn().mockReturnValue(bootstrapPromise),
    } as never;

    const { result } = await act(() =>
      renderHook(() => useBootstrapDepsRuntime(depsRuntime), { wrapper: SuspenseWrapper }),
    );

    expect(depsRuntime.bootstrap).toHaveBeenCalled();
    expect(result.current).toBeNull();

    await act(async () => {
      bootstrapPromiseFunction!();
      await bootstrapPromise;
    });

    expect(depsRuntime.bootstrap).toHaveResolved();
  });
});
