import {RuntimeReceiver} from './api/transport/runtime'
import {HandlersRouter} from './api/handlers/handlers'
import Version from './api/handlers/version'
import BrowserStorage from './settings/storage'
import Settings, {SettingEvent} from './settings/settings'
import GetEnabled from './api/handlers/get-enabled'
import SetEnabled from './api/handlers/set-enabled'
import GetUseragent from './api/handlers/get-useragent'
import SetUseragent from './api/handlers/set-useragent'
import {IconState, setExtensionIcon} from './ui/icon'
import Timer from './utils/timer'
import NewUseragent from './api/handlers/new-useragent'

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
        // start the user-agent auto-renewal interval
        const renewalTimer = new Timer(settings.getRenewalIntervalMillis(), (): void => {
          console.debug('timer tick') // TODO renew the useragent here
        })

        if (settings.isRenewalOnStartupEnabled()) {
          // TODO renew the useragent here
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
            new NewUseragent(settings),
          ),
        ).listen()

        // change extension icon for ignored URIs
        chrome.tabs.onUpdated.addListener((tabId: number, changeInfo, tab): void => {
          if (changeInfo.status === 'loading') {
            if (false) { // TODO if (API.exceptions.uriMatch({uri: tab.url})) { ... }
              setExtensionIcon(IconState.Inactive, tab.id)
            }
          }
        })
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
