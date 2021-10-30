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
      const uaInfo = (resp[2] as GetUseragentResponse).payload.info

      if (applicable && settings.jsProtection.enabled && uaInfo !== undefined) {
        return resolve({
          uaInfo: uaInfo,
        })
      }
    })
    .catch(reject)
})
  .then((p: Payload): string => '(' + function (p: Payload): void {
      // makes required navigator object modifications
      const patchNavigator = (navigator: Navigator): void => {
        // allows to overload object property with a getter function (without potential exceptions)
        const overloadPropertyWithGetter = (object: object, property: string, value: string): void => {
          if (typeof object === 'object') {
            if (Object.getOwnPropertyDescriptor(object, property) === undefined) {
              Object.defineProperty(object, property, {get: (): string => value})
            }
          }
        }

        if (typeof navigator === 'object') {
          overloadPropertyWithGetter(navigator, 'userAgent', p.uaInfo.useragent)

          // app version should not contain "Mozilla/" prefix
          overloadPropertyWithGetter(navigator, 'appVersion', p.uaInfo.useragent.replace(/^Mozilla\//i, ''))

          // patch the platform property (based on os type)
          switch (p.uaInfo.osType) { // fixes <https://github.com/tarampampam/random-user-agent/issues/7>
            case 'windows':
              overloadPropertyWithGetter(navigator, 'platform', 'Win32')
              break

            case 'linux':
              overloadPropertyWithGetter(navigator, 'platform', 'Linux x86_64')
              break

            case 'android':
              overloadPropertyWithGetter(navigator, 'platform', 'Linux armv8l')
              break

            case 'macOS':
              overloadPropertyWithGetter(navigator, 'platform', 'MacIntel')
              break

            case 'iOS':
              overloadPropertyWithGetter(navigator, 'platform', 'iPhone')
              break
          }

          switch (p.uaInfo.engine) {
            case 'blink':
              overloadPropertyWithGetter(navigator, 'vendor', 'Google Inc.')
              break

            case 'gecko': // firefox always with an empty vendor
              overloadPropertyWithGetter(navigator, 'vendor', '')
              break

            case 'webkit':
              overloadPropertyWithGetter(navigator, 'vendor', 'Apple Computer Inc.')
              break
          }
        }
      }
      const patchDynamicIframeElementsContentWindow = (): void =>  {
        const iframes = document.getElementsByTagName('iframe')

        for (let i = 0; i < iframes.length; i++) {
          const contentWindow = iframes[i].contentWindow

          if (typeof contentWindow === 'object' && contentWindow !== null) {
            patchNavigator(contentWindow.navigator)
          }
        }
      }
      // patch current window navigator
      patchNavigator(window.navigator)

      // handler for patching navigator object for the iframes
      // issue: <https://github.com/tarampampam/random-user-agent/issues/142>
      window.addEventListener('load', (): void => {
        patchDynamicIframeElementsContentWindow()
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
      const handler_of_getter = {
        apply: (target, thisArg: object, args: object) => {
          const result: HTMLElement = target.apply(thisArg, args)
          if (result?.tagName?.toUpperCase() === 'IFRAME') {
            const iframe = result as HTMLIFrameElement, contentWindow = iframe.contentWindow
            if (typeof contentWindow === 'object' && contentWindow !== null) {
              patchNavigator(contentWindow.navigator)
            }
          }
          return result
        }
      }
      const handler_of_operator = {
        apply: (target, thisArg: object, args: object) => {
          target.apply(thisArg, args)
          patchDynamicIframeElementsContentWindow()
        }
      }
      const NodePrototype = Node.prototype,elementPrototype = Element.prototype
      const nodeAppendChild = NodePrototype.appendChild,
          nodeInsertBefore = NodePrototype.insertBefore,
          elementAppend = elementPrototype.append
      const nodePrototypeAppendChild = new Proxy(nodeAppendChild, handler_of_getter),
          nodePrototypeInsertBefore = new Proxy(nodeInsertBefore, handler_of_getter),
          elementPrototypeAppend = new Proxy(elementAppend,handler_of_operator)
      const factoryAttributesDefineProperty = (proxy: object) => {
           return {
            get: () => {
              return proxy
            },
            set: () => {
              return () => {} // just prevent to throw err while runtime
            }
          }
      }
      Object.defineProperty(NodePrototype, "appendChild", factoryAttributesDefineProperty(nodePrototypeAppendChild))
      Object.defineProperty(NodePrototype, "insertBefore", factoryAttributesDefineProperty(nodePrototypeInsertBefore))
      Object.defineProperty(elementPrototype, "append", factoryAttributesDefineProperty(elementPrototypeAppend))
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
