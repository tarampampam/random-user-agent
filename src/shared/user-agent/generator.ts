import RandExp from 'randexp'
import {
  chrome as chromeVersion,
  edge as edgeVersion,
  firefox as firefoxVersion,
  opera as operaVersion,
  safari as safariVersion,
} from './browser-versions'

const generators: {
  chrome: {
    linux: (deps: Record<'chromeVersion', string>) => string
    mac: (deps: Record<'chromeVersion', string>) => string
    windows: (deps: Record<'chromeVersion', string>) => string
    android: (deps: Record<'chromeVersion' | 'mobileVendor', string>) => string
  }
  firefox: {
    linux: (deps: Record<'firefoxVersion' | 'localeName', string>) => string
    mac: (deps: Record<'firefoxVersion', string>) => string
    windows: (deps: Record<'firefoxVersion', string>) => string
    android: (deps: Record<'firefoxVersion' | 'mobileVendor', string>) => string
  }
  safari: {
    iphone: (deps: Record<'safariVersion', string>) => string
    mac: (deps: Record<'safariVersion', string>) => string
  }
  opera: {
    windows: (deps: Record<'chromeVersion' | 'operaVersion', string>) => string
    mac: (deps: Record<'chromeVersion' | 'operaVersion', string>) => string
  }
  edge: {
    windows: (deps: Record<'chromeVersion' | 'edgeVersion', string>) => string
    mac: (deps: Record<'chromeVersion' | 'edgeVersion', string>) => string
  }
} = {
  /** @link https://www.whatismybrowser.com/guides/the-latest-user-agent/chrome */
  chrome: {
    linux: ({ chromeVersion }) => {
      return new RandExp(
        /Mozilla\/5\.0 \((|||||||Wayland like )X11; (||(U|U|U|U|U|Ubuntu|Ubuntu|Ubuntu|Debian|Debian|Fedora|FreeBSD); )Linux (x86_64|x86_64|x86_64|x86_64|i686)\) AppleWebKit\/537\.36 \(KHTML, like Gecko\) Chrome\/__CHROME_VERSION__ Safari\/537\.36/
      )
        .gen()
        .replace(/__CHROME_VERSION__/g, chromeVersion)
    },

    mac: ({ chromeVersion }) => {
      return new RandExp(
        /Mozilla\/5\.0 \(Macintosh; Intel Mac OS X 1(([01](|[._](0|1|2|3|4|5|6|7|10|11|12|13|14)))|([2-4](|\.[0-6]))|(4(|\.[0-6])))\) AppleWebKit\/537\.36 \(KHTML, like Gecko\) Chrome\/__CHROME_VERSION__ Safari\/537\.36/
      )
        .gen()
        .replace(/__CHROME_VERSION__/g, chromeVersion)
    },

    windows: ({ chromeVersion }) => {
      return new RandExp(
        /Mozilla\/5\.0 \(Windows NT ((6\.(1|1|1|2|3))|10\.0|10\.0|10\.0|10\.0|10\.0|10\.0); (Win64|Win64|Win64|WOW64); x64\) AppleWebKit\/537\.36 \(KHTML, like Gecko\) Chrome\/__CHROME_VERSION__ Safari\/537\.36/
      )
        .gen()
        .replace(/__CHROME_VERSION__/g, chromeVersion)
    },

    android: ({ chromeVersion, mobileVendor }) => {
      return new RandExp(
        /Mozilla\/5\.0 \(Linux; Android (9(|\.[0-4])|10(|\.[0-4])|11(|\.[0-2])|12|13|13|14|14|14|14); __MOBILE_VENDOR__\) AppleWebKit\/537\.36 \(KHTML, like Gecko\) Chrome\/__CHROME_VERSION__ Mobile Safari\/537\.36/
      )
        .gen()
        .replace(/__MOBILE_VENDOR__/g, mobileVendor)
        .replace(/__CHROME_VERSION__/g, chromeVersion)
    },
  },

  /** @link https://www.whatismybrowser.com/guides/the-latest-user-agent/firefox */
  firefox: {
    linux: ({ firefoxVersion, localeName }) => {
      return new RandExp(
        /Mozilla\/5\.0 \((|||||||Wayland like )X11; (||(U|U|U|U|U|Ubuntu|Ubuntu|Ubuntu|Debian|Debian|Fedora|FreeBSD); )Linux(| (x86_64|x86_64|x86_64|x86_64|i686));(|| __LOCALE__;) rv:__FF_VERSION__\) Gecko\/20(16|17|21|22|22)[012][1-9][01][1490] Firefox\/__FF_VERSION__/
      )
        .gen()
        .replace(/__FF_VERSION__/g, firefoxVersion)
        .replace(/__LOCALE__/g, localeName)
    },

    mac: ({ firefoxVersion }) => {
      return new RandExp(
        /Mozilla\/5\.0 \(Macintosh; Intel Mac OS X 1(([01](|[._](0|1|2|3|4|5|6|7|10|11|12|13|14)))|([2-4](|\.[0-6]))|(4(|\.[0-6]))); rv:__FF_VERSION__\) Gecko\/20[01][01]0101 Firefox\/__FF_VERSION__/
      )
        .gen()
        .replace(/__FF_VERSION__/g, firefoxVersion)
    },

    windows: ({ firefoxVersion }) => {
      return new RandExp(
        /Mozilla\/5\.0 \(Windows NT ((6\.(1|1|1|2|3))|10\.0|10\.0|10\.0|10\.0|10\.0|10\.0); (Win64|Win64|Win64|WOW64); x64; rv:__FF_VERSION__\) Gecko\/20100101 Firefox\/__FF_VERSION__(||\/[a-zA-Z0-9]{9,16}(-\d{2}|))/
      )
        .gen()
        .replace(/__FF_VERSION__/g, firefoxVersion)
    },

    android: ({ firefoxVersion, mobileVendor }) => {
      return new RandExp(
        /Mozilla\/5\.0 \(Android (9(|\.[0-4])|10(|\.[0-4])|11(|\.[0-2])|12|13|13|14|14|14|14); (Mobile|Mobile|Mobile|Tablet); __MOBILE_VENDOR__; rv:__FF_VERSION__\) Gecko\/__FF_VERSION__ Firefox\/__FF_VERSION__/
      )
        .gen()
        .replace(/__MOBILE_VENDOR__/g, mobileVendor)
        .replace(/__FF_VERSION__/g, firefoxVersion)
    },
  },

  /** @link https://www.whatismybrowser.com/guides/the-latest-user-agent/safari */
  safari: {
    iphone: ({ safariVersion }) => {
      return new RandExp(
        /Mozilla\/5\.0 \(iPhone; CPU iPhone OS 1[67](|_[0-5])(|_[0-5]) like Mac OS X\) AppleWebKit\/605\.1\.15 \(KHTML, like Gecko\) Version\/1(5|6|7|7|7)\.[0-7](|\.[1-9][0-7]) Mobile\/[A-Z0-9]{6} Safari\/__SAFARI_VERSION__/
      )
        .gen()
        .replace(/__SAFARI_VERSION__/g, safariVersion)
    },

    mac: ({ safariVersion }) => {
      return new RandExp(
        /Mozilla\/5\.0 \(Macintosh; Intel Mac OS X 1(([01](|[._](0|1|2|3|4|5|6|7|10|11|12|13|14)))|([2-4](|\.[0-6]))|(4(|\.[0-6])))\) AppleWebKit\/__SAFARI_VERSION__ \(KHTML, like Gecko\) Version\/1(5|6|7|7|7)\.[0-7](|\.[1-9][0-7]) Safari\/__SAFARI_VERSION__/
      )
        .gen()
        .replace(/__SAFARI_VERSION__/g, safariVersion)
    },
  },

  /** @link https://www.whatismybrowser.com/guides/the-latest-user-agent/opera */
  opera: {
    windows: ({ chromeVersion, operaVersion }) => {
      return `${generators.chrome.windows({ chromeVersion })} OPR/${operaVersion}`
    },

    mac: ({ chromeVersion, operaVersion }) => {
      return `${generators.chrome.mac({ chromeVersion })} OPR/${operaVersion}`
    },
  },

  /** @link https://www.whatismybrowser.com/guides/the-latest-user-agent/edge */
  edge: {
    windows: ({ chromeVersion, edgeVersion }) => {
      return `${generators.chrome.windows({ chromeVersion })} Edg/${edgeVersion}`
    },

    mac: ({ chromeVersion, edgeVersion }) => {
      return `${generators.chrome.mac({ chromeVersion })} Edg/${edgeVersion}`
    },
  },
}

// prettier-ignore
const mobileVendors: ReadonlyArray<string> = [
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
const locales: ReadonlyArray<string> = ['en-US', 'en-GB', 'en-AU']

/** Generate a user agent string for a specific browser and platform. */
export default function generate(
  target:
    | 'chrome_linux'
    | 'chrome_mac'
    | 'chrome_win'
    | 'chrome_android'
    | 'firefox_linux'
    | 'firefox_mac'
    | 'firefox_win'
    | 'firefox_android'
    | 'safari_iphone'
    | 'safari_mac'
    | 'opera_win'
    | 'opera_mac'
    | 'edge_win'
    | 'edge_mac',
  opt?: Partial<{
    // the version of the browser, e.g. '90.0.4430.93'. if specified, the version will be used instead of the
    // generated one (in this case, features like 'maxMajor' and 'majorDelta' will be ignored)
    version: string
    mobileVendor: string
    maxMajor: number // the major version of the browser, e.g. 90
    majorDelta: number // the difference between the maxMajor and minMajor, e.g. 2
    // for the browsers, which are wrappers around another browser (e.g. Opera, Edge - they use Chrome under the hood)
    // you can specify the version of the core browser (here I name it 'underHood')
    underHoodMaxMajor: number
    underHoodMajorDelta: number
  }>
): {
  /** The generated user agent string. */
  userAgent: string

  /** The version information of the generated user agent. */
  version: {
    /**
     * The requested browser version. Please note that some browsers are merely a 'wrapper' around the core browser
     * engine. For instance, Opera or Edge use Chrome under the hood. In such cases, the version of the brand browser
     * will be provided here.
     */
    browser: { major: number; full: string }

    /** If the browser is a wrapper around another browser, the version of the core browser will be provided here. */
    underHood?: { type: 'chrome'; major: number; full: string }
  }
} {
  const extractMajor = (full: string): number => parseInt(full.split('.')[0])

  switch (target) {
    case 'chrome_linux': {
      const [major, full] = opt?.version
        ? [extractMajor(opt.version), opt.version]
        : chromeVersion(opt?.maxMajor, opt?.majorDelta)

      return {
        userAgent: generators.chrome.linux({ chromeVersion: full }),
        version: { browser: { major, full } },
      }
    }

    case 'chrome_mac': {
      const [major, full] = opt?.version
        ? [extractMajor(opt.version), opt.version]
        : chromeVersion(opt?.maxMajor, opt?.majorDelta)

      return {
        userAgent: generators.chrome.mac({ chromeVersion: full }),
        version: { browser: { major, full } },
      }
    }

    case 'chrome_win': {
      const [major, full] = opt?.version
        ? [extractMajor(opt.version), opt.version]
        : chromeVersion(opt?.maxMajor, opt?.majorDelta)

      return {
        userAgent: generators.chrome.windows({ chromeVersion: full }),
        version: { browser: { major, full } },
      }
    }

    case 'chrome_android': {
      const [major, full] = opt?.version
        ? [extractMajor(opt.version), opt.version]
        : chromeVersion(opt?.maxMajor, opt?.majorDelta)

      return {
        userAgent: generators.chrome.android({
          chromeVersion: full,
          mobileVendor: opt?.mobileVendor || mobileVendors[Math.floor(Math.random() * mobileVendors.length)],
        }),
        version: { browser: { major, full } },
      }
    }

    case 'firefox_linux': {
      const [major, full] = opt?.version
        ? [extractMajor(opt.version), opt.version]
        : firefoxVersion(opt?.maxMajor, opt?.majorDelta)
      const randomLocale = locales[Math.floor(Math.random() * locales.length)]

      return {
        userAgent: generators.firefox.linux({ firefoxVersion: full, localeName: randomLocale }),
        version: { browser: { major, full } },
      }
    }

    case 'firefox_mac': {
      const [major, full] = opt?.version
        ? [extractMajor(opt.version), opt.version]
        : firefoxVersion(opt?.maxMajor, opt?.majorDelta)

      return {
        userAgent: generators.firefox.mac({ firefoxVersion: full }),
        version: { browser: { major, full } },
      }
    }

    case 'firefox_win': {
      const [major, full] = opt?.version
        ? [extractMajor(opt.version), opt.version]
        : firefoxVersion(opt?.maxMajor, opt?.majorDelta)

      return {
        userAgent: generators.firefox.windows({ firefoxVersion: full }),
        version: { browser: { major, full } },
      }
    }

    case 'firefox_android': {
      const [major, full] = opt?.version
        ? [extractMajor(opt.version), opt.version]
        : firefoxVersion(opt?.maxMajor, opt?.majorDelta)

      return {
        userAgent: generators.firefox.android({
          firefoxVersion: full,
          mobileVendor: opt?.mobileVendor || mobileVendors[Math.floor(Math.random() * mobileVendors.length)],
        }),
        version: { browser: { major, full } },
      }
    }

    case 'safari_iphone': {
      const [major, full] = opt?.version
        ? [extractMajor(opt.version), opt.version]
        : safariVersion(opt?.maxMajor, opt?.majorDelta)

      return {
        userAgent: generators.safari.iphone({ safariVersion: full }),
        version: { browser: { major, full } },
      }
    }

    case 'safari_mac': {
      const [major, full] = opt?.version
        ? [extractMajor(opt.version), opt.version]
        : safariVersion(opt?.maxMajor, opt?.majorDelta)

      return {
        userAgent: generators.safari.mac({ safariVersion: full }),
        version: { browser: { major, full } },
      }
    }

    case 'opera_win': {
      const [chromeMajor, chromeFull] = chromeVersion(opt?.underHoodMaxMajor, opt?.underHoodMajorDelta)
      const [operaMajor, operaFull] = opt?.version
        ? [extractMajor(opt.version), opt.version]
        : operaVersion(opt?.maxMajor, opt?.majorDelta)

      return {
        userAgent: generators.opera.windows({ chromeVersion: chromeFull, operaVersion: operaFull }),
        version: {
          browser: { major: operaMajor, full: operaFull },
          underHood: { type: 'chrome', major: chromeMajor, full: chromeFull },
        },
      }
    }

    case 'opera_mac': {
      const [chromeMajor, chromeFull] = chromeVersion(opt?.underHoodMaxMajor, opt?.underHoodMajorDelta)
      const [operaMajor, operaFull] = opt?.version
        ? [extractMajor(opt.version), opt.version]
        : operaVersion(opt?.maxMajor, opt?.majorDelta)

      return {
        userAgent: generators.opera.mac({ chromeVersion: chromeFull, operaVersion: operaFull }),
        version: {
          browser: { major: operaMajor, full: operaFull },
          underHood: { type: 'chrome', major: chromeMajor, full: chromeFull },
        },
      }
    }

    case 'edge_win': {
      const [chromeMajor, chromeFull] = chromeVersion(opt?.underHoodMaxMajor, opt?.underHoodMajorDelta)
      const [edgeMajor, edgeFull] = opt?.version
        ? [extractMajor(opt.version), opt.version]
        : edgeVersion(opt?.maxMajor, opt?.majorDelta)

      return {
        userAgent: generators.edge.windows({ chromeVersion: chromeFull, edgeVersion: edgeFull }),
        version: {
          browser: { major: edgeMajor, full: edgeFull },
          underHood: { type: 'chrome', major: chromeMajor, full: chromeFull },
        },
      }
    }

    case 'edge_mac': {
      const [chromeMajor, chromeFull] = chromeVersion(opt?.underHoodMaxMajor, opt?.underHoodMajorDelta)
      const [edgeMajor, edgeFull] = opt?.version
        ? [extractMajor(opt.version), opt.version]
        : edgeVersion(opt?.maxMajor, opt?.majorDelta)

      return {
        userAgent: generators.edge.mac({ chromeVersion: chromeFull, edgeVersion: edgeFull }),
        version: {
          browser: { major: edgeMajor, full: edgeFull },
          underHood: { type: 'chrome', major: chromeMajor, full: chromeFull },
        },
      }
    }

    default:
      throw new Error(`Unsupported generator type: ${target}`)
  }
}
