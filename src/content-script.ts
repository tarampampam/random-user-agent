import {RuntimeSender} from './messaging/runtime'
import {applicableToURI, ApplicableToURIResponse} from './messaging/handlers/applicable-to-uri'
import {getSettings, GetSettingsResponse} from './messaging/handlers/get-settings'
import {getUseragent, GetUseragentResponse} from './messaging/handlers/get-useragent'

new RuntimeSender()
  .send( // order is important!
    applicableToURI(window.location.href),
    getSettings(),
    getUseragent(),
  )
  .then((resp): void => { // <-- the promise is the main problem for hiding from inline scripts detection
    const applicable = (resp[0] as ApplicableToURIResponse).payload.applicable
    const settings = (resp[1] as GetSettingsResponse).payload
    const useragent = (resp[2] as GetUseragentResponse).payload.useragent

    if (applicable && settings.jsProtection.enabled) {
      const script = document.createElement('script'), parent = document.head || document.documentElement

      script.textContent = '(' + function (useragent: string): void {
        if (typeof window === 'object' && typeof window.navigator === 'object') {
          try {
            Object.defineProperty(navigator, 'userAgent', {get: (): string => useragent})
            Object.defineProperty(navigator, 'appVersion', {get: (): string => useragent})

            if (useragent.toLowerCase().includes('firefox')) {
              Object.defineProperty(navigator, 'vendor', {get: (): string => ''}) // firefox always with an empty vendor
            }
          } catch (e) {
            console.warn('Cannot modify user-agent properties on the navigator object: ', e)
          }
        }
      } + `)("${useragent}")`

      // script.defer = false
      // script.async = false
      parent.appendChild(script) // execute the script

      setTimeout(() => {
        parent.removeChild(script)
      }) // and remove them on a next tick
    }
  })
  .catch(console.warn)

// Duty, but workable hack:
// const when = Date.now() + 500
// while (Date.now() < when) {
//   // do nothing
// }
