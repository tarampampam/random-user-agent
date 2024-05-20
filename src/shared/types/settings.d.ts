import type { DeepPartial, DeepReadonly } from '~/types'

/**
 * Generator type.
 *
 * IMPORTANT NOTE: Don't forget to update the `settingsGeneratorTypes` array when you add or remove a generator type.
 */
export type SettingsGeneratorType =
  | 'chrome_win'
  | 'chrome_mac'
  | 'chrome_linux'
  | 'chrome_android'
  | 'firefox_win'
  | 'firefox_mac'
  | 'firefox_linux'
  | 'firefox_android'
  | 'opera_win'
  | 'opera_mac'
  | 'safari_iphone'
  | 'safari_mac'
  | 'edge_win'
  | 'edge_mac'

type SettingsState = {
  // Is the extension enabled?
  enabled: boolean

  // User-agent renewal options
  renew: {
    // Auto-renewal is enabled?
    enabled: boolean
    // Auto-renewal interval (in milliseconds)
    intervalMillis: number
    // Renewal on startup is enabled?
    onStartup: boolean
  }

  // Custom User-Agent options
  customUseragent: {
    // Custom User-Agent is enabled?
    enabled: boolean
    // Custom User-Agents list
    list: Array<string>
  }

  // Remote User-Agents list
  remoteUseragentList: {
    // Is enabled?
    enabled: boolean
    // Remote list URI
    uri: string
    // Update interval (in milliseconds)
    updateIntervalMillis: number
  }

  // Replace User-Agent using JavaScript?
  jsProtection: {
    // JS protection is enabled?
    enabled: boolean
  }

  // Generator settings
  generator: {
    // Generator types
    types: Array<SettingsGeneratorType>
    // Sync the host OS with the selected (if true, the `os` from the combinations will be ignored)
    syncOsWithHost: boolean
  }

  // Blacklist settings
  blacklist: {
    // Blacklist mode. If set to 'blacklist', the extension will work on EVERY domain, except the listed in the
    // 'domains' array. In 'whitelist' vice versa - the extension will work ONLY on the listed domains.
    mode: 'blacklist' | 'whitelist'
    // Domains list
    domains: Array<string>

    // DEPRECATED: Custom rules (simple patterns), managed by user
    // custom: {
    //   rules: string[]
    // }
  }

  // Usage statistics settings
  stats: {
    // Is enabled?
    enabled: boolean
  }
}

export type ReadonlySettingsState = DeepReadonly<SettingsState>
export type PartialSettingsState = DeepPartial<SettingsState>
