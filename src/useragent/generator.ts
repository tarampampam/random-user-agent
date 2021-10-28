import RandExp from 'randexp'
import {
  randomChromeVersion,
  randomEdgeVersion,
  randomFirefoxVersion,
  randomOperaVersion,
  randomSafariVersion,
} from './versions'
import UseragentInfo from './useragent-info'

/**
 * @link https://en.wikipedia.org/wiki/List_of_web_browsers List of web browsers
 */
export enum GeneratorType { // do NOT forget to update LOCALES on keys changes or appending (enum value == l18n key)
  edgeWin = 'edge_win',
  chromeWin = 'chrome_win',
  chromeMac = 'chrome_mac',
  chromeLinux = 'chrome_linux',
  chromeAndroid = 'chrome_android',
  firefoxWin = 'firefox_win',
  firefoxMac = 'firefox_mac',
  firefoxLinux = 'firefox_linux',
  firefoxAndroid = 'firefox_android',
  operaWin = 'opera_win',
  operaMac = 'opera_mac',
  safariIphone = 'safari_iphone',
  safariMac = 'safari_mac',
}

export interface UseragentGenerator {
  generate(allowedTypes: GeneratorType[]): UseragentInfo
}

// Validate generator type by VALUE
export function isValidType(type: string): boolean {
  return Object.values(GeneratorType as { [key: string]: string }).includes(type)
}

/**
 * Data sources:
 * - https://user-agents.net/
 * - https://developers.whatismybrowser.com/useragents/explore/
 */
export default class Generator implements UseragentGenerator {
  private readonly commonPatterns = {
    chrome: {
      linux: [
        // Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36
        // Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.87 Safari/537.36 Vivaldi/1.0.270.16
        // Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.65 Safari/537.36
        /Mozilla\/5\.0 \(X11;( U; | )Linux (x86_64|x86_64|x86_64|i686)\) AppleWebKit\/537\.36 \(KHTML, like Gecko\) (Ubuntu Chromium\/__VER__ |||)Chrome\/__VER__ Safari\/537\.36/,
      ],
      mac: [
        // Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36
        // Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36
        // Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2683.88 Safari/537.36
        /Mozilla\/5\.0 \(Macintosh; Intel Mac OS X 1[01]_(1|)[0-5]\) AppleWebKit\/537\.36 \(KHTML, like Gecko\) Chrome\/__VER__ Safari\/537\.36/,
      ],
      win: [
        // Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.92 Safari/537.36
        // Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36/6B3vCvPM-47
        // Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36/J9RqdS8c-04
        /Mozilla\/5\.0 \(Windows NT 1(0|0|1)\.0; (WOW64|Win64)(; x64|; x64|)\) AppleWebKit\/537\.36 \(KHTML, like Gecko\) Chrome\/__VER__ Safari\/537\.36/,
      ],
      android: [
        // Mozilla/5.0 (Linux; Android 10; N20Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.50 Mobile Safari/537.36
        // Mozilla/5.0 (Linux; Android 11; CPH1907) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.50 Mobile Safari/537.36
        // Mozilla/5.0 (Linux; Android 6.0.1; SM-A300FU) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.50 Mobile Safari/537.36
        /Mozilla\/5\.0 \(Linux; Android (9|10|10|11); __MOBILE_VENDOR__\) AppleWebKit\/537\.36 \(KHTML, like Gecko\) Chrome\/__VER__ Mobile Safari\/537\.36/,
      ],
    },
    firefox: {
      linux: [
        // Mozilla/5.0 (X11; Linux i686; rv:2.0b3pre) Gecko/20100731 Firefox/50.0.2
        // Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.5) Gecko/2008121622 Linux Mint/6 (Felicia) Firefox/52.4.0
        // Mozilla/5.0 (X11; U; Linux i686 (x86_64); en-US; rv:1.8.1.10) Gecko/20071115 Firefox/52.5.0
        /Mozilla\/5\.0 \(X11;( U; | )Linux (x86_64|x86_64|i686)(; en-(US|US|GB)|)(; rv:__VER__|)\) Gecko\/20[01][6710][012][96124][01][149] Firefox\/__VER__/,
      ],
      mac: [
        // Mozilla/5.0 (Macintosh; Intel Mac OS X 11.6; rv:92.0) Gecko/20100101 Firefox/92.0
        // Mozilla/5.0 (Macintosh; Intel Mac OS X 11_0; rv:79.0) Gecko/20100101 Firefox/79.0
        // Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4; rv:79.0) Gecko/20100101 Firefox/79.0
        /Mozilla\/5\.0 \(Macintosh; Intel Mac OS X 1[01]_(1|)[0-7](_[1-7]|); rv:__VER__\) Gecko\/20[01][01]0101 Firefox\/__VER__/,
      ],
      win: [
        // Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:93.0) Gecko/20100101 Firefox/93.0/0YfcW9WIH
        // Mozilla/5.0 (Windows NT 10.0; WOW64; rv:52.1.1) Gecko/20100101 Firefox/52.1.1
        // Mozilla/5.0 (Windows NT 10.0; WOW64; rv:60.0.1) Gecko/20100101 Firefox/60.0.1
        /Mozilla\/5\.0 \(Windows NT 1(0|0|1)\.0; (WOW64|Win64|Win64)(; x64|; x64|); rv:__VER__\) Gecko\/20[01][01]0101 Firefox\/__VER__(\/[a-zA-Z0-9]{9,16}(-\d{2}|)|)/,
      ],
      android: [
        // Mozilla/5.0 (Android 9; Mobile; rv:95.0) Gecko/95.0 Firefox/95.0
        // Mozilla/5.0 (Android 7.1.1; Mobile; rv:95.0) Gecko/95.0 Firefox/95.0
        // Mozilla/5.0 (Android; Tablet; Concierge; rv:25.0) Gecko/25.0 Firefox/25.0
        /Mozilla\/5\.0 \(Android( (9|10|10|11)(\.[0-4]||)|); (Tablet|Mobile); rv:__VER__\) Gecko\/__VER__ Firefox\/__VER__/,
      ],
    },
    safari: {
      iphone: [
        // Mozilla/5.0 (iPhone; CPU iPhone OS 13_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0 YaBrowser/21.8.4.521.10 SA/3 Mobile/15E148 Safari/604.1
        // Mozilla/5.0 (iPhone; CPU iPhone OS 10_10 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12B411 Safari/600.1.4
        // Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1
        /Mozilla\/5\.0 \(iPhone; CPU iPhone OS 1[3-5]_[1-5] like Mac OS X\) AppleWebKit\/(__VER__|__VER__|600\.[1-8]\.[12][0-7]|537\.36) \(KHTML, like Gecko\) Version\/1[0-4]\.[0-7](\.[1-9][0-7]|) Mobile\/[A-Z0-9]{6} Safari\/__VER__/,
      ],
      mac: [
        // Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.2 Safari/605.1.15 Herring/630.18.6
        // Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chromium/90.0.2915.2427 Safari/537.36
        // Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14) AppleWebKit/611.3.10.1.5 (KHTML, like Gecko) Version/14.1.2 Safari/611.3.10.1.5
        /Mozilla\/5\.0 \(Macintosh; Intel Mac OS X 1[01]_(1|)[0-7](_[1-7]|)\) AppleWebKit\/(__VER__|__VER__|600\.[1-8]\.[12][0-7]|537\.36) \(KHTML, like Gecko\) Version\/1[0-4]\.[0-7](\.[1-9][0-7]|) Safari\/__VER__/,
      ],
    },
  }

  private mobileVendors: string[] = [
    'SM-T510', 'SM-T295', 'SM-T515', 'SM-T860', 'SM-T720', 'SM-T595', 'SM-T290', 'SM-T865', 'SM-T835',
    'SM-T725', 'SM-P610', 'SM-T590', 'SM-P615', 'TV BOX', 'SM-T830', 'Lenovo TB-X505X', 'SM-T500',
    'Lenovo TB-X505F', 'Lenovo TB-X606F', 'SM-P205', 'SM-T505', 'MRX-W09', 'Lenovo YT-X705F',
    'Lenovo TB-X505L', 'MRX-AL09', 'SCM-W09', 'Lenovo TB-X606X', 'P20HD_EEA', 'SM-A105M', 'iPlay_20',
    'Lenovo TB-X606V', 'H96 Max RK3318', 'TVBOX', 'SM-T387V', 'Lenovo YT-X705L', 'Lenovo TB-X306X',
    'Lenovo TB-X306F', 'SM-T870', 'Redmi Note 8 Pro', 'Tab8', 'SM-T970', 'SM-A205G', 'Lenovo TB-X605FC',
    'Lenovo TB-J606F', 'e-tab 20', 'ADT1061', 'SM-T307U', '100003562', 'MBOX', 'Lenovo TB-X605LC',
    'M40_EEA', 'M2003J15SC', '100003561', 'X109', 'Redmi Note 8', 'Lenovo TB-8705F', 'A860', 'SM-A107M',
    'Redmi Note 7', 'BAH3-W09', 'BAH3-L09', 'TX6s', 'SM-T507', 'P20HD_ROW', 'Magnet_G30', 'SM-T875',
    'SM-T387W', 'MI PAD 4', 'Lenovo YT-X705X', 'Lenovo TB-X606FA', 'SM-P200', 'SM-A207M', 'M2004J19C',
    'X104-EEA', 'SM-T837V', 'SM-A307GT', 'AGS3-W09', 'SM-T505N', 'SM-A105F', 'Magnet_G50', 'A850', '8092',
    '100015685-A', 'X88pro10.q2.0.6330.d4', 'SM-T975', 'SM-G973F', 'J5',
  ]

  protected randomMobileVendor(): string {
    return this.mobileVendors[Math.floor(Math.random() * this.mobileVendors.length)]
  }

  protected pickRandomRegExp(list: RegExp[]): RegExp {
    return list[Math.floor(Math.random() * list.length)]
  }

  /**
   * @throws Error When unsupported generator type requested
   */
  generate(allowedTypes: GeneratorType[]): UseragentInfo {
    if (allowedTypes.length === 0) {
      allowedTypes = [GeneratorType.chromeWin, GeneratorType.chromeLinux, GeneratorType.chromeMac] // fallback
    }

    // pick randomized type for a work
    const type = allowedTypes[Math.floor(Math.random() * allowedTypes.length)],
      versionTokenRegExp: RegExp = new RegExp('__VER__', 'g'),
      mobileVendorTokenRegExp: RegExp = new RegExp('__MOBILE_VENDOR__', 'g')

    switch (type) {
      case GeneratorType.chromeLinux:
        return {
          useragent: new RandExp(this.pickRandomRegExp(this.commonPatterns.chrome.linux)).gen()
            .replace(versionTokenRegExp, randomChromeVersion.version()),
          engine: 'blink',
          osType: 'linux',
        }

      case GeneratorType.chromeMac:
        return {
          useragent: new RandExp(this.pickRandomRegExp(this.commonPatterns.chrome.mac)).gen()
            .replace(versionTokenRegExp, randomChromeVersion.version()),
          engine: 'blink',
          osType: 'macOS',
        }

      case GeneratorType.chromeWin:
        return {
          useragent: new RandExp(this.pickRandomRegExp(this.commonPatterns.chrome.win)).gen()
            .replace(versionTokenRegExp, randomChromeVersion.version()),
          engine: 'blink',
          osType: 'windows',
        }

      case GeneratorType.chromeAndroid:
        return {
          useragent: new RandExp(this.pickRandomRegExp(this.commonPatterns.chrome.android)).gen()
            .replace(versionTokenRegExp, randomChromeVersion.version())
            .replace(mobileVendorTokenRegExp, this.randomMobileVendor()),
          engine: 'blink',
          osType: 'android',
        }

      case GeneratorType.firefoxLinux:
        return {
          useragent: new RandExp(this.pickRandomRegExp(this.commonPatterns.firefox.linux)).gen()
            .replace(versionTokenRegExp, randomFirefoxVersion.version()),
          engine: 'gecko',
          osType: 'linux',
        }

      case GeneratorType.firefoxMac:
        return {
          useragent: new RandExp(this.pickRandomRegExp(this.commonPatterns.firefox.mac)).gen()
            .replace(versionTokenRegExp, randomFirefoxVersion.version()),
          engine: 'gecko',
          osType: 'macOS',
        }

      case GeneratorType.firefoxWin:
        return {
          useragent: new RandExp(this.pickRandomRegExp(this.commonPatterns.firefox.win)).gen()
            .replace(versionTokenRegExp, randomFirefoxVersion.version()),
          engine: 'gecko',
          osType: 'windows',
        }

      case GeneratorType.firefoxAndroid:
        return {
          useragent: new RandExp(this.pickRandomRegExp(this.commonPatterns.firefox.android)).gen()
            .replace(versionTokenRegExp, randomFirefoxVersion.version()),
          engine: 'gecko',
          osType: 'android',
        }

      case GeneratorType.operaWin:
        return {
          useragent: new RandExp(this.pickRandomRegExp(this.commonPatterns.chrome.win)).gen()
              .replace(versionTokenRegExp, randomChromeVersion.version())
            + ' OPR/' + randomOperaVersion.version(),
          engine: 'blink',
          osType: 'windows',
        }

      case GeneratorType.operaMac:
        return {
          useragent: new RandExp(this.pickRandomRegExp(this.commonPatterns.chrome.mac)).gen()
              .replace(versionTokenRegExp, randomChromeVersion.version())
            + ' OPR/' + randomOperaVersion.version(),
          engine: 'blink',
          osType: 'macOS',
        }

      case GeneratorType.safariIphone:
        return {
          useragent: new RandExp(this.pickRandomRegExp(this.commonPatterns.safari.iphone)).gen()
            .replace(versionTokenRegExp, randomSafariVersion.version()),
          engine: 'webkit',
          osType: 'iOS',
        }

      case GeneratorType.safariMac:
        return {
          useragent: new RandExp(this.pickRandomRegExp(this.commonPatterns.safari.mac)).gen()
            .replace(versionTokenRegExp, randomSafariVersion.version()),
          engine: 'webkit',
          osType: 'macOS',
        }

      case GeneratorType.edgeWin:
        return {
          useragent: new RandExp(this.pickRandomRegExp(this.commonPatterns.chrome.win)).gen()
              .replace(versionTokenRegExp, randomChromeVersion.version())
            + ' Edg/' + randomEdgeVersion.version(),
          engine: 'blink',
          osType: 'windows',
        }

      default:
        throw new Error('Unsupported type requested')
    }
  }
}
