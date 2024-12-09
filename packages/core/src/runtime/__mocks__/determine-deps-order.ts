import { DepsKey } from '@depjack/core/definition/definition.ts';
import { vi } from 'vitest';

export const mockedDetermineDepsOrder: DepsKey<Record<string, unknown>>[] = [];

const determineDepsOrder = vi.fn(() => mockedDetermineDepsOrder);

export default determineDepsOrder;
