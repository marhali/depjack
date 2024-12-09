import { vi } from 'vitest';

export const mockedTraverseDepGraph = new Set();

const traverseDepGraph = vi.fn(() => mockedTraverseDepGraph);

export default traverseDepGraph;
