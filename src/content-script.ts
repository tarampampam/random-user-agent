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
  .then((resp): void => {
    const applicable = (resp[0] as ApplicableToURIResponse).payload.applicable
    const settings = (resp[1] as GetSettingsResponse).payload
    const useragent = (resp[2] as GetUseragentResponse).payload.useragent

    const jsProtectionEnabled = settings.jsProtection.enabled

    if (applicable && jsProtectionEnabled) {
      const script = document.createElement('script'),
        parent = document.head || document.documentElement

      script.textContent = '(' + function (useragent: string): void {
        if (typeof window === 'object' && typeof window.navigator === 'object') {
          console.log('setup fake UA')

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
