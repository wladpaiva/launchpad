let fb: typeof import('react-facebook-pixel')
let fbLoaded = false
type analyticFn = {payload: any}

let pixel: string | undefined
let pixelLoaded = false

/**
 * Set the custom pixel id to be used
 * @param id
 */
export function setPixelId(id: string) {
  pixel = id
}

/**
 * Enable client's Facebook Pixel on the page
 *
 * @param userConfig
 * @returns
 */
export default function customFacebookPixelPlugin(userConfig = {}) {
  return {
    name: 'custom-facebook-ads',
    config: {
      ...userConfig,
    },
    initialize: async () => {
      if (typeof window !== 'undefined') {
        await import('react-facebook-pixel').then(module => {
          fb = module.default
          fbLoaded = true
        })
      }
    },
    page: () => {
      if (pixel && !pixelLoaded) {
        fb.init(pixel, undefined, {
          autoConfig: true,
          debug: false,
        })
        pixelLoaded = true
      }

      if (pixelLoaded) {
        fb.pageView()
      }
    },
    track: ({payload}: analyticFn) => {
      if (pixelLoaded) {
        fb.track(payload.event, payload.properties)
      }
    },
    loaded: () => {
      return fbLoaded
    },
  }
}
