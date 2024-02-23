import tsconfigPaths from 'vite-tsconfig-paths'
import {defaultExclude, defineConfig} from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    setupFiles: ['tests/setup.msw.ts'],
    exclude: ['**/*.spec.{ts,tsx}', ...defaultExclude],
  },
})
