import {RuntimeSender} from './api/transport/runtime'
import {applicableToURI, ApplicableToURIResponse} from './api/handlers/applicable-to-uri'
import {getSettings, GetSettingsResponse} from './api/handlers/get-settings'

new RuntimeSender()
  .send( // order is important!
    applicableToURI(window.location.href),
    getSettings(),
  )
  .then((resp): void => {
    const applicable = (resp[0] as ApplicableToURIResponse).payload.applicable

    const settings = (resp[0] as GetSettingsResponse).payload
    const jsProtectionEnabled = settings.jsProtection.enabled
    const useragent = settings.useragent

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
