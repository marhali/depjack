/// <reference types="vitest" />
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import dtsPlugin from 'vite-plugin-dts';

export default defineConfig({
  plugins: [tsconfigPaths(), dtsPlugin({ rollupTypes: true })],
  build: {
    minify: false,
    lib: {
      formats: ['es', 'cjs'],
      entry: {
        index: 'src/index.ts',
      },
    },
  },
  test: {
    // ...
  },
});
