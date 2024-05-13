import UAParser from 'ua-parser-js'
import type { ReadonlySettingsState, ReadonlyUserAgentState } from '~/shared/types'
import { generateUserAgent } from '~/shared/user-agent'
import { type BrowserType, generatorTypesToSets, type OSType } from '../../../shared'
import {
  Settings,
  CurrentUserAgent,
  type RemoteUserAgentList,
  LatestBrowserVersions,
  type ReadonlyVersionsState,
} from '../persistent'

const linuxOsRe =
  /nix|nux|bsd|vms|cent|chrom|fedora|debian|elementary|gentoo|gnu|harmony|kai|mageia|mandriva|manjaro|mint|slack|suse|ubuntu/i
const iosOsRe = /iphone|ipad|ipod/i

export default async function renewUserAgent(
  s: Settings,
  current: CurrentUserAgent,
  remote: RemoteUserAgentList,
  hostOS: chrome.runtime.PlatformOs,
  latestVersions: LatestBrowserVersions
): Promise<
  Readonly<{
    source: 'custom_agents_list' | 'remote_list' | 'generator'
    previous?: ReadonlyUserAgentState
    new: ReadonlyUserAgentState
  }>
> {
  const previous = await current.get()
  const settings = await s.get()

  const useCustom = settings.customUseragent.enabled
  const useRemote = settings.remoteUseragentList.enabled

  let picked: ReadonlyUserAgentState | undefined = undefined
  let source: Awaited<ReturnType<typeof renewUserAgent>>['source'] | undefined = undefined

  switch (true) {
    case useCustom && useRemote: {
      // 50% / 50%
      if (Math.random() < 0.5) {
        picked = customUserAgent(settings)
        source = 'custom_agents_list'
      } else {
        picked = await remoteUserAgent(remote)
        source = 'remote_list'
      }

      break
    }

    case useCustom: {
      picked = customUserAgent(settings)
      source = 'custom_agents_list'

      break
    }

    case useRemote: {
      picked = await remoteUserAgent(remote)
      source = 'remote_list'

      break
    }
  }

  if (picked && source) {
    await current.update(picked)

    return Object.freeze({ source, previous, new: picked })
  }

  const [latest] = await latestVersions.get()
  const generated = generatedUserAgent(settings, hostOS, latest)

  await current.update(generated)

  return Object.freeze({ source: 'generator', previous, new: generated })
}

const customUserAgent = (settings: ReadonlySettingsState): ReadonlyUserAgentState | undefined => {
  const list = settings.customUseragent.list

  if (list.length) {
    const random = list[Math.floor(Math.random() * list.length)]

    if (random.trim().length) {
      return parseUserAgentString(random)
    }
  }
}

const remoteUserAgent = async (remote: RemoteUserAgentList): Promise<ReadonlyUserAgentState | undefined> => {
  const random = await remote.get(true)

  if (random && random.trim().length) {
    return parseUserAgentString(random)
  }
}

const generatedUserAgent = (
  settings: ReadonlySettingsState,
  hostOS: chrome.runtime.PlatformOs,
  latest?: ReadonlyVersionsState
): ReadonlyUserAgentState => {
  const { types, syncOsWithHost } = settings.generator
  const [browsers, oses] = generatorTypesToSets(types)

  // pick a random browser type and os to generate a user agent
  const pickBrowser: BrowserType = browsers.length ? browsers[Math.floor(Math.random() * browsers.length)] : 'chrome'
  const pickOS: OSType = syncOsWithHost
    ? ((): OSType => {
        switch (hostOS) {
          case 'mac':
            return 'macos'
          case 'linux':
          case 'openbsd':
          case 'fuchsia':
          case 'cros':
            return 'linux'
          case 'android':
            return 'android'
        }

        return 'windows' // fallback
      })()
    : oses.length
      ? oses[Math.floor(Math.random() * oses.length)]
      : 'windows' // fallback

  // run the generator with the selected type and provide the latest browser versions, if available
  const generated = generateUserAgent(
    ((): Parameters<typeof generateUserAgent>[0] => {
      switch (true) {
        case pickBrowser === 'chrome' && pickOS === 'linux':
          return 'chrome_linux'
        case pickBrowser === 'chrome' && pickOS === 'macos':
          return 'chrome_mac'
        case pickBrowser === 'chrome' && pickOS === 'windows':
          return 'chrome_win'
        case pickBrowser === 'chrome' && pickOS === 'android':
          return 'chrome_android'
        case pickBrowser === 'firefox' && pickOS === 'linux':
          return 'firefox_linux'
        case pickBrowser === 'firefox' && pickOS === 'macos':
          return 'firefox_mac'
        case pickBrowser === 'firefox' && pickOS === 'windows':
          return 'firefox_win'
        case pickBrowser === 'firefox' && pickOS === 'android':
          return 'firefox_android'
        case pickBrowser === 'safari' && pickOS === 'ios':
          return 'safari_iphone'
        case pickBrowser === 'safari' && pickOS === 'macos':
          return 'safari_mac'
        case pickBrowser === 'opera' && pickOS === 'windows':
          return 'opera_win'
        case pickBrowser === 'opera' && pickOS === 'macos':
          return 'opera_mac'
        case pickBrowser === 'edge' && pickOS === 'windows':
          return 'edge_win'
        case pickBrowser === 'edge' && pickOS === 'macos':
          return 'edge_mac'
      }

      return 'chrome_win' // fallback
    })(),
    ((): Parameters<typeof generateUserAgent>[1] => {
      switch (pickBrowser) {
        case 'chrome':
          return { maxMajor: latest?.chrome }
        case 'firefox':
          return { maxMajor: latest?.firefox }
        case 'opera':
          return { maxMajor: latest?.opera, underHoodMaxMajor: latest?.chrome }
        case 'safari':
          return { maxMajor: latest?.safari }
        case 'edge':
          return { maxMajor: latest?.edge, underHoodMaxMajor: latest?.chrome }
      }
    })()
  )

  return Object.freeze({
    userAgent: generated.userAgent,
    browser: ((): ReadonlyUserAgentState['browser'] => {
      switch (pickBrowser) {
        case 'chrome':
          return 'chrome'
        case 'firefox':
          return 'firefox'
        case 'opera':
          return 'opera'
        case 'safari':
          return 'safari'
        case 'edge':
          return 'edge'
        default:
          return 'unknown'
      }
    })(),
    os: ((): ReadonlyUserAgentState['os'] => {
      switch (pickOS) {
        case 'windows':
          return 'windows'
        case 'linux':
          return 'linux'
        case 'macos':
          return 'macOS'
        case 'ios':
          return 'iOS'
        case 'android':
          return 'android'
        default:
          return 'unknown'
      }
    })(),
    version: {
      browser: { major: generated.version.browser.major, full: generated.version.browser.full },
      underHood: generated.version.underHood
        ? { major: generated.version.underHood.major, full: generated.version.underHood.full }
        : undefined,
    },
  })
}

const parseUserAgentString = (ua: string): ReadonlyUserAgentState => {
  const parsed = new UAParser(ua).getResult()

  const os = ((): ReadonlyUserAgentState['os'] => {
    const v = parsed.os.name?.toLowerCase()

    if (v) {
      switch (true) {
        case v.includes('windows'):
          return 'windows'
        case linuxOsRe.test(v):
          return 'linux'
        case v.includes('mac'):
          return 'macOS'
        case iosOsRe.test(v):
          return 'iOS'
        case v.includes('android'):
          return 'android'
      }
    }

    return 'unknown'
  })()

  const browser = ((): ReadonlyUserAgentState['browser'] => {
    const v = parsed.browser.name?.toLowerCase()

    if (v) {
      switch (true) {
        case v.includes('chrome'):
          return 'chrome'
        case v.includes('firefox'):
        case v.includes('firebird'):
          return 'firefox'
        case v.includes('opera'):
          return 'opera'
        case v.includes('safari'):
          return 'safari'
        case v.includes('edge'):
          return 'edge'
      }
    }

    return 'unknown'
  })()

  const browserVersion = ((): ReadonlyUserAgentState['version']['browser'] => {
    const version = parsed.browser.version

    if (version) {
      return {
        major: parseInt(version?.split('.')[0], 10),
        full: version,
      }
    }

    return { major: 0, full: '0.0.0' }
  })()

  return Object.freeze({
    userAgent: parsed.ua,
    browser,
    os,
    version: { browser: browserVersion },
  })
}
