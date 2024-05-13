import type { SettingsGeneratorType } from './types'

/**
 * Holds all possible generator types.
 *
 * IMPORTANT NOTE: Don't forget to add or remove types from this list when you add or remove a generator type.
 */
export const allTypes: ReadonlyArray<SettingsGeneratorType> = Object.freeze(
  new Array<SettingsGeneratorType>(
    'chrome_win',
    'chrome_mac',
    'chrome_linux',
    'chrome_android',
    'firefox_win',
    'firefox_mac',
    'firefox_linux',
    'firefox_android',
    'opera_win',
    'opera_mac',
    'safari_iphone',
    'safari_mac',
    'edge_win',
    'edge_mac'
  ).sort()
)

export type BrowserType = 'chrome' | 'firefox' | 'safari' | 'edge' | 'opera'
export type OSType = 'linux' | 'windows' | 'macos' | 'ios' | 'android'

/** Convert an array of generator types to a tuple of browser and OS sets. The sets are sorted and deduplicated. */
export const toSets = (
  types: ReadonlyArray<SettingsGeneratorType>
): [ReadonlyArray<BrowserType>, ReadonlyArray<OSType>] => {
  const browsers = new Set<BrowserType>()
  const oses = new Set<OSType>()

  for (const type of types) {
    const [browser, os] = ((): readonly [BrowserType | undefined, OSType | undefined] => {
      switch (type) {
        case 'chrome_win':
          return ['chrome', 'windows']
        case 'chrome_mac':
          return ['chrome', 'macos']
        case 'chrome_linux':
          return ['chrome', 'linux']
        case 'chrome_android':
          return ['chrome', 'android']
        case 'firefox_win':
          return ['firefox', 'windows']
        case 'firefox_mac':
          return ['firefox', 'macos']
        case 'firefox_linux':
          return ['firefox', 'linux']
        case 'firefox_android':
          return ['firefox', 'android']
        case 'opera_win':
          return ['opera', 'windows']
        case 'opera_mac':
          return ['opera', 'macos']
        case 'safari_iphone':
          return ['safari', 'ios']
        case 'safari_mac':
          return ['safari', 'macos']
        case 'edge_win':
          return ['edge', 'windows']
        case 'edge_mac':
          return ['edge', 'macos']
        default:
          return [undefined, undefined]
      }
    })()

    browser && browsers.add(browser)
    os && oses.add(os)
  }

  return [Array.from(browsers).sort(), Array.from(oses).sort()]
}

/** Convert browser and OS sets to an array of generator types. The types are sorted and deduplicated. */
export const fromSets = (
  browsers: Array<BrowserType> | 'any',
  oses: Array<OSType> | 'any'
): Array<SettingsGeneratorType> => {
  const types = new Set<SettingsGeneratorType>()

  if (browsers === 'any') {
    browsers = ['chrome', 'firefox', 'opera', 'safari', 'edge']
  }

  for (const browser of browsers) {
    if (oses === 'any') {
      switch (browser) {
        case 'chrome':
          types.add('chrome_win')
          types.add('chrome_mac')
          types.add('chrome_linux')
          types.add('chrome_android')
          break
        case 'firefox':
          types.add('firefox_win')
          types.add('firefox_mac')
          types.add('firefox_linux')
          types.add('firefox_android')
          break
        case 'opera':
          types.add('opera_win')
          types.add('opera_mac')
          break
        case 'safari':
          types.add('safari_iphone')
          types.add('safari_mac')
          break
        case 'edge':
          types.add('edge_win')
          types.add('edge_mac')
          break
      }
    } else {
      for (const os of oses) {
        const type = ((): SettingsGeneratorType | undefined => {
          switch (true) {
            case browser === 'chrome' && os === 'linux':
              return 'chrome_linux'
            case browser === 'chrome' && os === 'macos':
              return 'chrome_mac'
            case browser === 'chrome' && os === 'windows':
              return 'chrome_win'
            case browser === 'chrome' && os === 'android':
              return 'chrome_android'
            case browser === 'firefox' && os === 'linux':
              return 'firefox_linux'
            case browser === 'firefox' && os === 'macos':
              return 'firefox_mac'
            case browser === 'firefox' && os === 'windows':
              return 'firefox_win'
            case browser === 'firefox' && os === 'android':
              return 'firefox_android'
            case browser === 'safari' && os === 'ios':
              return 'safari_iphone'
            case browser === 'safari' && os === 'macos':
              return 'safari_mac'
            case browser === 'opera' && os === 'windows':
              return 'opera_win'
            case browser === 'opera' && os === 'macos':
              return 'opera_mac'
            case browser === 'edge' && os === 'windows':
              return 'edge_win'
            case browser === 'edge' && os === 'macos':
              return 'edge_mac'
          }
        })()

        type && types.add(type)
      }
    }
  }

  return Array.from(types).sort()
}
