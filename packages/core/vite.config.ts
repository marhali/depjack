/// <reference types="vitest" />
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import dtsPlugin from 'vite-plugin-dts';

export default defineConfig({
  plugins: [tsconfigPaths(), dtsPlugin({ rollupTypes: true })],
  build: {
    minify: false,
    lib: {
      entry: {
        definition: 'src/definition/index.ts',
        factory: 'src/factory/index.ts',
        runtime: 'src/runtime/index.ts',
      },
    },
  },
  test: {
    // ...
  },
});
