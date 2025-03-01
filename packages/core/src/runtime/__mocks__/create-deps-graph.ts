import { vi } from 'vitest';
import type { DepsGraph } from '@depjack/core/definition';

export const mockedCreateDepsGraph: DepsGraph<Record<string, unknown>> = {};

const createDepsGraph = vi.fn(() => mockedCreateDepsGraph);

export default createDepsGraph;
