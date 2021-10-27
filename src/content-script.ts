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
        // allows to overload object property with a getter function (without potential exceptions)
        const overloadPropertyWithGetter = (object: any, property: string, value: any): void => {
          if (typeof object === 'object') {
            if (Object.getOwnPropertyDescriptor(object, property) === undefined) {
              Object.defineProperty(object, property, {get: (): any => value})
            }
          }
        }

        // makes required navigator object modifications
        const patchNavigator = (navigator: Navigator): void => {
          if (typeof navigator === 'object') {
            overloadPropertyWithGetter(navigator, 'userAgent', useragent)

            // app version should not contain "Mozilla/" prefix
            overloadPropertyWithGetter(navigator, 'appVersion', useragent.replace(/^Mozilla\//i, ''))

            // firefox always with an empty vendor
            if (useragent.toLowerCase().includes('firefox\/')) {
              overloadPropertyWithGetter(navigator, 'vendor', '')
            }
          }
        }

        // patch current window navigator
        patchNavigator(window.navigator)

        // handler for patching navigator object for the iframes
        // issue: <https://github.com/tarampampam/random-user-agent/issues/142>
        const patchIFramesHandler = (): void => {
          try {
            const iframes = document.getElementsByTagName('iframe')

            for (let i = 0; i < iframes.length; i++) {
              const contentWindow = iframes[i].contentWindow

              if (typeof contentWindow === 'object' && contentWindow !== null) {
                patchNavigator(contentWindow.navigator)
              }
            }
          } finally {
            window.removeEventListener('load', patchIFramesHandler)
          }
        }

        window.addEventListener('load', patchIFramesHandler)
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
