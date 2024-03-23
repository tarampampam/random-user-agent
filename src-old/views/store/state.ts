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
    }
    remoteUseragentList: {
      enabled: boolean
      uri: string
      updateIntervalSec: number
    }
    generator: {
      types: GeneratorType[]
    }
    blacklist: {
      modeWhitelist: boolean
      domains: string[]
      custom: {
        rules: string[]
      }
    }
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
    remoteUseragentList: {
      enabled: false,
      uri: '',
      updateIntervalSec: 0,
    },
    generator: {
      types: [],
    },
    blacklist: {
      modeWhitelist: false,
      domains: [],
      custom: {
        rules: [],
      },
    },
  },
}
