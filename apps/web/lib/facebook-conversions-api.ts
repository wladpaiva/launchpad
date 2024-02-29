/**
 * Represents the custom data for a Facebook event.
 */
export interface CustomData {}

/**
 * Represents the data for the "AddPaymentInfo" event.
 */
export interface AddPaymentInfo extends CustomData {
  content_category?: string
  content_ids?: object[] | object
  contents?: object[]
  currency?: string
  value?: number
}

/**
 * Represents the data for the "AddToCart" event.
 */
export interface AddToCart extends CustomData {
  content_ids?: object[] | object
  content_name?: string
  content_type?: string
  contents?: object[]
  currency?: string
  value?: number
}

/**
 * Represents the data for the "AddToWishlist" event.
 */
export interface AddToWishlist extends CustomData {
  content_name?: string
  content_category?: string
  content_ids?: object[] | object
  contents?: object[]
  currency?: string
  value?: number
}

/**
 * Represents the data for the "CompleteRegistration" event.
 */
export interface CompleteRegistration extends CustomData {
  content_name?: String
  currency?: string
  status?: string
  value?: number
}

/**
 * Represents the data for the "InitiateCheckout" event.
 */
export interface InitiateCheckout extends CustomData {
  content_category?: string
  content_ids?: object[] | object
  contents?: object[]
  currency?: string
  num_items?: number
  value?: number
}

/**
 * Represents the data for the "Lead" event.
 */
export interface Lead extends CustomData {
  content_category?: string
  content_name?: string
  currency?: string
  value?: number
}

/**
 * Represents the data for the "Purchase" event.
 */
export interface Purchase extends CustomData {
  content_ids?: object[] | object
  content_name?: string
  content_type?: string
  contents?: object[]
  currency: string
  num_items?: number
  value: number
}

/**
 * Represents the data for the "Search" event.
 */
export interface Search extends CustomData {
  content_category?: string
  content_ids?: object[] | object
  contents?: object[]
  currency?: string
  search_string?: string
  value?: number
}

/**
 * Represents the data for the "StartTrial" event.
 */
export interface StartTrial extends CustomData {
  currency?: string
  predicted_ltv?: number
  value: number
}

/**
 * Represents the data for the "Subscribe" event.
 */
export interface Subscribe extends CustomData {
  currency?: string
  predicted_ltv?: number
  value: number
}

/**
 * Represents the data for the "ViewContent" event.
 */
export interface ViewContent extends CustomData {
  content_ids?: string[] | string
  content_name?: string
  content_type?: string
  contents?: object[]
  currency?: string
  value?: number
}

/**
 * Represents the possible sources of an action.
 */
export type ActionSource =
  | 'app'
  | 'chat'
  | 'email'
  | 'other'
  | 'phone_call'
  | 'physical_store'
  | 'system_generated'
  | 'website'
  | 'business_messaging'

/**
 * Represents the possible event names.
 */
export type EventName =
  | 'AddPaymentInfo'
  | 'AddToCart'
  | 'AddToWishlist'
  | 'CompleteRegistration'
  | 'Contact'
  | 'CustomizeProduct'
  | 'Donate'
  | 'FindLocation'
  | 'InitiateCheckout'
  | 'Lead'
  | 'PageView'
  | 'Purchase'
  | 'Schedule'
  | 'Search'
  | 'StartTrial'
  | 'SubmitApplication'
  | 'Subscribe'
  | 'ViewContent'
  | (string & {})

/**
 * Represents the event data for a specific event name.
 * @template T - The event name.
 * @param T - The event name.
 * @returns The event data for the specified event name.
 */
export type EventData<T extends EventName> = T extends 'AddPaymentInfo'
  ? AddPaymentInfo
  : T extends 'AddToCart'
    ? AddToCart
    : T extends 'AddToWishlist'
      ? AddToWishlist
      : T extends 'CompleteRegistration'
        ? CompleteRegistration
        : T extends 'InitiateCheckout'
          ? InitiateCheckout
          : T extends 'Lead'
            ? Lead
            : T extends 'Purchase'
              ? Purchase
              : T extends 'Search'
                ? Search
                : T extends 'StartTrial'
                  ? StartTrial
                  : T extends 'Subscribe'
                    ? Subscribe
                    : T extends 'ViewContent'
                      ? ViewContent
                      : CustomData

/**
 * Represents the user data for a Facebook event.
 */
export type UserData = {
  em?: string[]
  ph?: string[]
  fn?: string[]
  client_ip_address: string | null
  client_user_agent: string | null
}

/**
 * Represents the data for a Facebook event.
 * @template T - The event name.
 */
export type FacebookEventData<T extends EventName> = {
  event_name: T
  event_time: number
  action_source: ActionSource
  event_source_url: string
  user_data: UserData
  custom_data?: EventData<T>
}

/**
 * Represents the options for the FacebookConversionsClient class.
 */
export type FacebookConversionsClientOptions = {
  pixelId: string
  accessToken: string
  version?: string
}

/**
 * Represents a client for the Facebook Conversions API.
 */
export class FacebookConversionsClient {
  private pixelId: string
  private accessToken: string
  private version: string

  /**
   * Creates an instance of FacebookConversionsClient.
   * @param {FacebookConversionsClientOptions} options - The options for the client.
   */
  constructor({
    pixelId,
    accessToken,
    version = 'v19.0',
  }: FacebookConversionsClientOptions) {
    this.pixelId = pixelId
    this.accessToken = accessToken
    this.version = version
  }

  /**
   * Sends a "PageView" event to the Facebook Conversions API.
   * @param {FacebookEventData<"PageView">} data - The event data.
   */
  public async pageView(
    data: Omit<
      FacebookEventData<'PageView'>,
      'event_name' | 'event_time' | 'custom_data'
    >,
  ) {
    await this.track({
      event_name: 'PageView',
      event_time: Math.floor(Date.now() / 1000),
      ...data,
    })
  }

  /**
   * Sends a custom event to the Facebook Conversions API.
   * @template T - The event name.
   * @param {FacebookEventData<T>} data - The event data.
   */
  public async track<T extends EventName>(data: FacebookEventData<T>) {
    const body = {
      data: [data],
    }

    await this.graphApi<T>(body)
  }

  /**
   * Calculates the SHA-256 hash of a given input.
   * @param {string} input - The input string.
   * @returns {Promise<string>} - A promise that resolves to the SHA-256 hash.
   */
  public async calculateSHA256(input: string): Promise<string> {
    const encoder = new TextEncoder()
    const data = encoder.encode(input)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray
      .map(byte => byte.toString(16).padStart(2, '0'))
      .join('')
    return hashHex
  }

  /**
   * Makes a request to the Facebook Graph API.
   * @template T - The type of the response data.
   * @param {Object} options - The options for the request.
   * @param {string} options.endpoint - The endpoint of the API.
   * @param {object} options.body - The body of the request.
   * @returns {Promise<ResultType>} - A promise that resolves to the response data.
   * @throws {Error} - If an error occurs during the request.
   */
  private async graphApi<
    T extends EventName,
    ResultType extends object = object,
  >(body: {data: FacebookEventData<T>[]}): Promise<ResultType> {
    const request = new Request(
      `https://graph.facebook.com/${this.version}/${this.pixelId}/events?access_token=${this.accessToken}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...body,
          data: body.data.map(event => ({
            ...event,
            user_data: {
              ...event.user_data,
              fn: this.parseData(event.user_data.fn),
              em: this.parseData(event.user_data.em),
              ph: this.parseData(event.user_data.ph),
            },
          })),
        }),
      },
    )

    return fetch(request)
      .then(response => response.json() as Promise<ResultType>)
      .catch((e: Error) => {
        throw e
      })
  }

  private parseData(data?: string[]) {
    return data
      ? Promise.all(data.map(name => this.calculateSHA256(name)))
      : undefined
  }
}
