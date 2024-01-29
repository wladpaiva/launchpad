import {preset} from '@repo/design-system/unocss.config'

import {defineConfig} from 'unocss'

const defaultFonts = [
  'ui-sans-serif',
  'system-ui',
  '-apple-system',
  'BlinkMacSystemFont',
  'Segoe UI',
  'Roboto',
  'Helvetica Neue',
  'Arial',
  'Noto Sans',
  'sans-serif',
  'Apple Color Emoji',
  'Segoe UI Emoji',
  'Segoe UI Symbol',
  'Noto Color Emoji',
]

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
      sans: ['var(--font-sans)', ...defaultFonts],
    },
  },
  rules: [['scrollbar-stable', {'scrollbar-gutter': 'stable'}]],
})
