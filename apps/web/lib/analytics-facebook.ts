import type {
  pageView as serverPageView,
  track as serverTrack,
} from '@/lib/nextjs-facebook-conversions-api'
import type {init, pageView, track, trackSingle} from 'react-facebook-pixel'

type TrackProps = {payload: any}
type UserConfig = {pixelId: string}
type FacebookBrowser = {
  track: typeof track
  pageView: typeof pageView
  init: typeof init
  trackSingle: typeof trackSingle
}
type FacebookServer = {
  track: typeof serverTrack
  pageView: typeof serverPageView
}

let fbBrowser: FacebookBrowser | undefined
let fbServer: FacebookServer | undefined
let fbLoaded = false
let fbCustomPixelId: string | undefined

/**
 * Set the custom pixel id to be used
 * @param id
 */
export function setCustomPixelId(id: string) {
  fbCustomPixelId = id
  if (fbBrowser) {
    fbBrowser.init(id, undefined, {
      autoConfig: true,
      debug: true,
    })
    fbBrowser.trackSingle(id, 'PageView')
  }
}

export default function facebookPixelPlugin(userConfig: UserConfig) {
  return {
    name: 'facebook-ads',
    config: {
      ...userConfig,
    },
    initialize: async ({config}: {config: UserConfig}) => {
      const {pixelId} = config

      if (typeof window === 'undefined') {
        // TODO: https://discord.com/channels/752553802359505017/1212491162343055440/1212491162343055440
        // await import('@/lib/nextjs-facebook-conversions-api')
        //   .then(module => {
        //     fbServer = {
        //       track: module.track,
        //       pageView: module.pageView,
        //     }
        //   })
        //   .then(() => {
        //     fbLoaded = true
        //   })

        return
      }

      // load facebook pixel on the client side
      await import('react-facebook-pixel')
        .then(module => (fbBrowser = module.default))
        .then(() => {
          if (!fbLoaded) {
            fbBrowser?.init(pixelId, undefined, {
              autoConfig: true,
              debug: false,
            })

            if (fbCustomPixelId) {
              fbBrowser?.init(fbCustomPixelId, undefined, {
                autoConfig: true,
                debug: false,
              })
            }

            fbLoaded = true
          }
        })
    },
    page: () => {
      fbBrowser?.pageView()
      fbServer?.pageView()
    },
    track: ({payload}: TrackProps) => {
      fbBrowser?.track(payload.event, payload.properties)
      fbServer?.track(payload.event, payload.properties)
    },
    loaded: () => {
      return fbLoaded
    },
  }
}
