import type { DepsKey } from '@/core/definition';
import { vi } from 'vitest';

export const mockedDetermineDepsOrder: DepsKey<Record<string, unknown>>[] = [];

const determineDepsOrder = vi.fn(() => mockedDetermineDepsOrder);

export default determineDepsOrder;
