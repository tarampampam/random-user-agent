import {RuntimeReceiver} from './api/transport/runtime'
import {HandlersRouter} from './api/handlers/handlers'
import Version from './api/handlers/version'
import BrowserStorage from './settings/storage'
import Settings, {SettingEvent} from './settings/settings'
import GetEnabled from './api/handlers/get-enabled'
import SetEnabled from './api/handlers/set-enabled'
import GetUseragent from './api/handlers/get-useragent'
import {IconState, setExtensionIcon} from './utils/icon'
import Timer from './utils/timer'
import RenewUseragent from './api/handlers/renew-useragent'
import EnabledForDomain from './api/handlers/enabled-for-domain'
import ChangeForDomain from './api/handlers/change-for-domain'
import GetJSProtectionSettings from './api/handlers/get-js-protection-settings'
import ApplicableToURI from './api/handlers/applicable-to-uri'
import UseragentService from './services/useragent-service'
import Generator from './useragent/generator'
import FilterService from './services/filter-service'
import BeforeSendHeaders from './hooks/before-send-headers'
import GetRenewSettings from './api/handlers/get-renew-settings'

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
        setExtensionIcon(settings.isEnabled() ? IconState.Active : IconState.Inactive)

        // create all required services
        const useragentService = new UseragentService(settings, new Generator())
        const filterService = new FilterService(settings)

        // start the useragent auto-renewal interval
        const renewalTimer = new Timer(settings.getRenewalIntervalMillis(), (): void => {
          useragentService.renew()
        })

        // renew the useragent on startup, if needed
        if (settings.isRenewalOnStartupEnabled()) {
          useragentService.renew()
        }

        // start the renewal timer, if extension and this feature are enabled
        if (settings.isEnabled() && settings.isRenewalEnabled()) {
          renewalTimer.start()
        }

        // subscribe for the settings changes
        settings.on(SettingEvent.onChange, (): void => {
          // update extension icon state
          setExtensionIcon(settings.isEnabled() ? IconState.Active : IconState.Inactive)

          if (settings.isEnabled()) {
            if (settings.isRenewalEnabled()) {
              // update renewal interval, if needed
              const currentInterval = settings.getRenewalIntervalMillis()
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
            new GetEnabled(settings),
            new SetEnabled(settings),
            new GetUseragent(settings),
            new GetJSProtectionSettings(settings),
            new RenewUseragent(useragentService),
            new EnabledForDomain(filterService),
            new ChangeForDomain(filterService),
            new ApplicableToURI(filterService),
            new GetRenewSettings(settings),
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
