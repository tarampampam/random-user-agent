import {GeneratorType} from '../../useragent/generator'

export interface State {
  settingsSaved: boolean

  settings: {
    enabled: boolean
    renew: {
      enabled: boolean
      intervalSec: number
      onStartup: boolean
    }
    jsProtection: {
      enabled: boolean
    }
    customUseragent: {
      enabled: boolean
      list: string[]
    },
    generator: {
      types: GeneratorType[],
    },
  }
}

export const state: State = { // default state
  settingsSaved: true,

  settings: {
    enabled: false,
    renew: {
      enabled: false,
      intervalSec: 0,
      onStartup: false,
    },
    jsProtection: {
      enabled: false,
    },
    customUseragent: {
      enabled: false,
      list: [],
    },
    generator: {
      types: [],
    },
  },
}
