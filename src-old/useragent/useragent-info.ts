export interface BrowserVersion {
  // major version number
  major: number

  // full and well-formatted version value in a string representation
  full: string
}

export default interface UseragentInfo { // link: <https://en.wikipedia.org/wiki/Comparison_of_browser_engines>
  useragent: string
  engine: 'webkit' // Apple, Safari browser, plus all browsers for iOS
    | 'blink' // Google, Google Chrome and all other Chromium-based browsers, notably Microsoft Edge, Vivaldi and Opera
    | 'gecko' // Mozilla, Firefox browser and Thunderbird email client
    | 'unknown' // For the user-defined user-agents
  osType: 'windows'
    | 'linux'
    | 'macOS'
    | 'iOS'
    | 'android'
    | 'unknown' // For the user-defined user-agents
  browser: 'chrome'
    | 'firefox'
    | 'opera'
    | 'safari'
    | 'edge'
    | 'unknown'

  // core browser version
  browserVersion: BrowserVersion

  // brand browser version (only for browsers like edge, opera, etc)
  brandBrowserVersion?: BrowserVersion
}
