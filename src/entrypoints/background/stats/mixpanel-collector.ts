import type { StatsEvent } from '~/shared/stats'
import type { Collector } from './types'

const domains: Readonly<Array<string>> = [
  'api-eu.mixpanel.com', // european region
  'api.mixpanel.com', // us region
  'mx.random-user-agent.com', // a custom proxy (deployed on CF workers) to bypass the mixpanel domain block
]

/** Mixpanel collector */
export default class implements Collector {
  private readonly userID: string
  private readonly extVersion: string | undefined
  private readonly osFamily: string | undefined
  private readonly browser: string | undefined

  /** the last domain that the request was sent to with success */
  private lastWorkedDomain: string | undefined

  constructor(userID: string, opts: Partial<{ extVersion: string; osFamily: string; browser: string }> = {}) {
    this.userID = userID
    this.extVersion = opts.extVersion
    this.osFamily = opts.osFamily
    this.browser = opts.browser
  }

  async send(...events: Array<StatsEvent>): Promise<Error | undefined> {
    if (events.length === 0) {
      return
    }

    // test if the project token is set in the vite config
    if (typeof __MIXPANEL_PROJECT_TOKEN__ !== 'string' || __MIXPANEL_PROJECT_TOKEN__.length === 0) {
      return
    }

    // https://developer.mixpanel.com/reference/track-event
    const mixEvents: Array<{
      event: string
      properties: {
        token: string // project token
        time: number // the time at which the event occurred, in seconds or milliseconds since UTC epoch
        distinct_id: string // the unique identifier for the user
        // data structure properties - https://docs.mixpanel.com/docs/data-structure/property-reference
        $os: string // the operating system of the user's device
        $app_version_string: string // the version of the extension
        [key: string]: unknown // allow any other properties
      }
    }> = []

    for (const event of events) {
      if (!event.name) {
        continue
      }

      mixEvents.push({
        event: event.name,
        properties: {
          token: __MIXPANEL_PROJECT_TOKEN__,
          time: Date.now(),
          distinct_id: this.userID,
          $os: this.osFamily ?? 'unknown',
          $app_version_string: this.extVersion ?? 'unknown',
          $browser: this.browser ?? 'unknown',
          ...event.props,
        },
      })
    }

    if (mixEvents.length === 0) {
      return
    }

    const payload = JSON.stringify(mixEvents)
    let lastError: Error | undefined = undefined

    for (const domain of this.lastWorkedDomain ? [this.lastWorkedDomain] : domains) {
      const url = new URL(`/track?_=${Date.now().toString()}&ip=1`, `https://${domain}`)

      try {
        const resp = await fetch(url, {
          method: 'POST',
          priority: 'low',
          cache: 'no-cache',
          headers: { accept: 'text/plain', 'content-type': 'application/json' },
          body: payload,
        })

        if (!resp.ok) {
          lastError = new Error(`Failed to send events: ${resp.statusText}`)
          continue
        }

        const text = await resp.text()

        if (text.trim() !== '1') {
          lastError = new Error(`Failed to send events: unexpected response: ${text}`)
          continue
        }

        lastError = undefined // unset the last error, if we reached this point, then the request was successful
        this.lastWorkedDomain = domain // save the last domain that the request was sent to with success

        break
      } catch (e) {
        if (e instanceof Error) {
          // if you got an error here with the message "TypeError: NetworkError when attempting to fetch resource"
          // and something about "CORS policy", then it's probably because the FireFox browser needs an additional
          // permission (https://discourse.mozilla.org/t/permissions-not-being-asked-upon-add-on-installation/110570/3)
          lastError = e
        } else {
          lastError = new Error(`Failed to send events: ${e}`)
        }
      }

      if (!lastError) {
        break
      }
    }

    return lastError
  }
}
