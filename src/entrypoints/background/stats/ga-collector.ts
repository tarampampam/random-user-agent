import type { StatsEvent } from '~/shared/stats'
import type { Collector } from './types'

const domains: Readonly<Array<string>> = [
  'www.google-analytics.com', // default domain
  'ga.random-user-agent.com', // a custom proxy (deployed on CF workers) to bypass the domain block
]

/**
 * Google Analytics collector.
 *
 * @link
 */
export default class implements Collector {
  private readonly userID: string
  private readonly extVersion: string | undefined
  private readonly osFamily: string | undefined
  private readonly browser: string | undefined
  private readonly sessionId: string = crypto.randomUUID()

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

    // test if the GA settings is set in the vite config
    if (typeof __GA_MEASUREMENT_ID__ !== 'string' || __GA_MEASUREMENT_ID__.length === 0) {
      return
    } else if (typeof __GA_API_SECRET__ !== 'string' || __GA_API_SECRET__.length === 0) {
      return
    }

    // docs:  https://developers.google.com/analytics/devguides/collection/protocol/ga4/sending-events
    // guide: https://developer.chrome.com/docs/extensions/how-to/integrate/google-analytics-4
    const gaEvents: Array<{
      name: string
      params: {
        [key: string]: unknown // allow any other properties
      }
    }> = []

    for (const event of events) {
      if (!event.name) {
        continue
      }

      gaEvents.push({
        name: event.name,
        params: {
          session_id: this.sessionId, // a special parameter to track the session
          engagement_time_msec: 100, // a special parameter to track the engagement time
          current_time: Date.now(),
          ext_os: this.osFamily ?? 'unknown',
          ext_version: this.extVersion ?? 'unknown',
          ext_browser: this.browser ?? 'unknown',
          ...event.props,
        },
      })
    }

    if (gaEvents.length === 0) {
      return
    }

    const payload = JSON.stringify({ client_id: this.userID, events: gaEvents })
    let lastError: Error | undefined = undefined

    for (const domain of this.lastWorkedDomain ? [this.lastWorkedDomain] : domains) {
      const url = new URL(
        `/mp/collect?measurement_id=${__GA_MEASUREMENT_ID__}&api_secret=${__GA_API_SECRET__}&_=${Date.now().toString()}`,
        `https://${domain}`
      )

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
