import { vi } from 'vitest';

export const mockedDetermineInitDeps = new Set();

const determineInitDeps = vi.fn(() => mockedDetermineInitDeps);

export default determineInitDeps;
