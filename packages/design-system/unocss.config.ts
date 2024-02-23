// @ts-ignore - this package is forcing esm but it ships cjs within it
import presetAnimations from 'unocss-preset-animations'
// @ts-ignore - this package is forcing esm but it ships cjs within it
import {presetShadcn} from 'unocss-preset-shadcn'

import {definePreset, presetUno} from 'unocss'

export const preset = definePreset(() => {
  return {
    presets: [
      presetUno(),
      presetAnimations(),
      presetShadcn({
        // customize shadcn config here
      }),
    ],
  }
})
