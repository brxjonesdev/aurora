// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom', // for UI tests (you could change to "node" for pure service tests)
    include: ['src/lib/aurora/tests/**/*.test.ts'],
    globals: true,
    // if needed:
    // setupFiles: "./vitest.setup.ts"
  },
});
