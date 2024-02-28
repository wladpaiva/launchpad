let fb: any
let fbLoaded = false
type analyticFn = {payload: any}

type UserConfig = {pixelId: string}

let customPixel: string | undefined

/**
 * Set the custom pixel id to be used
 * @param id
 */
export function setCustomPixelId(id: string) {
  customPixel = id
}

export default function facebookPixelPlugin(userConfig: UserConfig) {
  return {
    name: 'facebook-ads',
    config: {
      ...userConfig,
    },
    initialize: async ({config}: {config: UserConfig}) => {
      const {pixelId} = config
      if (typeof window !== 'undefined') {
        await import('react-facebook-pixel')
          .then(module => (fb = module.default))
          .then(() => {
            if (!fbLoaded) {
              fb.init(pixelId, undefined, {
                autoConfig: true,
                debug: true,
              })
              fbLoaded = true
            }
          })
      }
    },
    page: () => {
      fb.pageView()

      if (customPixel) {
        fb.trackSingle(customPixel, 'PageView')
      }
    },
    track: ({payload}: analyticFn) => {
      fb.track(payload.event, payload.properties)

      if (customPixel) {
        fb.trackSingle(customPixel, payload.event.payload.properties)
      }
    },
    loaded: () => {
      return fbLoaded
    },
  }
}
