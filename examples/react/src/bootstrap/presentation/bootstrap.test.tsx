import { describe, it, expect, vi } from 'vitest';
import { act, render } from '@testing-library/react';
import rootDepsRuntime from '~/react/bootstrap/root-deps-runtime';
import Bootstrap from '~/react/bootstrap/presentation/bootstrap';

describe('<Bootstrap />', () => {
  it('should bootstrap deps runtime', async () => {
    const spy = vi.spyOn(rootDepsRuntime, 'bootstrap');

    await act(() => render(<Bootstrap />));
    expect(spy).toHaveBeenCalled();
  });
});
