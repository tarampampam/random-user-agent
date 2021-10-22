import {RuntimeReceiver} from './api/transport/runtime'
import {HandlersRouter} from './api/handlers/handlers'
import Version from './api/handlers/version'
import BrowserStorage from './settings/storage'
import Settings, {SettingEvent} from './settings/settings'
import GetEnabled from './api/handlers/get-enabled'
import SetEnabled from './api/handlers/set-enabled'
import GetUseragent from './api/handlers/get-useragent'
import SetUseragent from './api/handlers/set-useragent'
import {IconState, setExtensionIcon} from './utils/icon'
import Timer from './utils/timer'
import RenewUseragent, {renewUseragent} from './api/handlers/renew-useragent'
import EnabledForDomain from './api/handlers/enabled-for-domain'
import ChangeForDomain from './api/handlers/change-for-domain'
import GetJSProtectionEnabled from './api/handlers/get-js-protection-enabled'
import ApplicableToURI from './api/handlers/applicable-to-uri'

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
        const renewUseragentHandler = new RenewUseragent(settings)

        // start the user-agent auto-renewal interval
        const renewalTimer = new Timer(settings.getRenewalIntervalMillis(), (): void => {
          renewUseragentHandler.handle(renewUseragent()).catch(errorsHandler) // renew useragent manually
        })

        if (settings.isRenewalOnStartupEnabled()) {
          renewUseragentHandler.handle(renewUseragent()).catch(errorsHandler) // renew useragent manually
        }

        // subscribe for the settings changes
        settings.on(SettingEvent.onChange, (): void => {
          // update extension icon state
          setExtensionIcon(settings.isEnabled() ? IconState.Active : IconState.Inactive) // FIXME slow operation, exec only if needed (not every time) + set the icon state on startup

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

        if (settings.isEnabled() && settings.isRenewalEnabled()) {
          renewalTimer.start()
        }

        // register runtime messages listener when all dependencies are ready
        new RuntimeReceiver(
          errorsHandler,
          new HandlersRouter( // register all handlers here
            new Version,
            new GetEnabled(settings),
            new SetEnabled(settings),
            new GetUseragent(settings),
            new SetUseragent(settings),
            renewUseragentHandler,
            new EnabledForDomain(settings),
            new ChangeForDomain(settings),
            new GetJSProtectionEnabled(settings),
            new ApplicableToURI(settings),
          ),
        ).listen()
      })
      .catch(errorsHandler)
  })
  .catch(errorsHandler)

chrome.runtime.onInstalled.addListener(() => {
  // TODO: migrate the old settings into a new format
})

/**
 * @link https://developer.chrome.com/docs/extensions/reference/webRequest/ chrome.webRequest
 */
chrome.webRequest.onBeforeSendHeaders.addListener((details) => {
  console.debug(details)
}, {urls: ['<all_urls>']}, ['blocking', 'requestHeaders'])
