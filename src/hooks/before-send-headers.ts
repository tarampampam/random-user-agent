import Settings from '../settings/settings'
import Useragent from '../useragent/useragent'
import FilterService from '../services/filter-service'
import browser from 'webextension-polyfill'

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
    browser.webRequest.onBeforeSendHeaders.addListener(
      (details) => {
        if (this.settings.get().enabled && this.filterService.applicableToURI(details.url)) {
          const useragent = this.useragent.get().info

          if (details.requestHeaders && useragent !== undefined) {
            for (let i = 0; i < details.requestHeaders.length; i++) {
              if (details.requestHeaders[i].name === 'User-Agent' && details.requestHeaders[i].value) {
                details.requestHeaders[i].value = useragent.useragent

                break
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
