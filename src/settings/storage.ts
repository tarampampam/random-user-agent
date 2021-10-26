import StorageArea = chrome.storage.StorageArea

export interface Storage {
  // Initialize the storage (this method MUST be executed before the storage use)
  init(): Promise<void>

  // Removes all items from storage
  clear(): Promise<void>

  // Save object in storage
  set(key: string, value: { [key: string]: any }): Promise<void>

  // Get object from storage
  get(key: string): Promise<{ [key: string]: any }>
}

/**
 * @link https://developer.chrome.com/docs/extensions/reference/storage/ Chrome API reference
 */
export default class BrowserStorage implements Storage {
  private storage?: StorageArea

  init(): Promise<void> {
    return new Promise<void>((resolve: () => void) => {
      // make an attempt to use the sync storage
      chrome.storage.sync.get(null, (_): void => {
        // and if something goes wrong - switch to use the local storage
        this.storage = chrome.runtime.lastError
          ? chrome.storage.local
          : chrome.storage.sync

        resolve()
      })
    })
  }

  clear(): Promise<void> {
    return new Promise((resolve: () => void, reject: (_: Error) => void): void => {
      if (!this.storage) {
        return reject(new Error('Storage was not initialized'))
      }

      this.storage.clear((): void => {
        if (chrome.runtime.lastError) {
          return reject(new Error(chrome.runtime.lastError.message))
        }

        resolve()
      })
    })
  }

  get(key: string): Promise<{ [p: string]: any }> {
    return new Promise<{[p: string]: any}>((resolve: ({}: { [key: string]: any }) => void, reject: (_: Error) => void) => {
      if (!this.storage) {
        return reject(new Error('Storage was not initialized'))
      }

      this.storage.get(key, (items) => {
        if (chrome.runtime.lastError) {
          return reject(new Error(chrome.runtime.lastError.message))
        }

        if (!items.hasOwnProperty(key)) {
          return resolve({}) // storage does not contains expected data
        }

        resolve(items[key])
      })
    })
  }

  set(key: string, value: { [p: string]: any }): Promise<void> {
    return new Promise((resolve: () => void, reject) => {
      if (!this.storage) {
        return reject(new Error('Storage was not initialized'))
      }

      this.storage.set({[key]: value}, (): void => {
        if (chrome.runtime.lastError) {
          return reject(new Error(chrome.runtime.lastError.message))
        }

        resolve()
      })
    })
  }
}
