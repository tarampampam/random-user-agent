export interface StringsCache {
  put(data: string[]): Promise<void>
  get(): Promise<string[]>
  exists(): Promise<boolean>
  remove(): Promise<void>
}

export class LocalStorageStringsCache implements StringsCache {
  private readonly key: string = 'remote-list-cache'

  async put(data: string[]) {
    localStorage.setItem(this.key, JSON.stringify(data))
  }

  async get() {
    const data = localStorage.getItem(this.key)

    if (typeof data === 'string') {
      return JSON.parse(data)
    }

    return []
  }

  async exists() {
    return typeof localStorage.getItem(this.key) === 'string'
  }

  async remove() {
    localStorage.removeItem(this.key)
  }
}

export default class RemoteListService {
  private readonly cache: StringsCache
  private uri: string = ''
  private inmemory: string[] = []

  constructor(cache: StringsCache) {
    this.cache = cache
  }

  setUri(uri: string): void {
    this.uri = uri
  }

  init(): Promise<void> {
    return new Promise<void>((resolve, reject: (err: Error) => void) => {
      this.cache.get()
        .then(list => this.inmemory = list)
        .then((): void => resolve())
        .catch(reject)
    })
  }

  update(): Promise<void> {
    return new Promise<void>((resolve, reject: (err: Error) => void) => {
      if (this.uri.length === 0) {
        return reject(new Error('Remote list URI was not set'))
      }

      this.fetchList(this.uri)
        .then(list => {
          this.inmemory = list

          this.cache.put(list)
            .then(resolve)
            .catch(reject)
        })
        .catch(reject)
    })
  }

  get(): string[] {
    return this.inmemory.splice(0)
  }

  getRandom(): string {
    if (this.inmemory.length === 0) {
      return ''
    }

    return this.inmemory[Math.floor(Math.random() * this.inmemory.length)]
  }

  private fetchList(uri: string): Promise<string[]> {
    return new Promise<string[]>((resolve, reject: (err: Error) => void) => {
      fetch(uri, {
        method: 'GET',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
      })
        .then((response): void => {
          if (!response.ok) {
            return reject(new Error(`Wrong response code (${response.status}) for ${uri}: ${response.statusText}`))
          }

          response.text()
            .then((s: string): void => {
              if (s.length > 0) {
                return resolve(
                  s.split('\n')
                    .filter((s): boolean => {
                      const trimmed = s.trim()

                      if (trimmed.startsWith('#') || trimmed.startsWith('//')) { // skip comments
                        return false
                      }

                      return trimmed.length !== 0 // skip empty lines
                    })
                )
              }

              return resolve([])
            })
            .catch(reject)
        })
        .catch(reject)
    })
  }
}
