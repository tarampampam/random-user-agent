export default class RemoteList {
  private uri: string

  private list: string[] = []

  constructor(uri: string) {
    this.uri = uri
  }

  setUri(uri: string): void {
    this.uri = uri
  }

  get(): string[] {
    return this.list
  }

  getRandom(): string {
    if (this.list.length === 0) {
      return ''
    }

    return this.list[Math.floor(Math.random() * this.list.length)]
  }

  update(): Promise<void> {
    return new Promise<void>((resolve: () => void, reject: (e: Error) => void) => {
      let url: URL

      try {
        url = new URL(this.uri)
      } catch (err) {
        return reject(new Error(`Wrong URI: ${err}`))
      }

      if (url.protocol !== 'http:' && url.protocol !== 'https:') {
        return reject(new Error(`Wrong URI: ${this.uri}`))
      }

      fetch(url.toString(), {
        method: 'GET',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
      })
        .then((response: Response): Response => {
          if (!response.ok) {
            throw new Error(`Wrong response code (${response.status}) for ${this.uri}: ${response.statusText}`)
          }

          return response
        })
        .then((response): void => {
          response.text()
            .then((s: string): void => {
              if (s.length > 0) {
                this.list = s.split('\n').filter((s): boolean => s.trim().length > 0)
              } else {
                this.list = this.list.splice(0, this.list.length) // empty array
              }

              resolve()
            })
            .catch(reject)
        })
        .catch(reject)
    })
  }
}
