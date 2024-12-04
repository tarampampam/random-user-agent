import type { PartialSettingsState, ReadonlySettingsState } from '../types'

const sign: Readonly<string> = 'rua-proto-v2' // some unique string

export type HandlersMap = {
  /** Ping-pong test. Returns the same arguments, but as an array. Useful for testing the connection. */
  ping: <T extends Array<unknown>>(...args: T) => T

  /** Returns the extension version. */
  version: () => string

  /** Returns the current user-agent. */
  currentUserAgent: () => Promise<Readonly<string> | undefined>

  /** Renews the user-agent. A new user-agent will be set and returned as a string. */
  renewUserAgent: () => Promise<Readonly<string>>

  /** Returns the current extension settings. */
  settings: () => Promise<ReadonlySettingsState>

  /** Updates the extension settings and returns the new settings object. */
  updateSettings: (upd: PartialSettingsState) => Promise<ReadonlySettingsState>

  /** Returns true if the extension is applicable for the given domain name. */
  isApplicableForDomain: (domain: string) => Promise<boolean>

  /** Updates the remote user-agent list now. */
  updateRemoteListNow: (clearBefore?: boolean) => Promise<Readonly<{ url: string; gotListSize: number }>>
}

type HandlerName = keyof HandlersMap // union type of all handler names
type HandlerParams<T extends HandlerName> = T extends keyof HandlersMap // union type of all handler parameter types
  ? Parameters<HandlersMap[T]>
  : never
type HandlerResult<T extends HandlerName> = T extends keyof HandlersMap // union type of all handler return types
  ? Awaited<ReturnType<HandlersMap[T]>>
  : never

type Envelope<TMode extends 'request' | 'response', TName extends HandlerName = HandlerName> = {
  readonly sign: string // signature for the envelope
  readonly batch: Partial<{
    // union type for batch items based on request/response mode
    [K in TName]: TMode extends 'request' ? HandlerParams<K> | null : Awaited<HandlerResult<K>> | undefined
  }>
}

export async function send<THandlerNames extends HandlerName>(
  requests: {
    [K in THandlerNames]?: HandlerParams<K>
  },
  retryAttempts: number = 5
): Promise<{ [K in THandlerNames]: HandlerResult<K> | Error }> {
  const batch: Envelope<'request', THandlerNames> = {
    sign,
    batch: { ...requests },
  }

  for (const name in batch.batch) {
    if (batch.batch[name] === undefined) {
      batch.batch[name] = null // use `null` instead of `undefined` to preserve the key
    }
  }

  // sometimes background page may be unloaded, so the better way is try again
  const maxAttempts = Math.max(1, retryAttempts)
  let response: Envelope<'response', THandlerNames> | undefined

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    if (attempt > 1) {
      await new Promise((resolve) => setTimeout(resolve, 50 * attempt))
    }

    try {
      response = await chrome.runtime.sendMessage<
        Envelope<'request', THandlerNames>,
        Envelope<'response', THandlerNames>
      >(batch)
    } catch (err) {
      if (attempt < maxAttempts) {
        continue
      }

      throw err
    }

    if (chrome.runtime.lastError) {
      if (attempt < maxAttempts) {
        continue
      }

      throw new Error(chrome.runtime.lastError.message)
    } else if (typeof response !== 'object' || response.sign !== sign) {
      throw new Error('Wrong or missing envelope signature')
    }

    break
  }

  if (!response) {
    throw new Error('No response received (background page may be unloaded)')
  }

  return response.batch as { [K in THandlerNames]: HandlerResult<K> }
}

/** @link https://developer.chrome.com/docs/extensions/reference/api/runtime#event-onMessage */
export function listen<TMode extends 'complete' | 'partial' = 'complete'>(
  handlers: TMode extends 'partial' ? Partial<HandlersMap> : HandlersMap
): void {
  // Function to call (at most once) when you have a response. The argument should be any JSON-ifiable object.
  // If you have more than one onMessage listener in the same document, then only one may send a response. This
  // function becomes invalid when the event listener returns, UNLESS YOU RETURN TRUE from the event listener to
  // indicate you wish to send a response asynchronously (this will keep the message channel open to the other end
  // until sendResponse is called).
  chrome.runtime.onMessage.addListener(
    (message: Envelope<'request'>, _, reply: (response: Envelope<'response'>) => void | true): void | true => {
      if (chrome.runtime.lastError) {
        throw new Error(chrome.runtime.lastError.message)
      } else if (typeof message !== 'object' || message.sign !== sign) {
        console.warn('Wrong or missing envelope signature', message)

        return
      }

      ;(async () => {
        const promises = Object.entries(message.batch).map(async ([key, args]) => {
          const handlerName = key as HandlerName
          const handler = handlers[handlerName] as ((..._: unknown[]) => Promise<unknown> | unknown) | undefined

          // check if handler exists before calling it
          if (handler) {
            try {
              const result = await handler(...(args ?? []))
              return [handlerName, result]
            } catch (error) {
              return [handlerName, error instanceof Error ? error : new Error(String(error))]
            }
          } else {
            return [handlerName, undefined]
          }
        })

        // Reduce settled promises into the batch object
        const batch = (await Promise.allSettled(promises)).reduce<Envelope<'response'>['batch']>((acc, result) => {
          if (result.status === 'fulfilled') {
            const [handlerName, value] = result.value

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            acc[handlerName as HandlerName] = value as any
          } else if (result.status === 'rejected') {
            const [handlerName, error] = result.reason

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            acc[handlerName as HandlerName] = error as any
          }

          return acc
        }, {})

        reply({ sign, batch })
      })()

      return true
    }
  )
}
