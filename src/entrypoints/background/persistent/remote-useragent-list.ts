import type StorageArea from './storage-area'

type UserAgentListState = {
  list: Array<string>
}

export default class {
  private readonly storage: StorageArea<UserAgentListState>
  private remoteListUrl: URL | undefined

  constructor(storage: StorageArea<UserAgentListState>) {
    this.storage = storage
  }

  /** Sets the remote list URL. If the URL is invalid, it will be ignored and the method will return false. */
  setUrl(url: string | URL): boolean {
    let newUrl: URL | undefined

    switch (true) {
      case typeof url === 'string':
        try {
          newUrl = new URL(url) // validate the URL
        } catch {
          // do nothing
        }
        break

      case url instanceof URL:
        newUrl = url
        break
    }

    if (newUrl && ['http:', 'https:'].includes(newUrl.protocol)) {
      this.remoteListUrl = newUrl

      return true
    }

    return false
  }

  /** Returns the remote list URL. */
  get url(): URL | undefined {
    return this.remoteListUrl
  }

  /** Clears the user agent list. */
  async clear(): Promise<void> {
    await this.storage.clear()
  }

  /**
   * Fetches the remote list and stores it in the storage.
   *
   * @throws {Error} If the remote list URL is not set or the fetch fails.
   */
  async update(): Promise<void> {
    if (!this.remoteListUrl) {
      throw new Error('Remote list URL is not set')
    }

    const response = await fetch(this.remoteListUrl, {
      method: 'GET',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch remote list: ${response.statusText} (${this.remoteListUrl.toString()})`)
    }

    const text = await response.text()

    if (text.length) {
      const list = text
        .split('\n')
        .map((s): string => s.trim())
        .filter((s): boolean => {
          if (s.startsWith('#') || s.startsWith('//')) {
            return false // skip comments
          }

          return s.length !== 0 // skip empty lines
        })
        .filter(Boolean)

      if (list.length) {
        await this.storage.set({ list })
      }
    }
  }

  /**
   * Retrieves the user agent list from the storage.
   *
   * If random is true, returns a random user agent. Otherwise, returns the whole list.
   * If the list is empty, returns undefined.
   */
  async get(random: true): Promise<Readonly<string> | undefined>
  async get(random: false): Promise<Readonly<Array<string>> | undefined>
  async get(random: boolean): Promise<Readonly<string> | Readonly<Array<string>> | undefined> {
    const state = await this.storage.get()

    if (state?.list.length) {
      return Object.freeze(random ? state.list[Math.floor(Math.random() * state.list.length)] : state.list)
    }
  }
}
