import {preset} from '@repo/design-system/unocss.config'

import {defineConfig} from 'unocss'

export default defineConfig({
  content: {
    filesystem: ['**/*.{ts,tsx}', '../design-system/**/*.{ts,tsx}'],
  },
  presets: [preset],
})
