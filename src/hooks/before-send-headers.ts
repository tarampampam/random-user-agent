import Settings from '../settings/settings'
import Useragent from '../useragent/useragent'
import FilterService from '../services/filter-service'
import BlockingResponse = chrome.webRequest.BlockingResponse
import WebRequestHeadersDetails = chrome.webRequest.WebRequestHeadersDetails
import UseragentInfo from '../useragent/useragent-info'

export default class BeforeSendHeaders {
  private readonly settings: Settings
  private readonly useragent: Useragent
  private readonly filterService: FilterService

  constructor(settings: Settings, useragent: Useragent, filterService: FilterService) {
    this.settings = settings
    this.useragent = useragent
    this.filterService = filterService
  }

  /**
   * @link https://developer.chrome.com/docs/extensions/reference/webRequest/ chrome.webRequest
   * @link https://stackoverflow.com/q/17567624/2252921 pass something to a content script
   */
  listen(): void {
    enum HeaderNames { // each should be in lower case
      userAgent = 'user-agent',
      secUa = 'sec-ch-ua', // https://mzl.la/3EaQyoi
      secUaFullVersion = 'sec-ch-ua-full-version-list', // https://mzl.la/3C3x5TT
      secUaPlatform = 'sec-ch-ua-platform', // https://mzl.la/3EbrbTj
      secUaMobile = 'sec-ch-ua-mobile', // https://mzl.la/3SYTA3f
    }

    chrome.webRequest.onBeforeSendHeaders.addListener(
      (details: WebRequestHeadersDetails): BlockingResponse | void => {
        if (this.settings.get().enabled && this.filterService.applicableToURI(details.url)) {
          const useragent = this.useragent.get().info

          if (details.requestHeaders && useragent !== undefined) {

            console.log(details.requestHeaders)

            for (let i = 0; i < details.requestHeaders.length; i++) {
              if (details.requestHeaders[i].value) {
                switch (details.requestHeaders[i].name.toLowerCase()) {
                  // set faked user-agent
                  case HeaderNames.userAgent:
                    details.requestHeaders[i].value = useragent.useragent
                    break

                  // set faked user agent hint
                  case HeaderNames.secUa:
                    details.requestHeaders[i].value = this.fakeClientHintUserAgentHeader(useragent, false)
                    break

                  // set faked user agent full version hint
                  case HeaderNames.secUaFullVersion:
                    details.requestHeaders[i].value = this.fakeClientHintUserAgentHeader(useragent, true)
                    break

                  // set faked platform
                  case HeaderNames.secUaPlatform:
                    details.requestHeaders[i].value = '"' + this.fakePlatform(useragent) + '"'
                    break

                  // set faked user agent mobile hint
                  case HeaderNames.secUaMobile:
                    details.requestHeaders[i].value = this.fakeClientHintMobileHeader(useragent)
                    break
                }
              }
            }

            return {requestHeaders: details.requestHeaders}
          }
        }
      },
      {urls: ['<all_urls>']},
      ['blocking', 'requestHeaders'],
    )
  }

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
   *
   * @private
   */
  private fakeClientHintUserAgentHeader(info: UseragentInfo, fullVersion: boolean): string {
    const parts: string[] = [ // for every case
      // (in theory, for ff and safari we shouldn't give anything away, but...)
      `"(Not(A:Brand";v="${fullVersion ? '99.0.0.0' : '99'}"`,
    ]

    // for Chromium-based browsers only (firefox and safari has no support of "Sec-CH-UA"
    // header - <https://caniuse.com/?search=Sec-CH-UA>)
    if (info.engine === 'blink') {
      const browserVersion: string = fullVersion
        ? info.browserVersion.full
        : info.browserVersion.major.toString()

      parts.push(`"Chromium";v="${browserVersion}"`)

      if (info.browser === 'chrome') { // for Google Chrome
        parts.push(`"Google Chrome";v="${browserVersion}"`)
      }

      if (info.brandBrowserVersion) {
        const brandVersion: string = fullVersion
          ? info.brandBrowserVersion.full
          : info.brandBrowserVersion.major.toString()

        switch (info.browser) {
          case 'edge':
            parts.push(`"Microsoft Edge";v="${brandVersion}"`)
            break

          case 'opera':
            parts.push(`"Opera";v="${brandVersion}"`)
            break
        }
      }
    }

    return parts.join(', ')
  }

  /**
   * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/sec-ch-ua-platform#directives
   *
   * @private
   */
  private fakePlatform(info: UseragentInfo): string {
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
   *
   * @private
   */
  private fakeClientHintMobileHeader(info: UseragentInfo): string {
    switch (info.osType) {
      case 'android':
      case 'iOS':
        return '?1'

      default:
        return '?0'
    }
  }
}
