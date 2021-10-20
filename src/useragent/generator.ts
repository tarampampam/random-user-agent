import RandExp from 'randexp'
import {mobileVendor, randomChromeVersion} from './versions'

export enum GeneratorType { // do NOT forget to update LOCALES on keys changes or appending (enum value == l18n key)
  ie6 = 'ie6',
  ie7 = 'ie7',
  ie8 = 'ie8',
  ie9 = 'ie9',
  ie10 = 'ie10',
  ie11 = 'ie11',
  edgeWin = 'edge_win',
  edgeXbox = 'edge_xbox',
  chromeWin = 'chrome_win', // done
  chromeMac = 'chrome_mac', // done
  chromeLinux = 'chrome_linux', // done
  chromeAndroid = 'chrome_android', // done
  firefoxWin = 'firefox_win',
  firefoxMac = 'firefox_mac',
  firefoxLinux = 'firefox_linux',
  firefoxAndroid = 'firefox_android',
  operaWin = 'opera_win',
  operaMac = 'opera_mac',
  operaAndroid = 'opera_android',
  safariIphone = 'safari_iphone',
  safariMac = 'safari_mac',
}

export function validType(type: String): boolean {
  return false // TODO implement this
}

export default class Generator {
  private readonly commonPatterns = {
    locales: [/en-(US|AU|CA|IN|IE|MT|NZ|PH|SG|ZA|GB)/],
    netCLR: {
      v1: [/( \.NET CLR 1\.[0-1]\.[4-5]07[0-5][0-9];|)/],
      v2up: [/( \.NET CLR [2-3]\.[1-8]\.[3-5]07[0-9][0-9];|)/],
    },
    mediaServer: [/( Media Center PC [4-6]\.0;|)/],
    windows: [/Windows NT (6\.[1-3]|10\.0)/],
    macos: {
      v10_blink: [/Intel Mac OS X 10_(1[0-4])_[0-4]/],
      v10_firefox: [/Intel Mac OS X 10\.(1[0-4])/],
    },
    applewebkit: [/AppleWebKit\/(60[1-5]\.[1-7]\.[1-8])/, /AppleWebKit\/(53[5-8]\.[1-2][0-9]\.[1-3][0-9])/],
    browserVersions: {
      // chrome: [/(76\.0\.3809|77\.0\.3865|78\.0\.3887)\.(?:[89]\d|1[0-4]{2})/],
      safari: [/1[12]\.[0-1]\.[1-5]/],
      firefox: [/6[089]\.0/],
      opera: [/4[4-6]\.0\.2[1-3][0-9][0-9]\.([1-2]|)[1-9][0-9]/],
      edge: [/Chrome\/64\.0\.3282\.140 Safari\/537\.36 Edge\/18\.17763/, /Chrome\/70\.0\.3538\.102 Safari\/537\.36 Edge\/18\.18362/],
    },

    chrome: {
      linux: [
        /Mozilla\/5\.0 \(X11;( U; | )Linux (x86_64|x86_64|x86_64|i686)\) AppleWebKit\/537\.36 \(KHTML, like Gecko\) (Ubuntu Chromium\/__VER__ |||)Chrome\/__VER__ Safari\/537\.36/,
      ],
      mac: [
        /Mozilla\/5\.0 \(Macintosh; Intel Mac OS X 1[01]_[0-9]\) AppleWebKit\/537\.36 \(KHTML, like Gecko\) Chrome\/__VER__ Safari\/537\.36/,
      ],
      win: [
        /Mozilla\/5\.0 \(Windows NT 1(0|0|1)\.0; (WOW64|Win64)(; x64|; x64|)\) AppleWebKit\/537\.36 \(KHTML, like Gecko\) Chrome\/__VER__ Safari\/537\.36/,
      ],
      android: [
        /Mozilla\/5\.0 \(Linux; Android (9|10|10|11); __MOBILE_VENDOR__\) AppleWebKit\/537\.36 \(KHTML, like Gecko\) Chrome\/__VER__ Safari\/537\.36/,
      ],
    },
  }

  protected pickRandomRegExp(list: RegExp[]): RegExp {
    return list[Math.floor(Math.random() * list.length)]
  }

  async generate(allowedTypes: GeneratorType[]): Promise<string> {
    if (allowedTypes.length === 0) {
      allowedTypes = [GeneratorType.chromeWin, GeneratorType.chromeLinux, GeneratorType.chromeMac] // fallback
    }

    // pick randomized type for a work
    const type = allowedTypes[Math.floor(Math.random() * allowedTypes.length)],
      versionToken: string = '__VER__', mobileVendorToken = '__MOBILE_VENDOR__'

    switch (type) {
      case GeneratorType.chromeLinux: // https://www.whatismybrowser.com/guides/the-latest-user-agent/chrome
        return new RandExp(this.pickRandomRegExp(this.commonPatterns.chrome.linux)).gen()
          .replaceAll(versionToken, randomChromeVersion.version())

      case GeneratorType.chromeMac:
        return new RandExp(this.pickRandomRegExp(this.commonPatterns.chrome.mac)).gen()
          .replaceAll(versionToken, randomChromeVersion.version())

      case GeneratorType.chromeWin:
        return new RandExp(this.pickRandomRegExp(this.commonPatterns.chrome.win)).gen()
          .replaceAll(versionToken, randomChromeVersion.version())

      case GeneratorType.chromeAndroid:
        return new RandExp(this.pickRandomRegExp(this.commonPatterns.chrome.android)).gen()
          .replaceAll(versionToken, randomChromeVersion.version())
          .replaceAll(mobileVendorToken, mobileVendor.version())
    }


    return ''
  }
}
