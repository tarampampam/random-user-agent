import BrowserStorageArea = chrome.storage.StorageArea

type AreaName = 'sync' | 'local'

/**
 * This class provides a simple way to store and retrieve data in the browser's storage. It's important to note
 * that this is distinct from local or session storage; it specifically refers to browser storage.
 *
 * @link https://developer.chrome.com/docs/extensions/reference/api/storage
 */
export default class<TState extends Record<string, unknown> = Record<string, unknown>> {
  /** The key used to store the data */
  private readonly key: string
  /** The storage area to use and fallback to if the main area is not available */
  private readonly areaName: { main: AreaName; fallback?: AreaName }
  /** Do not use this property directly, use getStorage() method instead */
  private storage?: BrowserStorageArea

  constructor(key: string, mainArea: AreaName, fallbackArea?: AreaName) {
    this.key = key
    this.areaName = { main: mainArea, fallback: fallbackArea }
  }

  /**
   * Returns the storage area (sync or local, depending on the availability).
   *
   * @throws {Error} If neither sync nor local storage is available.
   */
  private async getStorage(): Promise<BrowserStorageArea> {
    if (this.storage) {
      return this.storage // return cached storage area
    }

    try {
      const main = this.areaName.main === 'sync' ? chrome.storage.sync : chrome.storage.local

      await main.get(null) // try to get main storage

      if (!chrome.runtime.lastError) {
        this.storage = main

        return this.storage // return main storage
      }
    } catch (syncErr) {
      // ignore any errors, proceed to fallback storage
    }

    if (this.areaName.fallback && this.areaName.fallback !== this.areaName.main) {
      const fallback = this.areaName.fallback === 'sync' ? chrome.storage.sync : chrome.storage.local

      try {
        await fallback.get(null) // try to get fallback storage
      } catch (err) {
        throw new Error(String(err))
      }

      if (!chrome.runtime.lastError) {
        this.storage = fallback

        return this.storage // return fallback storage
      }

      throw new Error('Neither main nor fallback storage is available')
    }

    throw new Error('Main storage is not available')
  }

  /**
   * Retrieves the data from the storage. If the data is not found, it returns `undefined`.
   *
   * @throws {Error} If the data cannot be retrieved.
   */
  async get(): Promise<TState | undefined> {
    const items = await (await this.getStorage()).get(this.key)
    const lastError = chrome.runtime.lastError

    if (lastError) {
      throw new Error(lastError.message)
    }

    if (this.key in items) {
      return items[this.key]
    }

    return undefined // storage does not contains expected data
  }

  /**
   * Sets the data in the storage.
   *
   * @throws {Error} If the data cannot be set.
   */
  async set(value: TState): Promise<void> {
    await (await this.getStorage()).set({ [this.key]: value })
    const lastError = chrome.runtime.lastError

    if (lastError) {
      throw new Error(lastError.message)
    }
  }

  /**
   * Removes the data from the storage, associated with the key only.
   *
   * @throws {Error} If the data cannot be removed.
   */
  async clear(): Promise<void> {
    await (await this.getStorage()).remove(this.key)
    const lastError = chrome.runtime.lastError

    if (lastError) {
      throw new Error(lastError.message)
    }
  }
}
