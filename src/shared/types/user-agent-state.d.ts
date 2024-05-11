import type { DeepReadonly } from '~/types'

type UserAgentState = {
  userAgent: string
  browser:
    | 'chrome' // engine: "blink"
    | 'firefox' // engine: "gecko"
    | 'opera' // engine: "blink"
    | 'safari' // engine: "webkit"
    | 'edge' // engine: "blink"
    | 'unknown'
  os: 'windows' | 'linux' | 'macOS' | 'iOS' | 'android' | 'unknown'
  version: {
    /**
     * The browser version. Please note that some browsers are merely a 'wrapper' around the core browser engine.
     * For instance, Opera or Edge use Chrome under the hood. In such cases, this is the version of the brand browser.
     */
    browser: { major: number; full: string }
    /** If the browser is a wrapper around another browser, this is the version of the core browser. */
    underHood?: { major: number; full: string }
  }
}

export type ReadonlyUserAgentState = DeepReadonly<UserAgentState>
