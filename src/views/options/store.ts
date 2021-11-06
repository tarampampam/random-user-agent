import {createStore} from 'vuex'

export enum Page {
  General = 'general',
  Generator = 'generator',
  Blacklist = 'blacklist',
}

export interface State {
  saved: boolean
  page: Page

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
  }
}

export enum Mutation {
  SwitchPage = 'SwitchPage',
  Save = 'Save',
  UpdateEnabled = 'UpdateEnabled',
  UpdateRenew = 'UpdateRenew',
  UpdateJSProtection = 'UpdateJSProtection',
  UpdateCustomUserAgent = 'UpdateCustomUserAgent',
}

export const store = createStore<State>({
  state: {
    saved: true,
    page: Page.General as Page,
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
    },
  },
  mutations: {
    [Mutation.SwitchPage](state: State, page: Page): void {
      state.page = page
    },

    [Mutation.Save](state: State): void {
      state.saved = true
    },

    [Mutation.UpdateEnabled](state: State, enabled: boolean): void {
      if (state.settings.enabled !== enabled) {
        state.settings.enabled = enabled
        state.saved = false
      }
    },

    [Mutation.UpdateRenew](state: State, payload: {enabled?: boolean, intervalSec?: number, onStartup?: boolean}): void {
      if (typeof payload.enabled === 'boolean' && state.settings.renew.enabled !== payload.enabled) {
        state.settings.renew.enabled = payload.enabled
        state.saved = false
      }

      if (typeof payload.intervalSec === 'number' && state.settings.renew.intervalSec !== payload.intervalSec) {
        state.settings.renew.intervalSec = payload.intervalSec
        state.saved = false
      }

      if (typeof payload.onStartup === 'boolean' && state.settings.renew.onStartup !== payload.onStartup) {
        state.settings.renew.onStartup = payload.onStartup
        state.saved = false
      }
    },

    [Mutation.UpdateJSProtection](state: State, payload: {enabled?: boolean}): void {
      if (typeof payload.enabled === 'boolean' && state.settings.jsProtection.enabled !== payload.enabled) {
        state.settings.jsProtection.enabled = payload.enabled
        state.saved = false
      }
    },

    [Mutation.UpdateCustomUserAgent](state: State, payload: {enabled?: boolean, list?: string[]}): void {
      if (typeof payload.enabled === 'boolean' && state.settings.customUseragent.enabled !== payload.enabled) {
        state.settings.customUseragent.enabled = payload.enabled
        state.saved = false
      }

      if (typeof payload.list === 'object' && Array.isArray(payload.list)) {
        state.settings.customUseragent.list = payload.list
          .map((s: string): string => s.trim())
          .filter((s: string): boolean => s.length > 0)

        state.saved = false
      }
    },
  },
})
