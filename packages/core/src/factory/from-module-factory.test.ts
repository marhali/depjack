import { describe, it, expect, vi } from 'vitest';
import fromModuleFactory from '@/core/factory/from-module-factory';

describe('fromModuleFactory()', () => {
  it('should return callback function that resolves the moduleLoader and calls the factory method with needs as payload', async () => {
    const module = {
      factory: vi
        .fn<(needs: string) => Promise<string>>()
        .mockImplementation((needs) => Promise.resolve(`myResultWithPayload: ${needs}`)),
    };
    const moduleLoader = vi.fn<() => Promise<typeof module>>().mockResolvedValue(module);

    const moduleFactory = fromModuleFactory(moduleLoader);
    expect(moduleLoader).toHaveBeenCalledTimes(0);
    expect(module.factory).toHaveBeenCalledTimes(0);

    const result = await moduleFactory('myPayload');
    expect(result).toBe('myResultWithPayload: myPayload');
    expect(moduleLoader).toHaveBeenCalledTimes(1);
    expect(module.factory).toHaveBeenCalledTimes(1);
    expect(module.factory).toHaveBeenCalledWith('myPayload');
  });
});
