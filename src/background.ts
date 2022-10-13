import {RuntimeReceiver} from './messaging/runtime'
import {HandlersRouter} from './messaging/handlers'
import Version from './messaging/handlers/version'
import BrowserStorage from './settings/storage'
import Settings, {SettingEvent} from './settings/settings'
import {IconState, setExtensionIcon} from './utils/icon'
import Timer from './utils/timer'
import RenewUseragent from './messaging/handlers/renew-useragent'
import EnabledForDomain from './messaging/handlers/enabled-for-domain'
import ChangeForDomain from './messaging/handlers/change-for-domain'
import ApplicableToURI from './messaging/handlers/applicable-to-uri'
import UseragentService from './services/useragent-service'
import Generator from './useragent/generator'
import FilterService from './services/filter-service'
import BeforeSendHeaders from './hooks/before-send-headers'
import UpdateSettings from './messaging/handlers/update-settings'
import GetSettings from './messaging/handlers/get-settings'
import Useragent, {UseragentStateEvent} from './useragent/useragent'
import GetUseragent from './messaging/handlers/get-useragent'
import UpdateUseragent from './messaging/handlers/update-useragent'
import HeadersReceived from './hooks/headers-received'
import RemoteListService, {LocalStorageStringsCache} from './services/remotelist-service'
import UpdateRemoteUAList from './messaging/handlers/update-remote-ua-list'
import OnCommand from './hooks/commands'

// define default errors handler for the background page
const errorsHandler: (err: Error) => void = console.error

// create extension storage instance
const storage = new BrowserStorage()
// create extension useragent state storage
const useragent = new Useragent()

useragent.load().then((): void => { // load useragent state
  useragent.on(UseragentStateEvent.onChange, (): void => {
    useragent.save().catch(errorsHandler) // save useragent state on update
  })

  storage.init().then((): void => { // storage must be initialized before usage
    const settings = new Settings(storage)

    settings.load().then((): void => { // load extension settings from the storage
      const initialSettings = settings.get()

      // update extension icon on startup
      setExtensionIcon(initialSettings.enabled ? IconState.Active : IconState.Inactive)

      // create all required services
      const remoteListService = new RemoteListService(new LocalStorageStringsCache())
      const useragentService = new UseragentService(settings, useragent, new Generator(), remoteListService)
      const filterService = new FilterService(settings)

      // set the remote list URI
      if (initialSettings.remoteUseragentList.enabled && initialSettings.remoteUseragentList.uri.length > 0) {
        remoteListService.setUri(initialSettings.remoteUseragentList.uri)
      }

      remoteListService.init().then((): void => { // initialize remote user-agent list
        // create the useragent auto-renewal timer
        const renewalTimer = new Timer(initialSettings.renew.intervalMillis, (): void => {
          useragentService.renew()
        })

        // create the remote user-agents list auto-updating timer
        const remoteListUpdateTimer = new Timer(initialSettings.remoteUseragentList.updateIntervalMillis, (): void => {
          remoteListService.update().catch(errorsHandler)
        })

        // update the remote user-agents list if empty
        if (initialSettings.remoteUseragentList.enabled && remoteListService.get().length === 0) {
          remoteListService.update().catch(errorsHandler)
        }

        // renew the useragent on startup, if needed
        if (initialSettings.renew.onStartup) {
          useragentService.renew()
        }

        // start the renewal timer, if extension and this feature are enabled
        if (initialSettings.enabled && initialSettings.renew.enabled) {
          renewalTimer.start()
        }

        // start the remote user-agent list timer, if extension and this feature are enabled
        if (initialSettings.enabled && initialSettings.remoteUseragentList.enabled) {
          remoteListService.update().catch(errorsHandler) // update on startup

          if (remoteListUpdateTimer.getIntervalMillis() > 0) {
            remoteListUpdateTimer.start()
          }
        }

        // subscribe for the settings changes
        settings.on(SettingEvent.onChange, (): void => {
          const changedSettings = settings.get()

          // update extension icon state
          setExtensionIcon(changedSettings.enabled ? IconState.Active : IconState.Inactive)

          if (changedSettings.enabled) {
            if (changedSettings.renew.enabled) {
              // update renewal interval, if needed
              if (renewalTimer.getIntervalMillis() !== changedSettings.renew.intervalMillis) {
                renewalTimer.setIntervalMillis(changedSettings.renew.intervalMillis)
              }

              if (!renewalTimer.isStarted()) {
                renewalTimer.start()
              }
            } else {
              renewalTimer.stop()
            }

            if (changedSettings.remoteUseragentList.enabled) {
              // update remote agents updating interval, if needed
              if (remoteListUpdateTimer.getIntervalMillis() !== changedSettings.remoteUseragentList.updateIntervalMillis) {
                if (changedSettings.remoteUseragentList.updateIntervalMillis > 0) {
                  remoteListUpdateTimer.setIntervalMillis(changedSettings.remoteUseragentList.updateIntervalMillis)
                } else {
                  remoteListUpdateTimer.stop()
                }
              }

              // update the list URI
              if (remoteListService.getUri() !== changedSettings.remoteUseragentList.uri) {
                remoteListService.setUri(changedSettings.remoteUseragentList.uri)
                remoteListService.update().catch(errorsHandler)

                if (changedSettings.remoteUseragentList.updateIntervalMillis > 0) {
                  remoteListUpdateTimer.restart()
                }
              }

              if (!remoteListUpdateTimer.isStarted() && changedSettings.remoteUseragentList.updateIntervalMillis > 0) {
                remoteListUpdateTimer.start()
              }
            } else {
              remoteListUpdateTimer.stop()
            }
          } else {
            renewalTimer.stop()
            remoteListUpdateTimer.stop()
          }

          // and save
          settings.save().catch(errorsHandler)
        })

        // register runtime messages listener when all dependencies are ready
        new RuntimeReceiver(
          new HandlersRouter( // register all handlers here
            new Version,
            new GetSettings(settings),
            new UpdateSettings(settings),
            new RenewUseragent(useragentService),
            new EnabledForDomain(filterService),
            new ChangeForDomain(filterService),
            new ApplicableToURI(filterService),
            new GetUseragent(useragent),
            new UpdateUseragent(useragent),
            new UpdateRemoteUAList(remoteListService, errorsHandler),
          ),
          errorsHandler,
        ).listen()

        // this hook is required for the HTTP headers modification
        new BeforeSendHeaders(settings, useragent, filterService).listen()

        // this hook allows to send important data to the content script without using sendMessage()
        new HeadersReceived(settings, useragent, filterService).listen()

        // this hook allows handle keyboard shortcuts
        new OnCommand(useragentService).listen()
      }).catch(errorsHandler)
    }).catch(errorsHandler)
  }).catch(errorsHandler)
}).catch(errorsHandler)
