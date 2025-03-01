import { describe, it, expect } from 'vitest';
import determineInitDeps from '@depjack/core/runtime/determine-init-deps';

describe('determineInitDeps()', () => {
  it('should return all deps with lazy=false', () => {
    expect(
      determineInitDeps<{ lazy: unknown; nonLazyA: unknown; nonLazyB: unknown }>({
        lazy: {
          lazy: true,
          needs: [],
          needsLazy: [],
        },
        nonLazyA: {
          lazy: false,
          needs: [],
          needsLazy: [],
        },
        nonLazyB: {
          lazy: false,
          needs: [],
          needsLazy: [],
        },
      }),
    ).toStrictEqual(new Set(['nonLazyA', 'nonLazyB']));
  });
});
