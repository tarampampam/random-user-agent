import UseragentInfo from './useragent-info'
import browser from 'webextension-polyfill'
import {Storage} from 'webextension-polyfill/namespaces/storage'

export interface UseragentState { // do not forget to update update() method on new properties appending
  info: UseragentInfo | undefined
}

export enum UseragentStateEvent {
  onLoad = 'on:load',
  onSave = 'on:save',
  onChange = 'on:change',
}

export default class Useragent {
  private readonly storageKey: string = 'useragent-state'

  private readonly storage: Storage.StorageArea

  protected state: UseragentState = { // default state
    info: undefined,
  }

  private events: Record<string, ((...data: any[]) => void)[]> = {}

  constructor() {
    this.storage = browser.storage.local // NOT sync - local!
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
    return JSON.parse(JSON.stringify(this.state))
  }

  update(state: UseragentState): void {
    let changed = false

    if (state.info !== undefined) {
      this.state.info = state.info
      changed = true
    }

    if (changed) {
      this.emit(UseragentStateEvent.onChange)
    }
  }

  save(): Promise<void> {
    return this.storage
      .set({[this.storageKey]: this.state})
      .then((): void => {
        this.emit(UseragentStateEvent.onSave)
      })
  }

  load(): Promise<void> {
    return this.storage
      .get(this.storageKey)
      .then((items): void => {
        if (items.hasOwnProperty(this.storageKey)) {
          if (items[this.storageKey].hasOwnProperty('useragent')) { // remove the outdated property, if exists
            delete items[this.storageKey]['useragent']
          }

          this.state = items[this.storageKey] as UseragentState
        }

        this.emit(UseragentStateEvent.onLoad)
      })
  }
}
