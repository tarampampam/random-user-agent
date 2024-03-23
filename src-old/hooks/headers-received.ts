import Settings from '../settings/settings'
import Useragent from '../useragent/useragent'
import FilterService from '../services/filter-service'
import BlockingResponse = chrome.webRequest.BlockingResponse
import WebResponseHeadersDetails = chrome.webRequest.WebResponseHeadersDetails
import UseragentInfo from '../useragent/useragent-info'

declare var __UNIQUE_RUA_COOKIE_NAME__: string // see the webpack config, section "plugins" (webpack.DefinePlugin)
export const CookieName: string = __UNIQUE_RUA_COOKIE_NAME__

export interface Payload {
  uaInfo: UseragentInfo
}

export function encode(payload: Payload): string {
  return window.btoa(
    unescape(
      encodeURIComponent(
        JSON.stringify(payload),
      ),
    ),
  ).replace(/=/g, '-')
}

export function decode(str: string): Payload {
  return JSON.parse(
    decodeURIComponent(
      escape(
        window.atob(
          str.replace(/-/g, '='),
        ),
      ),
    ),
  )
}

export default class HeadersReceived {
  private readonly settings: Settings
  private readonly useragent: Useragent
  private readonly filterService: FilterService

  constructor(settings: Settings, useragent: Useragent, filterService: FilterService) {
    this.settings = settings
    this.useragent = useragent
    this.filterService = filterService
  }

  /**
   * Great thanks to <https://github.com/neroux> (your idea is amazing!)
   *
   * @link https://developer.chrome.com/docs/extensions/reference/webRequest/ chrome.webRequest
   */
  listen(): void {
    const extraInfoSpec = ['blocking', 'responseHeaders'] // common

    if (this.extraHeadersAreAllowed()) { // FireFox does not support 'extraHeaders' - https://git.io/JP0Cp
      extraInfoSpec.push('extraHeaders') // extraHeaders - https://stackoverflow.com/a/66558910/2252921
    }

    chrome.webRequest.onHeadersReceived.addListener(
      (details: WebResponseHeadersDetails): BlockingResponse | void => {
        if (details.type === 'main_frame' || details.type === 'sub_frame') {
          const settings = this.settings.get()

          if (settings.enabled && settings.jsProtection.enabled && this.filterService.applicableToURI(details.url)) {
            const useragent = this.useragent.get().info

            if (details.responseHeaders && useragent !== undefined) {
              const date = new Date()
              date.setTime(date.getTime() + 60 * 1000) // +60 seconds

              const payload: Payload = {
                uaInfo: useragent,
              }

              details.responseHeaders.push({
                name: 'Set-Cookie',
                value: `${CookieName}=${encode(payload)}; expires=${date.toUTCString()}; path=/`,
              })

              return {responseHeaders: details.responseHeaders}
            }
          }
        }
      },
      {urls: ['<all_urls>']},
      extraInfoSpec,
    )
  }

  private extraHeadersAreAllowed(): boolean {
    const fooHandler = (): void => {}

    let result: boolean = false

    try {
      chrome.webRequest.onHeadersReceived.addListener(fooHandler, {urls: ['https://example.com/']}, ['extraHeaders'])

      result = true
    } catch (e) {
      result = false
    } finally {
      chrome.webRequest.onHeadersReceived.removeListener(fooHandler)
    }

    return result
  }
}
