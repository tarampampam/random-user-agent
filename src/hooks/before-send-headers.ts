import Settings from '../settings/settings'
import Useragent from '../useragent/useragent'
import FilterService from '../services/filter-service'
import BlockingResponse = chrome.webRequest.BlockingResponse
import WebRequestHeadersDetails = chrome.webRequest.WebRequestHeadersDetails
import ClientHint from '../useragent/client-hint'

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
      secUaFullVersion = 'sec-ch-ua-full-version', // deprecated, https://mzl.la/3g1NzEI
      secUaFullVersionList = 'sec-ch-ua-full-version-list', // https://mzl.la/3C3x5TT
      secUaPlatform = 'sec-ch-ua-platform', // https://mzl.la/3EbrbTj
      secUaMobile = 'sec-ch-ua-mobile', // https://mzl.la/3SYTA3f
    }

    chrome.webRequest.onBeforeSendHeaders.addListener(
      (details: WebRequestHeadersDetails): BlockingResponse | void => {
        if (this.settings.get().enabled && this.filterService.applicableToURI(details.url)) {
          const useragent = this.useragent.get().info

          if (details.requestHeaders && useragent !== undefined) {
            for (let i = 0; i < details.requestHeaders.length; i++) {
              if (details.requestHeaders[i].value) {
                switch (details.requestHeaders[i].name.toLowerCase()) {
                  case HeaderNames.userAgent:
                    details.requestHeaders[i].value = useragent.useragent
                    break

                  case HeaderNames.secUa:
                    details.requestHeaders[i].value = ClientHint.brands(useragent, false).string
                    break

                  case HeaderNames.secUaFullVersion:
                    details.requestHeaders[i].value = `"${useragent.browserVersion.full}"`
                    break

                  case HeaderNames.secUaFullVersionList:
                    details.requestHeaders[i].value = ClientHint.brands(useragent, true).string
                    break

                  case HeaderNames.secUaPlatform:
                    details.requestHeaders[i].value = `"${ClientHint.platform(useragent)}"`
                    break

                  case HeaderNames.secUaMobile:
                    details.requestHeaders[i].value = ClientHint.isMobile(useragent).string
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
}
