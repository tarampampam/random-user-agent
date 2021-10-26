import {Storage} from './storage'
import {GeneratorType} from '../useragent/generator'
import {DeepPartial} from '../utils/types'

export enum BlacklistMode {
  // enabled everywhere, but disabled on pages defined in the blacklist
  BlackList = 'blacklist',

  // disabled everywhere, but enabled on pages defined in the blacklist
  WhiteList = 'whitelist',
}

export interface SettingsState { // undefined properties are not allowed here
  // Extension is enabled?
  enabled: boolean
  // User-agent renewal options
  renew: {
    // Auto renewal is enabled?
    enabled: boolean
    // Auto renewal interval (in milliseconds)
    intervalMillis: number
    // Renewal on startup is enabled?
    onStartup: boolean
  }
  // Custom User-Agent options
  customUseragent: {
    // Custom User-Agent is enabled?
    enabled: boolean
    // Custom User-Agents list
    list: string[]
  }
  // Replace User-Agent using javascript?
  jsProtection: {
    // JS protection is enabled?
    enabled: boolean
  }
  // Generator settings
  generator: {
    // Generator types
    types: GeneratorType[]
  }
  // Blacklist settings
  blacklist: {
    // Blacklist mode
    mode: BlacklistMode
    // Domains list
    domains: string[]
    // Custom rules (simple patterns), managed by user
    custom: {
      rules: string[]
    }
  }
}

export enum SettingEvent {
  onLoad = 'on:load',
  onSave = 'on:save',
  onChange = 'on:change',
}

declare var InstallTrigger: any
const isFirefox = typeof InstallTrigger !== 'undefined' // link: https://stackoverflow.com/a/41820692/2252921

export default class Settings {
  public readonly storageKey: string = 'settings-struct-v3'

  private readonly storage: Storage

  private state: SettingsState = { // initial (default) extension settings
    enabled: true,
    renew: {
      enabled: true,
      intervalMillis: 10 * 60 * 1000, // once in a 10 minutes
      onStartup: true,
    },
    customUseragent: {
      enabled: false,
      list: [],
    },
    jsProtection: {
      enabled: true,
    },
    generator: {
      types: isFirefox ? [
        GeneratorType.firefoxWin, GeneratorType.firefoxLinux, GeneratorType.firefoxMac,
      ] : [
        GeneratorType.chromeWin, GeneratorType.chromeLinux, GeneratorType.chromeMac,
      ],
    },
    blacklist: {
      mode: BlacklistMode.BlackList,
      domains: ['localhost', '127.0.0.1'],
      custom: {
        rules: ['chrome://*', 'file://*'],
      },
    },
  }

  private events: Record<string, ((...data: any[]) => void)[]> = {}

  constructor(storage: Storage) {
    this.storage = storage
  }

  // Attach callback for the events of the setting
  on(type: SettingEvent, callback: (...data: any[]) => void): void {
    if (this.events.hasOwnProperty(type)) {
      this.events[type].push(callback)
    } else {
      this.events[type] = [callback]
    }
  }

  private emit(type: SettingEvent, ...data: any[]): void {
    if (this.events.hasOwnProperty(type)) {
      for (const fn of this.events[type]) {
        fn(...data)
      }
    }
  }

  // Load all settings from the storage
  load(): Promise<void> {
    return new Promise((resolve: () => void, reject) => {
      this.storage.get(this.storageKey)
        .then((fromStorage) => {
          if (Object.keys(fromStorage).length !== 0) {
            const [merged, _] = this.mergeStates(JSON.parse(JSON.stringify(this.state)), fromStorage)
            this.state = merged
          }

          this.emit(SettingEvent.onLoad)

          resolve()
        })
        .catch(reject)
    })
  }

  // Save all settings into the storage
  save(): Promise<void> {
    return new Promise((resolve: () => void, reject) => {
      this.storage.set(this.storageKey, this.state)
        .then(() => {
          this.emit(SettingEvent.onSave)

          resolve()
        })
        .catch(reject)
    })
  }

  // Returns current state
  get(): Readonly<SettingsState> {
    return JSON.parse(JSON.stringify(this.state))
  }

  // Updates current state
  update(whatToUpdate: DeepPartial<SettingsState>): void {
    const [merged, changesCount] = this.mergeStates(JSON.parse(JSON.stringify(this.state)), whatToUpdate)
    this.state = merged

    if (changesCount > 0) {
      this.emit(SettingEvent.onChange)
    }
  }

  private mergeStates(current: SettingsState, updated: { [key: string]: any }): [SettingsState, number] {
    let changes = 0

    for (const [key, value] of Object.entries(updated)) {
      if (value !== undefined && current[key] !== undefined) { // skip any undefined values
        if (typeof value === 'object' && !Array.isArray(value) && typeof current[key] === 'object' && !Array.isArray(current[key])) {
          const [newState, changedCount] = this.mergeStates(current[key], value) // merge objects

          current[key] = newState
          changes += changedCount
        } else if (Array.isArray(value) && Array.isArray(current[key])) {
          if (JSON.stringify(value) !== JSON.stringify(current[key])) {
            current[key] = value // overwrite
            changes++
          }
        } else if (current[key] !== value) {
          current[key] = value // overwrite
          changes++
        }
      }
    }

    return [current, changes]
  }
}
