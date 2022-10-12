import Settings from '../settings/settings'
import {UseragentGenerator} from '../useragent/generator'
import Useragent from '../useragent/useragent'
import UseragentInfo from '../useragent/useragent-info'
import RemoteListService from './remotelist-service'
import UAParser from 'ua-parser-js'

type UserAgentSource = 'custom_agents_list' | 'remote_list' | 'generator'

export default class UseragentService {
  private readonly settings: Settings
  private readonly useragent: Useragent
  private readonly generator: UseragentGenerator
  private readonly remoteList: RemoteListService

  constructor(settings: Settings, useragent: Useragent, generator: UseragentGenerator, remoteList: RemoteListService) {
    this.settings = settings
    this.useragent = useragent
    this.generator = generator
    this.remoteList = remoteList
  }

  // Renew the useragent (generate a new and set them into the settings)
  renew(): {
    source: UserAgentSource
    previous: UseragentInfo | undefined
    new: UseragentInfo
  } {
    const previous = this.useragent.get().info, currentSettings = this.settings.get()

    const useCustom = currentSettings.customUseragent.enabled
    const useRemote = currentSettings.remoteUseragentList.enabled

    let selected: UseragentInfo | undefined = undefined, source: UserAgentSource | undefined = undefined

    switch (true) {
      case useCustom && useRemote: {
        if (Math.random() < 0.5) { // 50% / 50%
          selected = this.custom()
          source = 'custom_agents_list'
        } else {
          selected = this.remote()
          source = 'remote_list'
        }

        break
      }

      case useCustom: {
        selected = this.custom()
        source = 'custom_agents_list'

        break
      }

      case useRemote: {
        selected = this.remote()
        source = 'remote_list'

        break
      }
    }

    if (selected !== undefined && source !== undefined) {
      this.useragent.update({info: selected})

      return {
        source: source,
        previous: previous,
        new: selected,
      }
    }

    const generated = this.generator.generate(currentSettings.generator.types)

    this.useragent.update({info: generated})

    return {
      source: 'generator',
      previous: previous,
      new: generated,
    }
  }

  private custom(): UseragentInfo | undefined {
    const list: string[] = this.settings.get().customUseragent.list

    if (list.length > 0) {
      const random: string = list[Math.floor(Math.random() * list.length)]

      if (random.trim().length > 0) {
        return this.parseUserAgentString(random)
      }
    }

    return undefined
  }

  private remote(): UseragentInfo | undefined {
    const random: string = this.remoteList.getRandom()

    if (random.trim().length > 0) {
      return this.parseUserAgentString(random)
    }

    return undefined
  }

  private parseUserAgentString(ua: string): UseragentInfo {
    const parsed = (new UAParser(ua)).getResult()

    const result: UseragentInfo = {
      useragent: parsed.ua,
      engine: 'unknown',
      osType: 'unknown',
      browser: 'unknown',
      browserVersion: {
        major: 0,
        full: '',
      },
    }

    switch (parsed.engine.name) {
      case 'WebKit':
        result.engine = 'webkit'
        break

      case 'Blink':
        result.engine = 'blink'
        break

      case 'Gecko':
        result.engine = 'gecko'
        break
    }

    if (parsed.os.name) {
      const osName = parsed.os.name.toLowerCase()

      switch (true) {
        case osName.includes('windows'):
          result.osType = 'windows'
          break

        case /nix|nux|bsd|vms|cent|chrom|fedora|debian|elementary|gentoo|gnu|harmony|kai|mageia|mandriva|manjaro|mint|slack|suse|ubuntu/i.test(osName):
          result.osType = 'linux'
          break

        case osName.includes('mac'):
          result.osType = 'macOS'
          break

        case /iphone|ipad|ipod/i.test(osName):
          result.osType = 'iOS'
          break

        case osName.includes('android'):
          result.osType = 'android'
          break
      }
    }

    if (parsed.browser.name) {
      const browserName = parsed.browser.name.toLowerCase()

      switch (true) {
        case browserName.includes('chrome'):
          result.browser = 'chrome'
          break

        case browserName.includes('firefox'):
        case browserName.includes('firebird'):
          result.browser = 'firefox'
          break

        case browserName.includes('opera'):
          result.browser = 'opera'
          break

        case browserName.includes('safari'):
          result.browser = 'safari'
          break

        case browserName.includes('edge'):
          result.browser = 'edge'
          break
      }
    }

    if (parsed.browser.version) {
      result.browserVersion.full = parsed.browser.version

      const parts = result.browserVersion.full.split('.')

      if (parts.length > 0) {
        result.browserVersion.major = parseInt(parts[0], 10)
      }
    }

    return result
  }
}
