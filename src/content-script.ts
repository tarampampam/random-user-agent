import {RuntimeSender} from './api/transport/runtime'
import {applicableToURI, ApplicableToURIResponse} from './api/handlers/applicable-to-uri'
import {getJsProtectionSettings, GetJSProtectionEnabledResponse} from './api/handlers/get-js-protection-settings'
import {getUseragent, GetUseragentResponse} from './api/handlers/get-useragent'

new RuntimeSender()
  .send( // order is important!
    applicableToURI(window.location.href),
    getJsProtectionSettings(),
    getUseragent(),
  )
  .then((resp): void => {
    const applicable = (resp[0] as ApplicableToURIResponse).payload.applicable
    const jsProtectionEnabled = (resp[1] as GetJSProtectionEnabledResponse).payload.enabled
    const useragent = (resp[2] as GetUseragentResponse).payload.useragent

    if (applicable && jsProtectionEnabled) {
      const script = document.createElement('script'),
        parent = document.head || document.documentElement

      script.textContent = '(' + function (useragent: string): void {
        if (typeof window === 'object' && typeof window.navigator === 'object') {
          Object.defineProperty(navigator, 'userAgent', {
            get: function () {
              return useragent
            },
          })
          Object.defineProperty(navigator, 'appVersion', {
            get: function () {
              return useragent
            },
          })
        }
      } + `)("${useragent}")`
      script.defer = false
      script.async = false
      parent.appendChild(script) // execute the script

      setTimeout(() => {
        parent.removeChild(script)
      }, 1) // and remove them on a next tick
    }
  })
