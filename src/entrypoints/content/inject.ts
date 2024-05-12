// ⚠ DO NOT IMPORT ANYTHING EXCEPT TYPES HERE DUE THE `import()` ERRORS ⚠
import type { ContentScriptPayload } from '~/shared/types'
import type { DeepWriteable } from '~/types'

// wrap everything to avoid polluting the global scope
// eslint-disable-next-line no-extra-semi
;(() => {
  // prevent the script from running multiple times
  {
    const [key, ds, flag] = [__UNIQUE_HEADER_KEY_NAME__.toLowerCase(), document.documentElement.dataset, 'true']
    if (ds[key] === flag) {
      return
    }

    ds[key] = flag

    setTimeout(() => delete ds[key], 1000) // remove the dataset attribute after 1 second
  }

  /** Extracts the payload from the performance entries (which are sent by the background script) */
  const extractPayload = (): ContentScriptPayload | undefined => {
    for (const entry of performance.getEntriesByType('navigation')) {
      if (entry instanceof PerformanceNavigationTiming) {
        for (const timing of entry.serverTiming) {
          if (timing.name === __UNIQUE_HEADER_KEY_NAME__) {
            return JSON.parse(atob(timing.description.replace(/_/g, '=')))
          }
        }
      }
    }

    return
  }

  /** Finds and removes the injected script */
  const findAndRemoveScriptTag = (): boolean => {
    const injectedScript = document.getElementById(__UNIQUE_INJECT_FILENAME__) as HTMLScriptElement | null
    if (injectedScript) {
      injectedScript.remove()

      return true
    }

    return false
  }

  /** Overloads the object property with the new value. */
  const overload = <T>(
    t: T,
    prop: T extends Navigator ? keyof T | 'oscpu' : keyof T,
    value: unknown,
    options: { force?: boolean; configurable?: boolean; writable?: boolean } = {
      force: false,
      configurable: false,
      writable: false,
    }
  ): void => {
    let target: T = t

    try {
      while (target !== null) {
        const descriptor = Object.getOwnPropertyDescriptor(target, prop)

        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
        if (descriptor && descriptor.configurable) {
          const newAttributes: PropertyDescriptor = { configurable: options.configurable, enumerable: true }

          // respect the original value getting method
          if (descriptor.get) {
            newAttributes.get = () => value
          } else {
            newAttributes.value = value
            newAttributes.writable = options.writable
          }

          Object.defineProperty(target, prop, newAttributes)
        } else if (options.force && Object.getPrototypeOf(t) === Object.getPrototypeOf(target)) {
          Object.defineProperty(target, prop, {
            value,
            configurable: options.configurable,
            enumerable: true,
            writable: options.writable,
          })
        }

        target = Object.getPrototypeOf(target)
      }
    } catch (_) {
      // do nothing
    }
  }

  try {
    // first of all, remove the injected script
    findAndRemoveScriptTag()

    // check the payload existence and do nothing if it is not found
    const payload = extractPayload()
    if (!payload) {
      // no payload = no fun
      //
      // probably, the page was already patched and the script tag was removed by this script, but registered with
      // the `world: 'MAIN'` property (Chromium-based browsers only)
      return
    }

    /**
     * Function to patch the navigator object.
     *
     * @link https://developer.mozilla.org/en-US/docs/Web/API/Navigator
     */
    const patchNavigator = (n: Navigator): void => {
      if (n === null || typeof n !== 'object' || !('userAgent' in n)) {
        return
      }

      // to test, execute in the console: `console.log(navigator.userAgent)`
      overload(
        n,
        'userAgent',
        ((): string => {
          switch (payload.current.browser) {
            case 'chrome':
            case 'opera':
            case 'edge': // blink engine
              // mask the browser (and under the hood) versions, keeping only the major version (e.g., 92.0.4515.107 -> 92.0.0.0)
              const masked = payload.current.userAgent.replaceAll(
                payload.current.version.browser.full,
                payload.current.version.browser.major +
                  '.0'.repeat(Math.max(0, payload.current.version.browser.full.split('.').length - 1))
              )

              if (payload.current.version.underHood) {
                return masked.replaceAll(
                  payload.current.version.underHood.full || '',
                  payload.current.version.underHood.major +
                    '.0'.repeat(Math.max(0, payload.current.version.underHood.full.split('.').length - 1))
                )
              }

              return masked
          }

          return payload.current.userAgent
        })()
      )

      // to test, execute in the console: `console.log(navigator.appVersion)`
      overload(
        n,
        'appVersion',
        ((): string => {
          if (payload.current.browser === 'firefox') {
            switch (payload.current.os) {
              case 'windows':
                return '5.0 (Windows)'
              case 'linux':
                return '5.0 (X11)'
            }

            return '5.0'
          }

          return payload.current.userAgent.replace(/^Mozilla\//i, '')
        })()
      )

      // to test, execute in the console: `console.log(navigator.platform, navigator.oscpu)`
      switch (payload.current.os) {
        case 'windows':
          overload(n, 'platform', 'Win32')
          overload(n, 'oscpu', payload.current.browser === 'firefox' ? 'Windows NT; Win64; x64' : undefined, {
            force: true,
          })
          break

        case 'linux':
          overload(n, 'platform', 'Linux x86_64')
          overload(n, 'oscpu', payload.current.browser === 'firefox' ? 'Linux x86_64' : undefined, { force: true })
          break

        case 'android':
          overload(n, 'platform', 'Linux armv8l')
          overload(n, 'oscpu', payload.current.browser === 'firefox' ? 'Linux armv8l' : undefined, { force: true })
          break

        case 'macOS':
          overload(n, 'platform', 'MacIntel')
          overload(n, 'oscpu', payload.current.browser === 'firefox' ? 'Mac OS X' : undefined, { force: true })
          break

        case 'iOS':
          overload(n, 'platform', 'iPhone')
          overload(n, 'oscpu', payload.current.browser === 'firefox' ? 'Mac OS X' : undefined, { force: true })
          break

        default:
          overload(n, 'oscpu', undefined, { force: true })
      }

      // to test, execute in the console: `console.log(navigator.vendor)`
      switch (payload.current.browser) {
        case 'chrome':
        case 'opera':
        case 'edge': // blink engine
          overload(n, 'vendor', 'Google Inc.')
          break

        case 'firefox': // gecko engine
          overload(n, 'vendor', '') // firefox always with an empty vendor
          break

        case 'safari': // webkit engine
          overload(n, 'vendor', 'Apple Computer, Inc.')
          break

        default:
          overload(n, 'vendor', undefined)
      }

      /**
       * @link https://developer.mozilla.org/en-US/docs/Web/API/Navigator/userAgentData#browser_compatibility
       * @link https://chromium.googlesource.com/chromium/src/+/refs/heads/main/third_party/blink/renderer/core/frame/navigator_ua_data.cc
       */
      switch (payload.current.browser) {
        case 'firefox':
        case 'safari':
          // FireFox and Safari does not support the `userAgentData` property yet
          overload(n, 'userAgentData', undefined, { force: true })
          break

        default:
          // check the `userAgentData` property availability in current (real) browser
          const isAvailable = 'userAgentData' in n && typeof n.userAgentData === 'object'

          // store the original `userAgentData`, or craft a mock object if it does not exist
          const agentDataObject: NavigatorUAData = isAvailable
            ? n.userAgentData
            : {
                brands: [],
                mobile: false,
                platform: '',
                toJSON(): UALowEntropyJSON {
                  return { brands: [], mobile: false, platform: '' }
                },
                getHighEntropyValues(): Promise<UADataValues> {
                  return Promise.resolve({ brands: [], mobile: false, platform: '' })
                },
              }

          // if the real browser does not support the `userAgentData` property, then overload it with the mock object
          // this is necessary to avoid errors during overload the `userAgentData` properties
          if (!isAvailable) {
            overload(n, 'userAgentData', agentDataObject, { force: true, configurable: true })
          }

          // to test, execute in the console: `console.log(navigator.userAgentData.brands)`
          overload(
            n.userAgentData,
            'brands',
            payload.brands.major.map(({ brand, version }) => ({ brand, version }))
          )

          // to test, execute in the console: `console.log(navigator.userAgentData.mobile)`
          overload(n.userAgentData, 'mobile', payload.isMobile)

          // to test, execute in the console: `console.log(navigator.userAgentData.platform)`
          overload(n.userAgentData, 'platform', payload.platform)

          // to test, execute in the console: `console.log(navigator.userAgentData.toJSON())`
          overload(
            n.userAgentData,
            'toJSON',
            new Proxy(agentDataObject.toJSON, {
              apply(target, self, args) {
                return {
                  ...Reflect.apply(target, self, args),
                  brands: payload.brands.major.map(({ brand, version }) => ({ brand, version })),
                  mobile: payload.isMobile,
                  platform: payload.platform,
                }
              },
            })
          )

          // to test, execute in the console: `console.log(await navigator.userAgentData.getHighEntropyValues([...]))`
          overload(
            n.userAgentData,
            'getHighEntropyValues',
            new Proxy(agentDataObject.getHighEntropyValues, {
              apply(target, self, args) {
                return new Promise((resolve: (v: UADataValues) => void, reject: () => void): void => {
                  // get the original high entropy values
                  Reflect.apply(target, self, args)
                    .then((values: UADataValues): void => {
                      const data: DeepWriteable<UADataValues> = {
                        ...values,
                        brands: payload.brands.major.map(({ brand, version }) => ({ brand, version })),
                        fullVersionList: payload.brands.full.map(({ brand, version }) => ({ brand, version })),
                        mobile: payload.isMobile,
                        model: '',
                        platform: payload.platform,
                        platformVersion: ((): string => {
                          switch (payload.platform) {
                            case 'Windows':
                              return '10.0.0'
                            case 'Linux':
                              return '6.5.0'
                            case 'Android':
                              return '13.0.0'
                            case 'macOS':
                            case 'iOS':
                              return '14.2.1'
                          }

                          return ''
                        })(),
                      }

                      if ('uaFullVersion' in values) {
                        data.uaFullVersion = payload.current.version.browser.full
                      }

                      resolve(data)
                    })
                    .catch(reject)
                })
              },
            })
          )
      }
    }

    /** Patches the navigator object for the iframe. */
    const patchNavigatorInIframe = (node: Node): void => {
      if (typeof node !== 'object' || node == null || node.nodeName !== 'IFRAME' || !('contentWindow' in node)) {
        return
      }

      try {
        const iFrame = node as HTMLIFrameElement

        if (typeof iFrame.contentWindow !== 'object' || iFrame.contentWindow == null) {
          return
        }

        const [key, ds, flag] = [__UNIQUE_HEADER_KEY_NAME__.toLowerCase(), iFrame.dataset, 'true']
        if (ds[key] === flag) {
          return // already patched
        }

        ds[key] = flag

        iFrame.contentWindow && patchNavigator(iFrame.contentWindow.navigator)
      } catch (_) {
        // An error occurred while patching the navigator object in the iframe
      }
    }

    // patch the current navigator object
    patchNavigator(navigator)

    // patch iframes navigators
    {
      // currently existing
      Array(...document.getElementsByTagName('iframe')).forEach(patchNavigatorInIframe)

      const overloadOpts: Parameters<typeof overload>[3] = { configurable: true, force: true, writable: true }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const proxyInvoke = <T extends (...args: readonly any[]) => unknown>(what: T): T =>
        new Proxy(what, {
          apply(target, thisArg, args) {
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/apply
            const result = Reflect.apply(target, thisArg, args)

            // patch the navigator object in the appended node
            Array.isArray(args) && args.forEach((node) => patchNavigatorInIframe(node))

            return result
          },
        })

      // patch the methods that can add new nodes to the DOM
      // TY @Certseeds for the idea (https://github.com/tarampampam/random-user-agent/pull/173)
      overload(Node.prototype, 'appendChild', proxyInvoke(Node.prototype.appendChild), overloadOpts)
      overload(Node.prototype, 'insertBefore', proxyInvoke(Node.prototype.insertBefore), overloadOpts)
      overload(Element.prototype, 'append', proxyInvoke(Element.prototype.append), overloadOpts)
      overload(Element.prototype, 'prepend', proxyInvoke(Element.prototype.prepend), overloadOpts)

      // watch for the new dynamically created iframes
      new MutationObserver((mutations): void => {
        mutations.forEach((mutation): void => mutation.addedNodes.forEach(patchNavigatorInIframe))
      }).observe(document, { childList: true, subtree: true })
    }
  } catch (err) {
    console.warn('💣 RUA: An error occurred in the injected script', err)
  }
})()
