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
  }
}

export enum Mutation {
  SwitchPage = 'SwitchPage',
  Save = 'Save',
  UpdateEnabled = 'UpdateEnabled',
  UpdateRenew = 'UpdateRenew',
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
    },
  },
  mutations: {
    [Mutation.SwitchPage](state: State, page: Page): void {
      state.page = page
    },
    [Mutation.Save](state: State): void {
      state.saved = true
    },
    [Mutation.UpdateEnabled](state: State, isEnabled: boolean): void {
      if (state.settings.enabled !== isEnabled) {
        state.settings.enabled = isEnabled
        state.saved = false
      }
    },
    [Mutation.UpdateRenew](state: State, payload: {isEnabled?: boolean, intervalSec?: number, onStartup?: boolean}): void {
      if (typeof payload !== 'object') {
        return
      }

      if (typeof payload.isEnabled === 'boolean' && state.settings.renew.enabled !== payload.isEnabled) {
        state.settings.renew.enabled = payload.isEnabled
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
  },
})
