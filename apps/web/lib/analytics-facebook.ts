let fb: any
let fbLoaded = false
type analyticFn = {payload: any}

type UserConfig = {pixelId: string}

export default function facebookPixelPlugin(userConfig: UserConfig) {
  return {
    name: 'facebook-ads',
    config: {
      ...userConfig,
    },
    initialize: async ({config}: {config: UserConfig}) => {
      const {pixelId} = config

      if (typeof window === 'undefined') return

      await import('react-facebook-pixel')
        .then(module => (fb = module.default))
        .then(() => {
          if (!fbLoaded) {
            fb.init(pixelId, undefined, {
              autoConfig: true,
              debug: false,
            })
            fbLoaded = true
          }
        })
    },
    page: () => {
      fb.pageView()
    },
    track: ({payload}: analyticFn) => {
      fb.track(payload.event, payload.properties)
    },
    loaded: () => {
      return fbLoaded
    },
  }
}
