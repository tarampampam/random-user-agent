export type BrowserName = 'chrome' | 'opera' | 'edge' | 'firefox'

export default function (): BrowserName | undefined {
  // order is important (based on https://stackoverflow.com/a/9851769/2252921)

  // @ts-expect-error window['opr'] is not defined in typescript
  if (self.window && (self.window['opr'] || self.window['opera'])) {
    // https://stackoverflow.com/a/9851769/2252921
    return 'opera'
  } else {
    // for background scripts
    // @ts-expect-error 'opr' is not defined in typescript
    if (self['opr']) {
      return 'opera'
    }
  }

  // @ts-expect-error window['browser'] is not defined in typescript
  if (typeof self['browser'] === 'object' && typeof self['browser'].runtime === 'object') {
    return 'firefox'
  } else {
    if (/Firefox|FxiOS/i.test(self.navigator.userAgent)) {
      return 'firefox'
    }
  }

  if (self.navigator && /Edg/i.test(self.navigator.userAgent)) {
    return 'edge'
  }

  if (self.window && (self.window['chrome'] || typeof chrome === 'object')) {
    return 'chrome'
  } else {
    // for background scripts
    if (!!self.chrome && !!self.chrome.runtime && !!self.chrome.runtime.id) {
      return 'chrome'
    }
  }

  return undefined
}
