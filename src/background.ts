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

// define default errors handler for the background page
const errorsHandler: (err: Error) => void = console.error

// create extension storage instance
const storage = new BrowserStorage()

// storage must be initialized before usage
storage.init()
  .then(() => {
    const settings = new Settings(storage)

    // load extension settings from the storage
    settings.load()
      .then(() => {
        // update extension icon on startup
        setExtensionIcon(settings.get().enabled ? IconState.Active : IconState.Inactive)

        // create all required services
        const useragentService = new UseragentService(settings, new Generator())
        const filterService = new FilterService(settings)

        // start the useragent auto-renewal interval
        const renewalTimer = new Timer(settings.get().renew.intervalMillis, (): void => {
          useragentService.renew()
        })

        // renew the useragent on startup, if needed
        if (settings.get().renew.onStartup) {
          useragentService.renew()
        }

        // start the renewal timer, if extension and this feature are enabled
        if (settings.get().enabled && settings.get().renew.enabled) {
          renewalTimer.start()
        }

        // subscribe for the settings changes
        settings.on(SettingEvent.onChange, (): void => {
          // update extension icon state
          setExtensionIcon(settings.get().enabled ? IconState.Active : IconState.Inactive)

          if (settings.get().enabled) {
            if (settings.get().renew.enabled) {
              // update renewal interval, if needed
              const currentInterval = settings.get().renew.intervalMillis
              if (renewalTimer.getIntervalMillis() !== currentInterval) {
                renewalTimer.setIntervalMillis(currentInterval)
              }

              if (!renewalTimer.isStarted()) {
                renewalTimer.start()
              }
            } else {
              renewalTimer.stop()
            }
          } else {
            renewalTimer.stop()
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
          ),
          errorsHandler,
        ).listen()

        // this hook is required for the HTTP headers modification
        new BeforeSendHeaders(settings, filterService).listen()
      })
      .catch(errorsHandler)
  })
  .catch(errorsHandler)

chrome.runtime.onInstalled.addListener(() => {
  // TODO: migrate the old settings into a new format
})
