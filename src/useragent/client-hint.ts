import UseragentInfo from './useragent-info'

interface IBrand {
  brand, version: string
}

export default class ClientHint {
  /**
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Sec-CH-UA
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Sec-CH-UA-Full-Version-List
   *
   * examples of Sec-CH-UA headers (Chromium, Chrome, Edge, and Opera):
   *  "(Not(A:Brand";v="8", "Chromium";v="98"
   *  " Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"
   *  " Not A;Brand";v="99", "Chromium";v="96", "Microsoft Edge";v="96"
   *  "Opera";v="81", " Not;A Brand";v="99", "Chromium";v="95"
   *
   * examples of Sec-CH-UA-Full-Version-List headers:
   *  " Not A;Brand";v="99.0.0.0", "Chromium";v="98.0.4750.0", "Google Chrome";v="98.0.4750.0"
   */
  static brands(info: UseragentInfo, fullVersion: boolean): {list: IBrand[], string: string} {
    const parts: IBrand[] = [ // for every case
      // (in theory, for ff and safari we shouldn't give anything away, but...)
      {brand: '(Not(A:Brand', version: fullVersion ? '99.0.0.0' : '99'}
    ]

    // for Chromium-based browsers only (firefox and safari has no support of "Sec-CH-UA"
    // header - <https://caniuse.com/?search=Sec-CH-UA>)
    if (info.engine === 'blink') {
      const browserVersion: string = fullVersion
        ? info.browserVersion.full
        : info.browserVersion.major.toString()

      parts.push({brand: 'Chromium', version: browserVersion})

      if (info.browser === 'chrome') { // for Google Chrome
        parts.push({brand: 'Google Chrome', version: browserVersion})
      }

      if (info.brandBrowserVersion) {
        const brandVersion: string = fullVersion
          ? info.brandBrowserVersion.full
          : info.brandBrowserVersion.major.toString()

        switch (info.browser) {
          case 'edge':
            parts.push({brand: 'Microsoft Edge', version: brandVersion})
            break

          case 'opera':
            parts.push({brand: 'Opera', version: brandVersion})
            break
        }
      }
    }

    return {
      list: parts,
      string: parts.map(value => `"${value.brand}";v="${value.version}"`).join(', ')
    }
  }

  /**
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/sec-ch-ua-platform#directives
   */
  static platform(info: UseragentInfo): string {
    enum UaPlatform {
      Android = 'Android',
      ChromeOS = 'Chrome OS',
      ChromiumOS = 'Chromium OS',
      iOS = 'iOS',
      Linux = 'Linux',
      macOS = 'macOS',
      Windows = 'Windows',
      Unknown = 'Unknown',
    }

    switch (info.osType) {
      case 'windows':
        return UaPlatform.Windows

      case 'linux':
        return UaPlatform.Linux

      case 'macOS':
        return UaPlatform.macOS

      case 'iOS':
        return UaPlatform.iOS

      case 'android':
        return UaPlatform.Android

      default:
        return UaPlatform.Unknown
    }
  }

  /**
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Sec-CH-UA-Mobile
   */
  static isMobile(info: UseragentInfo): {bool: boolean, string: string} {
    switch (info.osType) {
      case 'android':
      case 'iOS':
        return {bool: true, string: '?1'}

      default:
        return {bool: false, string: '?0'}
    }
  }
}
