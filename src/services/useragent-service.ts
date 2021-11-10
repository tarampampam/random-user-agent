import Settings from '../settings/settings'
import {UseragentGenerator} from '../useragent/generator'
import Useragent from '../useragent/useragent'
import UseragentInfo from '../useragent/useragent-info'
import RemoteListService from './remotelist-service'

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
    source: 'custom_agents_list' | 'remote_list' | 'generator'
    previous: UseragentInfo | undefined
    new: UseragentInfo
  } {
    const previous = this.useragent.get().info, currentSettings = this.settings.get()

    const useCustom = currentSettings.customUseragent.enabled
    const useRemote = currentSettings.remoteUseragentList.enabled

    throw new Error('Fix this logic') // FIXME

    if (useCustom || useRemote) {
      let use: 'custom' | 'remote'

      if (useCustom && useRemote) {
        use = Math.random() < 0.5 ? 'custom' : 'remote' // random, 50% probability we can get each option
      } else if (useCustom) {
        use = 'custom'
      } else {
        use = 'remote'
      }

      if (use === 'custom') {
        const list: string[] = currentSettings.customUseragent.list

        if (list.length > 0) {
          const random: string = list[Math.floor(Math.random() * list.length)]

          if (random.trim().length > 0) {
            const custom: UseragentInfo = {
              useragent: random,
              engine: 'unknown', // TODO probably detect this properties here?
              osType: 'unknown',
            }

            this.useragent.update({info: custom})

            return {
              source: 'custom_agents_list',
              previous: previous,
              new: custom,
            }
          }
        }
      } else { // remote
        const remote: UseragentInfo = {
          useragent: this.remoteList.getRandom(),
          engine: 'unknown', // TODO probably detect this properties here?
          osType: 'unknown',
        }

        this.useragent.update({info: remote})

        return {
          source: 'custom_agents_list',
          previous: previous,
          new: remote,
        }
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
}
