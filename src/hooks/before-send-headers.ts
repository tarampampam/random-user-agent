import Settings from '../settings/settings'
import FilterService from '../services/filter-service'

export default class BeforeSendHeaders {
  private readonly settings: Settings
  private readonly filterService: FilterService

  constructor(settings: Settings, filterService: FilterService) {
    this.settings = settings
    this.filterService = filterService
  }

  /**
   * @link https://developer.chrome.com/docs/extensions/reference/webRequest/ chrome.webRequest
   */
  listen(): void {
    chrome.webRequest.onBeforeSendHeaders.addListener((details): chrome.webRequest.BlockingResponse | void => {
      if (this.settings.isEnabled() && this.filterService.applicableToURI(details.url)) {
        if (details.requestHeaders) {
          for (let i = 0; i < details.requestHeaders.length; i++) {
            if (details.requestHeaders[i].name === 'User-Agent' && details.requestHeaders[i].value) {
              details.requestHeaders[i].value = this.settings.getUserAgent()

              break
            }
          }

          return {requestHeaders: details.requestHeaders}
        }
      }
    }, {urls: ['<all_urls>']}, ['blocking', 'requestHeaders'])
  }
}
