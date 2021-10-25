import StorageArea = chrome.storage.StorageArea

export interface UseragentState { // do not forget to update update() method on new properties appending
  useragent: string | undefined
}

export enum UseragentStateEvent {
  onLoad = 'on:load',
  onSave = 'on:save',
  onChange = 'on:change',
}

export default class Useragent {
  private readonly storageKey: string = 'useragent-state'

  private readonly storage: StorageArea

  protected state: UseragentState = { // default state
    useragent: undefined,
  }

  private events: Record<string, ((...data: any[]) => void)[]> = {}

  constructor() {
    this.storage = chrome.storage.local // NOT sync - local!
  }

  // Attach callback for the events
  on(type: UseragentStateEvent, callback: (...data: any[]) => void): void {
    if (this.events.hasOwnProperty(type)) {
      this.events[type].push(callback)
    } else {
      this.events[type] = [callback]
    }
  }

  private emit(type: UseragentStateEvent, ...data: any[]): void {
    if (this.events.hasOwnProperty(type)) {
      for (const fn of this.events[type]) {
        fn(...data)
      }
    }
  }

  get(): Readonly<UseragentState> {
    return this.state
  }

  update(state: UseragentState): void {
    let changed = false

    if (state.useragent !== undefined) {
      this.state.useragent = state.useragent
      changed = true
    }

    if (changed) {
      this.emit(UseragentStateEvent.onChange)
    }
  }

  save(): Promise<void> {
    return new Promise((resolve: () => void, reject: (err: Error) => void) => {
      this.storage.set({[this.storageKey]: this.state}, (): void => {
        if (chrome.runtime.lastError) {
          return reject(new Error(chrome.runtime.lastError.message))
        }

        this.emit(UseragentStateEvent.onSave)

        resolve()
      })
    })
  }

  load(): Promise<void> {
    return new Promise((resolve: () => void, reject: (err: Error) => void) => {
      this.storage.get(this.storageKey, (items): void => {
        if (chrome.runtime.lastError) {
          return reject(new Error(chrome.runtime.lastError.message))
        }

        if (items.hasOwnProperty(this.storageKey)) {
          this.state = items[this.storageKey] as UseragentState
        }

        this.emit(UseragentStateEvent.onLoad)

        resolve()
      })
    })
  }
}
