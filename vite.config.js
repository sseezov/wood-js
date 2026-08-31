import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'index.js',
      name: 'woodjsx',
      fileName: 'woodjsx',
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
    minify: 'esbuild',
    sourcemap: true,
  },
});