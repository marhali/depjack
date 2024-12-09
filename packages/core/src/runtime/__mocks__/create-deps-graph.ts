import { DepsGraph } from '@depjack/core/definition/graph.ts';
import { vi } from 'vitest';

export const mockedCreateDepsGraph: DepsGraph<Record<string, unknown>> = {};

const createDepsGraph = vi.fn(() => mockedCreateDepsGraph);

export default createDepsGraph;
