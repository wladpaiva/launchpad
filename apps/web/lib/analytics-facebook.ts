let fb: typeof import('react-facebook-pixel')
let fbLoaded = false
type analyticFn = {payload: any}

export default function facebookPixelPlugin(userConfig = {}) {
  return {
    name: 'facebook-ads',
    config: {
      ...userConfig,
    },
    initialize: async ({config}: {config: any}) => {
      const {pixelId} = config
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
