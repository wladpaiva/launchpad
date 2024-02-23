import {preset} from '@repo/design-system/unocss.config'
import {theme} from '@unocss/preset-mini'

import {defineConfig} from 'unocss'

export default defineConfig({
  content: {
    filesystem: [
      '**/*.{ts,tsx,mdx,md}',
      '../../packages/design-system/**/*.{ts,tsx}',
    ],
  },
  presets: [preset],
  theme: {
    fontFamily: {
      sans: ['var(--font-sans)', ...theme.fontFamily.sans],
    },
    breakpoints: {
      xs: '425px',
      ...theme.breakpoints,
    },
  },
  rules: [['scrollbar-stable', {'scrollbar-gutter': 'stable'}]],
})
