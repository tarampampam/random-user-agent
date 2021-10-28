import {RuntimeSender} from './messaging/runtime'
import {applicableToURI, ApplicableToURIResponse} from './messaging/handlers/applicable-to-uri'
import {getSettings, GetSettingsResponse} from './messaging/handlers/get-settings'
import {getUseragent, GetUseragentResponse} from './messaging/handlers/get-useragent'
import {CookieName, decode, Payload} from './hooks/headers-received'

new Promise((resolve: (p: Payload) => void, reject: (e: Error) => void) => {
  // make an attempt to fetch the payload from the cookies
  const cookies = document.cookie.split(';')

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trimLeft()

    if (cookie.startsWith(CookieName + '=')) {
      const parts = cookie.split('=')

      if (parts.length >= 2) {
        document.cookie = `${CookieName}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/` // remove the cookie

        return resolve(decode(parts[1]))
      }
    }
  }

  // and as a fallback - sending requests to the background script
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

      if (applicable && settings.jsProtection.enabled && typeof useragent === 'string') {
        return resolve({
          useragent: useragent,
        })
      }
    })
    .catch(reject)
})
  .then((p: Payload): string => '(' + function (p: Payload): void {
      // allows to overload object property with a getter function (without potential exceptions)
      const overloadPropertyWithGetter = (object: object, property: string, value: any): void => {
        if (typeof object === 'object') {
          if (Object.getOwnPropertyDescriptor(object, property) === undefined) {
            Object.defineProperty(object, property, {get: (): any => value})
          }
        }
      }

      // makes required navigator object modifications
      const patchNavigator = (navigator: Navigator): void => {
        if (typeof navigator === 'object') {
          overloadPropertyWithGetter(navigator, 'userAgent', p.useragent)

          // app version should not contain "Mozilla/" prefix
          overloadPropertyWithGetter(navigator, 'appVersion', p.useragent.replace(/^Mozilla\//i, ''))

          // firefox always with an empty vendor
          if (p.useragent.toLowerCase().includes('firefox\/')) {
            overloadPropertyWithGetter(navigator, 'vendor', '')
          }
        }
      }

      // patch current window navigator
      patchNavigator(window.navigator)

      // handler for patching navigator object for the iframes
      // issue: <https://github.com/tarampampam/random-user-agent/issues/142>
      window.addEventListener('load', (): void => {
        const iframes = document.getElementsByTagName('iframe')

        for (let i = 0; i < iframes.length; i++) {
          const contentWindow = iframes[i].contentWindow

          if (typeof contentWindow === 'object' && contentWindow !== null) {
            patchNavigator(contentWindow.navigator)
          }
        }
      }, {once: true, passive: true})

      // watch for the new iframes dynamic creation
      new MutationObserver((mutations): void => {
        mutations.forEach((mutation): void => {
          mutation.addedNodes.forEach((addedNode): void => {
            if (addedNode.nodeName === 'IFRAME') {
              const iframe = addedNode as HTMLIFrameElement, contentWindow = iframe.contentWindow

              if (typeof contentWindow === 'object' && contentWindow !== null) {
                patchNavigator(contentWindow.navigator)
              }
            }
          })
        })
      }).observe(document, {childList: true, subtree: true})
    } + `)(${JSON.stringify(p)})`,
  )
  .then((scriptContent: string): void => {
    const script = document.createElement('script'), parent = document.head || document.documentElement

    script.textContent = scriptContent

    // script.defer = false
    // script.async = false
    parent.appendChild(script) // execute the script

    setTimeout(() => {
      parent.removeChild(script)
    }) // and remove them on a next tick
  })
  .catch(console.warn)
