import { afterEach, describe, expect, type Mock, test, vi } from 'vitest'
import { type HandlersMap, listen, send } from './runtime'

const sign = 'rua-proto-v2'

describe('send', () => {
  afterEach(() => {
    delete (global as { chrome: unknown }).chrome
  })

  const mockChromeRuntimeSendMessage = (mock: Mock, lastError?: typeof chrome.runtime.lastError) => {
    Object.defineProperty(global, 'chrome', {
      value: {
        runtime: {
          sendMessage: mock,
          lastError: lastError,
        },
      },
      configurable: true,
    })
  }

  test('single with one argument', async () => {
    mockChromeRuntimeSendMessage(
      vi.fn((message) => {
        expect(message.sign).toBe(sign)
        expect(message.batch).toStrictEqual({ ping: [{ foo: 'bar' }] })

        return { sign, batch: { ping: { bar: 'baz' } } }
      })
    )

    const response = await send({ ping: [{ foo: 'bar' }] })

    expect(global.chrome.runtime.sendMessage).toHaveBeenCalledTimes(1)
    expect(response.ping).toStrictEqual({ bar: 'baz' })
  })

  test('single without arguments', async () => {
    mockChromeRuntimeSendMessage(
      vi.fn((message) => {
        expect(message.sign).toBe(sign)
        expect(message.batch).toStrictEqual({ version: null })

        return { sign, batch: { version: '0.1.2' } }
      })
    )

    const response = await send({ version: undefined })

    expect(global.chrome.runtime.sendMessage).toHaveBeenCalledTimes(1)
    expect(response.version).toBe('0.1.2')
  })

  test('single with multiple arguments', async () => {
    mockChromeRuntimeSendMessage(
      vi.fn((message) => {
        expect(message.sign).toBe(sign)
        expect(message.batch).toStrictEqual({ ping: [1, 'str', false, [2, 3], { foo: 'bar' }] })

        return { sign, batch: { ping: 'pong' } }
      })
    )

    const response = await send({ ping: [1, 'str', false, [2, 3], { foo: 'bar' }] })

    expect(global.chrome.runtime.sendMessage).toHaveBeenCalledTimes(1)
    expect(response.ping).toStrictEqual('pong')
  })

  test('multiple requests', async () => {
    mockChromeRuntimeSendMessage(
      vi.fn((message) => {
        expect(message.sign).toBe(sign)
        expect(message.batch).toStrictEqual({ version: null, ping: [{ foo: 'bar' }] })

        return { sign, batch: { version: '0.0.1', ping: { bar: 'baz' } } }
      })
    )

    const response = await send({ version: undefined, ping: [{ foo: 'bar' }] })

    expect(global.chrome.runtime.sendMessage).toHaveBeenCalledTimes(1)
    expect(response.version).toBe('0.0.1')
    expect(response.ping).toStrictEqual({ bar: 'baz' })
  })

  test('error: listener does not set the signature', async () => {
    mockChromeRuntimeSendMessage(
      vi.fn((message) => {
        expect(message.sign).toBe(sign)
        expect(message.batch).toStrictEqual({ ping: [{ foo: 'bar' }] })

        return
      })
    )

    await expect(send({ ping: [{ foo: 'bar' }] })).rejects.toThrow('Wrong or missing envelope signature')
  })

  test('error: runtime last error', async () => {
    mockChromeRuntimeSendMessage(
      vi.fn((message) => {
        expect(message.sign).toBe(sign)
        expect(message.batch).toStrictEqual({ ping: [{ foo: 'bar' }] })

        return { sign }
      }),
      new Error('fake last error')
    )

    await expect(send({ ping: [{ foo: 'bar' }] }, 2)).rejects.toThrow('fake last error')
  })
})

describe('listen', () => {
  afterEach(() => {
    delete (global as { chrome: unknown }).chrome
  })

  const mockChromeRuntimeOnMessageAddListener = (
    mock: typeof chrome.runtime.onMessage.addListener,
    lastError?: typeof chrome.runtime.lastError
  ) => {
    Object.defineProperty(global, 'chrome', {
      value: {
        runtime: {
          onMessage: {
            addListener: mock,
          },
          lastError: lastError,
        },
      },
      configurable: true,
    })
  }

  const handlers: Partial<HandlersMap> = {
    ping: (...args) => args,
    version: () => '0.1.2',
  }

  test('single request', async () => {
    let executed = false

    mockChromeRuntimeOnMessageAddListener((callback) => {
      callback({ sign, batch: { version: undefined } }, {}, (response) => {
        expect(response).toStrictEqual({ sign, batch: { version: '0.1.2' } })

        executed = true
      })
    })

    expect(executed).toBeFalsy()
    listen<'partial'>(handlers)
    await new Promise(process.nextTick)
    expect(executed).toBeTruthy()
  })

  test('multiple requests', async () => {
    let replyExecuted = false

    mockChromeRuntimeOnMessageAddListener((callback) => {
      callback({ sign, batch: { version: undefined, ping: [{ foo: 'bar' }] } }, {}, (response) => {
        expect(response).toStrictEqual({ sign, batch: { version: '0.1.2', ping: [{ foo: 'bar' }] } })

        replyExecuted = true
      })
    })

    expect(replyExecuted).toBeFalsy()
    listen<'partial'>(handlers)
    await new Promise(process.nextTick)
    expect(replyExecuted).toBeTruthy()
  })

  test('partial handlers', async () => {
    let executed = false

    mockChromeRuntimeOnMessageAddListener((callback) => {
      callback(
        { sign, batch: { version: undefined, ping: [{ foo: 'bar' }] } }, // but multiple requests
        {},
        (response) => {
          expect(response).toStrictEqual({
            sign,
            batch: {
              version: '0.1.2',
              ping: undefined, // is undefined because the handler is not set
            },
          })

          executed = true
        }
      )
    })

    expect(executed).toBeFalsy()
    listen<'partial'>({
      version: handlers.version, // single handler
    })
    await new Promise(process.nextTick)
    expect(executed).toBeTruthy()
  })

  test('error: listener does not set the signature', async () => {
    let replyExecuted = false

    mockChromeRuntimeOnMessageAddListener((callback) => {
      callback({ batch: { version: undefined } }, {}, () => {
        replyExecuted = true
      })
    })

    const consoleWarnMock = vi.spyOn(console, 'warn').mockImplementation(() => {})

    expect(replyExecuted).toBeFalsy()
    listen<'partial'>(handlers)
    expect(replyExecuted).toBeFalsy()
    expect(console.warn).toHaveBeenCalledTimes(1)

    consoleWarnMock.mockRestore()
  })

  test('error: runtime last error', async () => {
    let replyExecuted = false

    mockChromeRuntimeOnMessageAddListener((callback) => {
      callback({ sign, batch: { version: undefined } }, {}, () => {
        replyExecuted = true
      })
    }, new Error('fake last error'))

    expect(replyExecuted).toBeFalsy()
    expect(() => {
      listen<'partial'>(handlers)
    }).toThrow('fake last error')
    expect(replyExecuted).toBeFalsy()
  })
})
