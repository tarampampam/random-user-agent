import {MutationTree} from 'vuex'
import {State} from './state'
import {GeneratorType, isValidType} from '../../useragent/generator'

export enum Mutation {
  SaveSettings = 'SaveSettings',
  UpdateEnabled = 'UpdateEnabled',
  UpdateRenew = 'UpdateRenew',
  UpdateJSProtection = 'UpdateJSProtection',
  UpdateCustomUserAgent = 'UpdateCustomUserAgent',
  UpdateGeneratorOptions = 'UpdateGeneratorOptions',
}

export const mutations: MutationTree<State> = {
  [Mutation.SaveSettings](state: State): void {
    state.settingsSaved = true
  },

  [Mutation.UpdateEnabled](state: State, enabled: boolean): void {
    if (state.settings.enabled !== enabled) {
      state.settings.enabled = enabled
      state.settingsSaved = false
    }
  },

  [Mutation.UpdateRenew](state: State, payload: { enabled?: boolean, intervalSec?: number, onStartup?: boolean }): void {
    if (typeof payload.enabled === 'boolean' && state.settings.renew.enabled !== payload.enabled) {
      state.settings.renew.enabled = payload.enabled
      state.settingsSaved = false
    }

    if (typeof payload.intervalSec === 'number' && state.settings.renew.intervalSec !== payload.intervalSec) {
      state.settings.renew.intervalSec = payload.intervalSec
      state.settingsSaved = false
    }

    if (typeof payload.onStartup === 'boolean' && state.settings.renew.onStartup !== payload.onStartup) {
      state.settings.renew.onStartup = payload.onStartup
      state.settingsSaved = false
    }
  },

  [Mutation.UpdateJSProtection](state: State, payload: { enabled?: boolean }): void {
    if (typeof payload.enabled === 'boolean' && state.settings.jsProtection.enabled !== payload.enabled) {
      state.settings.jsProtection.enabled = payload.enabled
      state.settingsSaved = false
    }
  },

  [Mutation.UpdateCustomUserAgent](state: State, payload: { enabled?: boolean, list?: string[] }): void {
    if (typeof payload.enabled === 'boolean' && state.settings.customUseragent.enabled !== payload.enabled) {
      state.settings.customUseragent.enabled = payload.enabled
      state.settingsSaved = false
    }

    if (Array.isArray(payload.list)) {
      state.settings.customUseragent.list = payload.list
        .map((s: string): string => s.trim())
        .filter((s: string): boolean => s.length > 0)

      state.settingsSaved = false
    }
  },

  [Mutation.UpdateGeneratorOptions](state: State, payload: { types?: GeneratorType[] } ): void {
    if (Array.isArray(payload.types)) {
      state.settings.generator.types = payload.types
        .filter((t): boolean => isValidType(t))
        .filter((value, index, self): boolean => self.indexOf(value) === index)
        .sort()

      state.settingsSaved = false
    }
  },
}
