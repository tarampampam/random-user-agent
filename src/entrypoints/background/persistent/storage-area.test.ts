import { afterEach, describe, expect, test, vi } from 'vitest'
import StorageArea from './storage-area'
import BrowserStorageArea = chrome.storage.StorageArea

describe('storage', () => {
  afterEach(() => {
    delete (global as { chrome: unknown }).chrome
  })

  const mockChromeStorage = (
    localMock: Partial<BrowserStorageArea>,
    syncMock: Partial<BrowserStorageArea>,
    runtime?: { lastError?: typeof chrome.runtime.lastError }
  ) => {
    Object.defineProperty(global, 'chrome', {
      value: {
        storage: {
          local: localMock,
          sync: syncMock,
        },
        runtime,
      },
      configurable: true,
    })
  }

  test('get using sync storage', async () => {
    mockChromeStorage(
      {},
      {
        get: vi.fn().mockImplementation(async (key) => {
          if (key === 'some-key') {
            return { [key as string]: { some: 'data' } }
          }

          return {}
        }),
      },
      { lastError: undefined }
    )

    const syncGetMock = vi.spyOn(global.chrome.storage.sync, 'get')
    const storage = new StorageArea('some-key', 'sync')

    try {
      expect(await storage.get()).toStrictEqual({ some: 'data' })
      expect(global.chrome.storage.sync.get).toHaveBeenCalledTimes(2)
      expect(global.chrome.storage.sync.get).toHaveBeenCalledWith(null)
      expect(global.chrome.storage.sync.get).toHaveBeenCalledWith('some-key')

      // the second shouldn't make an additional call to chrome.storage.sync.get
      expect(await storage.get()).toStrictEqual({ some: 'data' })
      expect(global.chrome.storage.sync.get).toHaveBeenCalledTimes(3)
      expect(global.chrome.storage.sync.get).toHaveBeenCalledWith('some-key')
    } finally {
      syncGetMock.mockRestore()
    }
  })

  test('fallback to local storage', async () => {
    let lastErrorCallCount = 0

    mockChromeStorage(
      {
        get: vi.fn().mockImplementation(async (key) => {
          if (key === 'some-key') {
            return { [key as string]: { some: 'data' } }
          }

          return {}
        }),
      },
      {
        get: vi.fn().mockImplementation(async () => {
          return {}
        }),
      },
      {
        get lastError() {
          if (lastErrorCallCount++ === 0) {
            // return error only once
            return { message: 'Some error' }
          }

          return undefined
        },
      }
    )

    const syncGetMock = vi.spyOn(global.chrome.storage.sync, 'get')
    const localGetMock = vi.spyOn(global.chrome.storage.local, 'get')

    try {
      expect(await new StorageArea('some-key', 'sync', 'local').get()).toStrictEqual({ some: 'data' })
      expect(global.chrome.storage.sync.get).toHaveBeenCalledTimes(1)
      expect(global.chrome.storage.sync.get).toHaveBeenCalledWith(null)
      expect(global.chrome.storage.local.get).toHaveBeenCalledTimes(2)
      expect(global.chrome.storage.local.get).toHaveBeenCalledWith(null)
      expect(global.chrome.storage.local.get).toHaveBeenCalledWith('some-key')
    } finally {
      syncGetMock.mockRestore()
      localGetMock.mockRestore()
    }
  })

  test('get using sync storage throws an error', async () => {
    let lastErrorCallCount = 0

    mockChromeStorage(
      {},
      {
        get: vi.fn().mockImplementation(async () => {
          return {}
        }),
      },
      {
        get lastError() {
          if (lastErrorCallCount++ === 1) {
            // return error only on second call
            return { message: 'Some error' }
          }

          return undefined
        },
      }
    )

    await expect(new StorageArea('some-key', 'sync').get()).rejects.toThrow('Some error')
  })

  test('set using sync storage', async () => {
    mockChromeStorage(
      {},
      {
        get: vi.fn().mockImplementation(async () => {
          return {}
        }),
        set: vi.fn().mockImplementation(async (value) => {
          expect(value).toStrictEqual({ 'some-key': { some: 'data' } })
        }),
      },
      { lastError: undefined }
    )

    const syncSetMock = vi.spyOn(global.chrome.storage.sync, 'set')

    try {
      await new StorageArea('some-key', 'sync').set({ some: 'data' })
      expect(global.chrome.storage.sync.set).toHaveBeenCalledTimes(1)
      expect(global.chrome.storage.sync.set).toHaveBeenCalledWith({ 'some-key': { some: 'data' } })
    } finally {
      syncSetMock.mockRestore()
    }
  })

  test('set using sync storage when lastError is set', async () => {
    let lastErrorCallCount = 0

    mockChromeStorage(
      {},
      {
        get: vi.fn().mockImplementation(async () => {
          return {}
        }),
        set: vi.fn().mockImplementation(async (value) => {
          expect(value).toStrictEqual({ 'some-key': { some: 'data' } })
        }),
      },
      {
        get lastError() {
          if (lastErrorCallCount++ === 1) {
            // return error only on second call
            return { message: 'Some error' }
          }

          return undefined
        },
      }
    )

    const syncSetMock = vi.spyOn(global.chrome.storage.sync, 'set')

    try {
      await expect(new StorageArea('some-key', 'sync').set({ some: 'data' })).rejects.toThrow('Some error')
      expect(global.chrome.storage.sync.set).toHaveBeenCalledTimes(1)
      expect(global.chrome.storage.sync.set).toHaveBeenCalledWith({ 'some-key': { some: 'data' } })
    } finally {
      syncSetMock.mockRestore()
    }
  })

  test('clear using sync storage', async () => {
    mockChromeStorage(
      {},
      {
        get: vi.fn().mockImplementation(async () => {
          return {}
        }),
        remove: vi.fn().mockImplementation(async (key) => {
          expect(key).toBe('some-key')
        }),
      },
      { lastError: undefined }
    )

    const syncRemoveMock = vi.spyOn(global.chrome.storage.sync, 'remove')

    try {
      await new StorageArea('some-key', 'sync').clear()
      expect(global.chrome.storage.sync.remove).toHaveBeenCalledTimes(1)
      expect(global.chrome.storage.sync.remove).toHaveBeenCalledWith('some-key')
    } finally {
      syncRemoveMock.mockRestore()
    }
  })

  test('clear using sync storage when lastError is set', async () => {
    let lastErrorCallCount = 0

    mockChromeStorage(
      {},
      {
        get: vi.fn().mockImplementation(async () => {
          return {}
        }),
        remove: vi.fn().mockImplementation(async (key) => {
          expect(key).toBe('some-key')
        }),
      },
      {
        get lastError() {
          if (lastErrorCallCount++ === 1) {
            // return error only on second call
            return { message: 'Some error' }
          }

          return undefined
        },
      }
    )

    await expect(new StorageArea('some-key', 'sync').clear()).rejects.toThrow('Some error')
  })
})
