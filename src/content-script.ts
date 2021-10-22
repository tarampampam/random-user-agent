import {RuntimeSender} from './api/transport/runtime'
import {applicableToURI, ApplicableToURIResponse} from './api/handlers/applicable-to-uri'
import {getJSProtectionEnabled, GetJSProtectionEnabledResponse} from './api/handlers/get-js-protection-enabled'
import {getUseragent, GetUseragentResponse} from './api/handlers/get-useragent'

console.debug('>>>', 'content script injected')

// const delay = (ms) => {
//   const startPoint = new Date().getTime()
//   while (new Date().getTime() - startPoint <= ms) {/* wait */}
// }


new RuntimeSender()
  .send( // order is important!
    applicableToURI(window.location.href),
    getJSProtectionEnabled(),
    getUseragent(),
  )
  .then((resp): void => {
window.stop()
    console.debug('>>>', 'response received')

    const applicable = (resp[0] as ApplicableToURIResponse).payload.applicable
    const jsProtectionEnabled = (resp[1] as GetJSProtectionEnabledResponse).payload.enabled
    const useragent = (resp[2] as GetUseragentResponse).payload.useragent
    // const applicable = true
    // const jsProtectionEnabled = true
    // const useragent = 'foo bar'

    console.log(
      applicable,
      jsProtectionEnabled,
      useragent
    )

    if (applicable && jsProtectionEnabled) {
      const script = document.createElement('script'), parent = document.documentElement

      script.textContent = '(' + function (useragent: string): void {
        console.debug('>>>', 'script execute')

        if (typeof window === 'object' && typeof window.navigator === 'object') {
          Object.defineProperty(navigator, 'userAgent', {
            get: function () { return useragent }
          })
          Object.defineProperty(navigator, 'appVersion', {
            get: function () { return useragent }
          })

          // console.log(navigator, window.navigator)
          // console.log(document.documentElement.innerHTML)

          console.debug('>>>', 'script executed')
        }
      } + `)("${useragent}")`
      script.defer = false
      script.async = false
      parent.appendChild(script) // execute the script

      setTimeout(() => {parent.removeChild(script); console.debug('>>>', 'script removed')}, 0) // and remove them on a next tick
    }
  })

// delay(500)
