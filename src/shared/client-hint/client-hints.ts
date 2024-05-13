type Brand = { readonly brand: string; readonly version: string }

/**
 * Browser Client Hints provide information about the browser to the server through HTTP headers, which is then
 * exposed in the JavaScript environment. While it doesn't contain extensive user-specific information, it's
 * better to mask or replace the real browser name and version for privacy reasons.
 *
 * For example, the `Sec-CH-UA` header can be used to provide information about the browser engine and version.
 * The syntax of the header is as follows: `Sec-CH-UA: "<brand>";v="<significant version>", ...`. Here, `<brand>`
 * represents a brand associated with the user agent, such as "Chromium", "Google Chrome", or an intentionally
 * incorrect brand like "Not A;Brand". `<significant version>` is the "marketing" version number associated with
 * distinguishable web-exposed features.
 *
 * Real Example of the `Sec-CH-UA` Header (Google Chrome v123.0.6312.86):
 *
 * ```
 * Sec-Ch-Ua: "Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"
 * ```
 *
 * The same data is exposed in `navigator.userAgentData.getHighEntropyValues()` method. Executing this snippet on
 * any Chromium-based browser provides the same information as in the `Sec-CH-UA` header:
 *
 * ```javascript
 * JSON.stringify(await navigator.userAgentData.getHighEntropyValues(["brands"]))
 * ```
 *
 * This returns a JSON object with the following structure:
 *
 * ```json
 * {"brands":[
 *   {"brand":"Google Chrome","version":"123"},
 *   {"brand":"Not:A-Brand","version":"8"},
 *   {"brand":"Chromium","version":"123"}
 * ],"mobile":false,"platform":"Linux"}
 * ```
 *
 * Some more examples of the `Sec-CH-UA` header:
 *
 * - `"(Not(A:Brand";v="8", "Chromium";v="98"` (Chromium)
 * - `" Not A;Brand";v="99", "Chromium";v="96", "Google Chrome";v="96"` (Google Chrome)
 * - `" Not A;Brand";v="99", "Chromium";v="96", "Microsoft Edge";v="96"` (Microsoft Edge)
 * - `"Opera";v="81", " Not;A Brand";v="99", "Chromium";v="95"` (Opera)
 *
 * Note: not all browsers support client hints, you can check the support status here:
 * https://caniuse.com/?search=Sec-CH-UA (that's why we limit the support to Chromium-based browsers only at the
 * moment).
 *
 * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Sec-CH-UA-Full-Version-List
 * @link https://developer.mozilla.org/en-US/docs/Web/API/NavigatorUAData/getHighEntropyValues#brands
 */
export const browserBrands: {
  (browser: 'chrome', version: string | number, underHoodVersion?: never): ReadonlyArray<Brand>
  (browser: 'opera', version: string | number, underHoodVersion: string | number): ReadonlyArray<Brand>
  (browser: 'edge', version: string | number, underHoodVersion: string | number): ReadonlyArray<Brand>
} = (
  browser: 'chrome' | 'opera' | 'edge',
  version: string | number,
  underHoodVersion?: string | number
): ReadonlyArray<Brand> => {
  const extractMajor = (full: string | number): string => {
    if (typeof full !== 'string') {
      return Math.max(Math.floor(full === Infinity ? 0 : full), 0).toString()
    }

    const asNumber = parseInt(full.split('.')[0])

    return isNaN(asNumber) ? '0' : Math.max(asNumber, 0).toString()
  }

  const result: Array<Brand> = [
    { brand: '(Not(A:Brand', version: typeof version === 'string' ? '99.0.0.0' : '99' }, // for every case
  ]

  switch (browser) {
    case 'chrome': {
      const chromeVersion: string = extractMajor(version)

      result.push({ brand: 'Google Chrome', version: chromeVersion }, { brand: 'Chromium', version: chromeVersion })

      break
    }

    case 'opera': {
      // for the Opera we set a version for the Chromium engine under "Chromium", and for the Opera
      // itself under "Opera" (from the `version` argument) - keep this in mind
      result.push({ brand: 'Opera', version: extractMajor(version) })

      if (underHoodVersion) {
        result.push({ brand: 'Chromium', version: extractMajor(underHoodVersion) })
      }

      break
    }

    case 'edge': {
      // and the same logic for the Microsoft Edge
      result.push({ brand: 'Microsoft Edge', version: extractMajor(version) })

      if (underHoodVersion) {
        result.push({ brand: 'Chromium', version: extractMajor(underHoodVersion) })
      }

      break
    }
  }

  return result
}

/**
 * Platform is used to determine the operating system of the user's device, but without detailed information. For
 * instance, the Browser may send the `Sec-CH-UA-Platform` header with the value of the operating system, such as
 * "Windows", "Linux", "macOS", "iOS", or "Android" (I'm not sure is the list is full, but those are the most
 * common ones).
 *
 * Also, this information is then exposed in the JavaScript environment through the
 * `navigator.userAgentData.getHighEntropyValues()` method:
 *
 * ```javascript
 * JSON.stringify(await navigator.userAgentData.getHighEntropyValues(["brands"]))
 * ```
 *
 * ```json
 * {"brands":[
 *   {"brand":"Google Chrome","version":"123"},
 *   {"brand":"Not:A-Brand","version":"8"},
 *   {"brand":"Chromium","version":"123"}
 * ],"mobile":false,"platform":"Linux"}
 * ```
 *
 * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/sec-ch-ua-platform#directives
 * @link https://developer.mozilla.org/en-US/docs/Web/API/NavigatorUAData/getHighEntropyValues#brands
 */
export const platform = (
  os: 'windows' | 'linux' | 'macOS' | 'iOS' | 'android' | string
): 'Windows' | 'Linux' | 'macOS' | 'iOS' | 'Android' | 'Unknown' => {
  switch (os.toLowerCase().trim()) {
    case 'windows':
      return 'Windows'

    case 'linux':
      return 'Linux'

    case 'macos':
      return 'macOS'

    case 'ios':
      return 'iOS'

    case 'android':
      return 'Android'
  }

  return 'Unknown'
}

/**
 * One more function from the same series. It's used to determine whether the user's device is a mobile device or not.
 *
 * @link https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Sec-CH-UA-Mobile
 */
export const isMobile = (os: 'windows' | 'linux' | 'macOS' | 'iOS' | 'android' | string): boolean => {
  switch (os.toLowerCase().trim()) {
    case 'ios':
    case 'android':
      return true
  }

  return false
}
