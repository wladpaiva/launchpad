import {preset} from '@repo/design-system/unocss.config'
import {Tailwind as TailwindBase} from 'jsx-email'

/**
 * Tailwind component for JSX Email templates already configured with the
 * design system's Tailwind preset.
 */
export const Tailwind = (props: React.PropsWithChildren) => (
  <TailwindBase
    config={{
      presets: [preset],
    }}
    {...props}
  />
)
