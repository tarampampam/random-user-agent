import {RuntimeReceiver} from './api/transport/runtime'
import {HandlersRouter} from './api/handlers/handlers'
import {Version} from './api/handlers/version'
import BrowserStorage from './settings/storage'
import Settings, {SettingEvent} from './settings/settings'

// define default errors handler for the background page
const errorsHandler: (err: Error) => void = console.error

chrome.runtime.onInstalled.addListener(() => {
  // TODO: migrate the old settings into a new format
})

const storage = new BrowserStorage()

// storage must be initialized before usage
storage.init()
  .then(() => {
    const settings = new Settings(storage)

    // save settings state on changes
    settings.on(SettingEvent.onChange, (): void => {
      settings.save().catch(errorsHandler)
    })

    settings.load()
      .then(() => {
        // register runtime messages listener when all dependencies are ready
        new RuntimeReceiver(
          errorsHandler,
          new HandlersRouter( // register all handlers here
            new Version,
          ),
        ).listen()
      })
      .catch(errorsHandler)
  })
  .catch(errorsHandler)

/**
 * @link https://developer.chrome.com/docs/extensions/reference/webRequest/ chrome.webRequest
 */
chrome.webRequest.onBeforeSendHeaders.addListener((details) => {
  console.debug(details)
}, {urls: ['<all_urls>']}, ['blocking', 'requestHeaders'])
