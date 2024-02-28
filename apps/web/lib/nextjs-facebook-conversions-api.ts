/**
 * This file contains functions for interacting with the Facebook Conversions API in a Next.js web application.
 * It exports the following functions:
 * - `pageView()`: Sends a page view event to the Facebook Conversions API.
 * - `track()`: Sends a custom event to the Facebook Conversions API.
 */

import 'server-only'

import {headers} from 'next/headers'

import {auth} from './auth'
import {FACEBOOK_CONVERSIONS_API_TOKEN} from './env.server'
import {
  EventData,
  FacebookConversionsClient,
  type EventName,
} from './facebook-conversions-api'

const pixel = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL
const token = FACEBOOK_CONVERSIONS_API_TOKEN

export const facebookConversionsClient =
  token && pixel
    ? new FacebookConversionsClient({
        accessToken: token,
        pixelId: pixel,
      })
    : null

/**
 * Retrieves the client IP address from the request headers.
 * If the IP address is not available, it falls back to '0.0.0.0'.
 * @returns The client IP address.
 */
function getIp() {
  const FALLBACK_IP_ADDRESS = '0.0.0.0'
  const forwardedFor = headers().get('x-forwarded-for')

  if (forwardedFor) {
    return forwardedFor.split(',')[0] ?? FALLBACK_IP_ADDRESS
  }

  return headers().get('x-real-ip') ?? FALLBACK_IP_ADDRESS
}

/**
 * Retrieves the request data needed for sending events to the Facebook Conversions API.
 * @returns The request data object.
 */
async function getRequestData() {
  const headersList = headers()
  const referer = headersList.get('referer') as string
  const userAgent = headersList.get('user-agent') as string
  const session = await auth()

  const firstName = session?.user.name?.split(' ')[0]

  return {
    action_source: 'website' as const,
    event_source_url: referer,
    user_data: {
      client_ip_address: getIp(),
      client_user_agent: userAgent,
      em: session?.user.email ? [session?.user.email] : undefined,
      fn: firstName ? [firstName] : undefined,
    },
  }
}

/**
 * Sends a page view event to the Facebook Conversions API.
 */
export async function pageView() {
  const data = await getRequestData()
  await facebookConversionsClient?.pageView(data)
}

/**
 * Sends a custom event to the Facebook Conversions API.
 * @param event - The name of the event.
 * @param data - Additional data for the event.
 */
export async function track<T extends EventName>(
  event: T,
  data?: EventData<T>,
) {
  const requestData = await getRequestData()

  await facebookConversionsClient?.track({
    event_name: event,
    event_time: Math.floor(Date.now() / 1000),
    custom_data: data,
    ...requestData,
  })
}
