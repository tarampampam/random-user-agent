import {RuntimeSender, Sender} from '../../messaging/runtime'
import {getSettings, GetSettingsResponse} from '../../messaging/handlers/get-settings'
import {updateSettings} from '../../messaging/handlers/update-settings'
import {Mutation} from './mutations'
import {ActionTree, Commit} from 'vuex'
import {State} from './state'

export enum Actions {
  LoadSettings = 'LoadSettings',
  SaveSettings = 'SaveSettings',
}

const backend: Sender = new RuntimeSender

export const actions: ActionTree<State, State> = {
  [Actions.LoadSettings]({commit}: { commit: Commit }): Promise<void> {
    return new Promise<void>((resolve: () => void, reject: (err: Error) => void) => {
      backend
        .send(getSettings())
        .then((resp): void => {
          const settings = (resp[0] as GetSettingsResponse).payload

          commit(Mutation.UpdateEnabled, settings.enabled)
          commit(Mutation.UpdateRenew, {
            enabled: settings.renew.enabled,
            intervalSec: Math.round(settings.renew.intervalMillis / 1000),
            onStartup: settings.renew.onStartup,
          })
          commit(Mutation.UpdateJSProtection, {
            enabled: settings.jsProtection.enabled,
          })
          commit(Mutation.UpdateCustomUserAgent, {
            enabled: settings.customUseragent.enabled,
            list: settings.customUseragent.list,
          })

          commit(Mutation.SaveSettings) // just a little "logic" hack :)

          resolve()
        })
        .catch(reject)
    })
  },

  [Actions.SaveSettings]({commit, state}: { commit: Commit, state: State }): Promise<void> {
    return new Promise<void>((resolve: () => void, reject: (err: Error) => void) => {
      backend
        .send(updateSettings({
          enabled: state.settings.enabled,
          renew: {
            enabled: state.settings.renew.enabled,
            intervalMillis: Math.round(state.settings.renew.intervalSec * 1000),
            onStartup: state.settings.renew.onStartup,
          },
          customUseragent: {
            enabled: state.settings.customUseragent.enabled,
            list: state.settings.customUseragent.list.slice(0), // proxy object to the plain array
          },
          jsProtection: {
            enabled: state.settings.jsProtection.enabled,
          },
          // generator: {
          //   types: state.settings.generator.types.slice(0), // proxy object to the plain array
          // },
          // blacklist: {
          //   mode: state.settings.blacklist.modeWhitelist ? BlacklistMode.WhiteList : BlacklistMode.BlackList,
          //   domains: state.settings.blacklist.domains.slice(0), // proxy object to the plain array
          //   custom: {
          //     rules: state.settings.blacklist.custom.rules.slice(0), // proxy object to the plain array
          //   },
          // },
        }))
        .then((): void => {
          commit(Mutation.SaveSettings)

          resolve()
        })
        .catch(reject)
    })
  },
}
