export type BrowserName = 'chrome' | 'firefox' | 'opera' | 'edge' | 'unknown'

export default function detectBrowserName(): BrowserName { // order is important
  if (self.window['opr'] || self.window['opera']) { // https://stackoverflow.com/a/9851769/2252921
    return 'opera'
  }

  if (/Firefox|FxiOS/i.test(self.navigator.userAgent)) {
    return 'firefox'
  }

  if (/Edg/i.test(self.navigator.userAgent)) {
    return 'edge'
  }

  if (self.window['chrome'] || typeof chrome === 'object') { // https://stackoverflow.com/a/9851769/2252921
    return 'chrome'
  }

  return 'unknown'
}
